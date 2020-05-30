"use strict";

// databus client
const Databus = require("./../../databus/databusClient");

// Load logger
const logger = require("./../../logger/logger").logPlugins;

// Load Config
const config = require("./../../../config/config");

// needed for unique ids
const { v1: uuidv1 } = require("uuid");

// pgdb
const pgdb = require("./../../pgdb/pgdb");

// Load sql queries
const queryDeviceConfig = require("./../../pgdb/query").getConfigByDeviceId;

// #############################DATABUS########################################
// Receiving databus events

module.exports = class light {
	constructor() {
		// setup databus
		this._inventory = {
			rooms: []
		};

		this._uid = uuidv1();
		this.databusClient = new Databus("light/#", config.databus, "lightPlugin");

		this.databusClient.on("databus", data => {
			logger.info("Databuclient message received");
			logger.info(data);
			if (
				JSON.parse(data.message).hasOwnProperty("wtf") &
				(JSON.parse(data.message).uid == this._uid)
			) {
				if (JSON.parse(data.message).device === "undefined") {
					this.requestDeviceConfig(JSON.parse(data.message).chipid);
				} else {
					logger.info("Light wtf message received");
					this.updateIventory(data);
				}
			}
		});

		logger.info("Plugin light starting");
		logger.info("UUID: " + this._uid);

		var that = this;

		setInterval(function() {
			that.databusClient.publish(
				"light/",
				JSON.stringify({
					type: "req",
					req: "wtf",
					uid: that._uid
				})
			);
		}, 10000);
	}

	async updateIventory(data) {
		let roomArrayPos;
		let lightArrayPos;

		try {
			// check if rooms should be romove due to timeout
			this.timeFilter(this._inventory.rooms, 60000);

			// check if room exists
			roomArrayPos = await this.valueExists(
				this._inventory.rooms,
				JSON.parse(data.message).room
			);
			// If room exists check if light exists
			if (roomArrayPos !== undefined) {
				lightArrayPos = await this.valueExists(
					this._inventory.rooms[roomArrayPos].lights,
					JSON.parse(data.message).device
				);
			}

			// room and light dont exists
			if (roomArrayPos === undefined) {
				// create new room
				await this._inventory.rooms.push({
					name: JSON.parse(data.message).room,
					lastUpdate: Date.now(),
					lights: []
				});

				// check position of new room
				const tempRoomArrayPos = await this.valueExists(
					this._inventory.rooms,
					JSON.parse(data.message).room
				);

				// create new light in new room
				this._inventory.rooms[tempRoomArrayPos].lights.push({
					name: JSON.parse(data.message).device,
					lastUpdate: Date.now()
				});
				logger.info("Added room and light to inventory");
			}

			// room exist but no light dont exists
			if (roomArrayPos !== undefined && lightArrayPos === undefined) {
				this._inventory.rooms[roomArrayPos].lights.push({
					name: JSON.parse(data.message).device,
					lastUpdate: Date.now()
				});
				logger.info("Added light to room in inventory");
			}
		} catch (err) {
			logger.error("Failed parsing wtf message: " + err);
		}
		logger.info("Inventory: " + JSON.stringify(this._inventory));
	}

	// returns undefined or position in array
	valueExists(array, name) {
		var exists = undefined;
		for (var i = array.length - 1; i >= 0; i--) {
			if (array[i].name === name) {
				// Update laste time seen if exists
				array[i].lastUpdate = Date.now();
				exists = i;
			}
		}
		return exists;
	}

	// filters rooms/lights timebased (sec)
	timeFilter(array, duration) {
		for (var i = array.length - 1; i >= 0; i--) {
			//console.log(Date.now() - array[i].lastUpdate);
			if (Date.now() - array[i].lastUpdate > duration) {
				logger.debug("Remove room");
				array.splice(i, 1);
			}
			for (var y = array[i].lights.length - 1; y >= 0; y--) {
				if (Date.now() - array[i].lights[y].lastUpdate > duration) {
					logger.debug("Remove light");
					array[i].lights.splice(y, 1);
				}
			}
		}
	}

	// returns undefined or position in array
	async requestDeviceConfig(deviceId) {
		try {
			logger.info("Request config for device: " + deviceId);
			queryDeviceConfig.parameters = [deviceId];
			var result = await pgdb.query(queryDeviceConfig);
			logger.info("Check config for device: " + deviceId);

			this.databusClient.publish(
				"light/",
				JSON.stringify({
					type: "cmd",
					cmd: "config",
					name: result.rows[0].device_name,
					room: result.rows[0].device_room,
					leds: result.rows[0].device_leds,
					deviceId: deviceId
				})
			);
		} catch (e) {
			logger.error(e);
		}
	}

	get inventory() {
		return this._inventory;
	}

	set inventory(data) {
		this._inventory = data;
	}

	publish(topic, message) {
		this.databusClient.publish(topic, message);
	}
};
