"use strict";

// databus client
const Databus = require("./../../databus/databusClient");

// Load logger
const logger = require("./../../logger/logger").logPlugins;

// Load Config
const config = require("./../../../config/config");

// needed for unique ids
const { v1: uuidv1 } = require("uuid");

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
			if (
				JSON.parse(data.message).hasOwnProperty("wtf") &
				(JSON.parse(data.message).uid == this._uid)
			) {
				logger.info("Light wtf message received");
				this.updateIventory(data);
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
					lights: []
				});

				// check position of new room
				const tempRoomArrayPos = await this.valueExists(
					this._inventory.rooms,
					JSON.parse(data.message).room
				);

				// create new light in new room
				this._inventory.rooms[tempRoomArrayPos].lights.push({
					name: JSON.parse(data.message).device
				});
				logger.info("Added room and light to inventory");
			}

			// room exist but no light dont exists
			if (roomArrayPos !== undefined && lightArrayPos === undefined) {
				this._inventory.rooms[roomArrayPos].lights.push({
					name: JSON.parse(data.message).device
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
				exists = i;
			}
		}
		return exists;
	}

	get inventory() {
		return this._inventory;
	}

	set inventory(data) {
		this._inventory = data;
	}
};
