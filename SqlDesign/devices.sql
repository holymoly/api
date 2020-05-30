CREATE TABLE api.devices
(
    id bigint[] NOT NULL,
    device_id character(6) NOT NULL,
    device_name character(13) NOT NULL,
    device_room character(13) NOT NULL,
    device_leds bigint NOT NULL,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE api.devices
    OWNER to ztl;