-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.2-beta1
-- PostgreSQL version: 11.0
-- Project Site: pgmodeler.io
-- Model Author: ---

-- -- object: pguser | type: ROLE --
-- -- DROP ROLE IF EXISTS pguser;
-- CREATE ROLE pguser WITH 
-- 	ENCRYPTED PASSWORD 'pgpass';
-- -- ddl-end --
-- 

-- Database creation must be done outside a multicommand file.
-- These commands were put in this file only as a convenience.
-- -- object: items | type: DATABASE --
-- -- DROP DATABASE IF EXISTS items;
-- CREATE DATABASE items
-- 	ENCODING = 'UTF8';
-- -- ddl-end --
-- 

-- object: "itemClass" | type: SCHEMA --
-- DROP SCHEMA IF EXISTS "itemClass" CASCADE;
CREATE SCHEMA "itemClass";
-- ddl-end --
ALTER SCHEMA "itemClass" OWNER TO pguser;
-- ddl-end --
COMMENT ON SCHEMA "itemClass" IS 'Item schema';
-- ddl-end --

-- object: items | type: SCHEMA --
-- DROP SCHEMA IF EXISTS items CASCADE;
CREATE SCHEMA items;
-- ddl-end --
ALTER SCHEMA items OWNER TO postgres;
-- ddl-end --
COMMENT ON SCHEMA items IS 'Instance specific Data';
-- ddl-end --

SET search_path TO pg_catalog,public,"itemClass",items;
-- ddl-end --

-- object: "itemClass"."ItemClass" | type: TABLE --
-- DROP TABLE IF EXISTS "itemClass"."ItemClass" CASCADE;
CREATE TABLE "itemClass"."ItemClass" (
	"ItemClassID" serial NOT NULL,
	"Name" varchar NOT NULL,
	"Description" varchar,
	"Type" varchar,
	CONSTRAINT "ItemClass_pk" PRIMARY KEY ("ItemClassID")

);
-- ddl-end --
COMMENT ON TABLE "itemClass"."ItemClass" IS 'Item Class Master';
-- ddl-end --
COMMENT ON COLUMN "itemClass"."ItemClass"."Type" IS 'Describes the type of Item i.e. Equipment, Material, Serialization Data... used for Grouping filtering';
-- ddl-end --
ALTER TABLE "itemClass"."ItemClass" OWNER TO pguser;
-- ddl-end --

-- object: "itemClass"."Properties" | type: TABLE --
-- DROP TABLE IF EXISTS "itemClass"."Properties" CASCADE;
CREATE TABLE "itemClass"."Properties" (
	"PropertyID" serial NOT NULL,
	"Name" varchar NOT NULL,
	"Description" varchar,
	"Type" varchar NOT NULL,
	"ItemClassID" integer NOT NULL,
	"UoM" varchar,
	CONSTRAINT "Properties_pk" PRIMARY KEY ("PropertyID")

);
-- ddl-end --
ALTER TABLE "itemClass"."Properties" OWNER TO pguser;
-- ddl-end --

-- object: "itemClass"."StateModel" | type: TABLE --
-- DROP TABLE IF EXISTS "itemClass"."StateModel" CASCADE;
CREATE TABLE "itemClass"."StateModel" (
	"StateModelID" serial NOT NULL,
	"Name" varchar NOT NULL,
	"Description" varchar,
	"ItemClassID" integer NOT NULL,
	CONSTRAINT "StateModel_pk" PRIMARY KEY ("StateModelID")

);
-- ddl-end --
COMMENT ON TABLE "itemClass"."StateModel" IS 'State Model Master';
-- ddl-end --
ALTER TABLE "itemClass"."StateModel" OWNER TO pguser;
-- ddl-end --

-- object: "itemClass"."State" | type: TABLE --
-- DROP TABLE IF EXISTS "itemClass"."State" CASCADE;
CREATE TABLE "itemClass"."State" (
	"StateID" serial NOT NULL,
	"Name" varchar NOT NULL,
	"Description" varchar,
	"StateModelID" integer NOT NULL,
	CONSTRAINT "State_pk" PRIMARY KEY ("StateID")

);
-- ddl-end --
COMMENT ON TABLE "itemClass"."State" IS 'State definition';
-- ddl-end --
ALTER TABLE "itemClass"."State" OWNER TO pguser;
-- ddl-end --

-- object: "itemClass"."StateTransitions" | type: TABLE --
-- DROP TABLE IF EXISTS "itemClass"."StateTransitions" CASCADE;
CREATE TABLE "itemClass"."StateTransitions" (
	"StateTransitionID" serial NOT NULL,
	"Name" varchar NOT NULL,
	"Description" varchar,
	"FromState" integer NOT NULL,
	"ToState" integer NOT NULL,
	CONSTRAINT "StateTransitions_pk" PRIMARY KEY ("StateTransitionID")

);
-- ddl-end --
ALTER TABLE "itemClass"."StateTransitions" OWNER TO pguser;
-- ddl-end --

-- object: items."Items" | type: TABLE --
-- DROP TABLE IF EXISTS items."Items" CASCADE;
CREATE TABLE items."Items" (
	"ItemID" serial NOT NULL,
	"Name" varchar NOT NULL,
	"Description" varchar,
	"ItemClassID" integer NOT NULL,
	CONSTRAINT "Items_pk" PRIMARY KEY ("ItemID")

);
-- ddl-end --
COMMENT ON TABLE items."Items" IS 'Item Master';
-- ddl-end --
ALTER TABLE items."Items" OWNER TO pguser;
-- ddl-end --

-- object: items."Properties" | type: TABLE --
-- DROP TABLE IF EXISTS items."Properties" CASCADE;
CREATE TABLE items."Properties" (
	"PropertyID" serial NOT NULL,
	"ItemID" integer NOT NULL,
	"Value" varchar,
	"ItemClassPropertyID" integer NOT NULL,
	CONSTRAINT properties_pk PRIMARY KEY ("PropertyID")

);
-- ddl-end --
COMMENT ON COLUMN items."Properties"."ItemID" IS 'Item Instance';
-- ddl-end --
COMMENT ON COLUMN items."Properties"."Value" IS 'Instance specific value';
-- ddl-end --
ALTER TABLE items."Properties" OWNER TO postgres;
-- ddl-end --

-- object: items."StateModel" | type: TABLE --
-- DROP TABLE IF EXISTS items."StateModel" CASCADE;
CREATE TABLE items."StateModel" (
	"StateModelID" serial NOT NULL,
	"ItemClassStateModel" integer NOT NULL,
	"State" integer,
	"ItemID" integer NOT NULL
);
-- ddl-end --
COMMENT ON COLUMN items."StateModel"."State" IS 'Actual State';
-- ddl-end --
ALTER TABLE items."StateModel" OWNER TO postgres;
-- ddl-end --

-- object: "ItemClass_fk" | type: CONSTRAINT --
-- ALTER TABLE "itemClass"."Properties" DROP CONSTRAINT IF EXISTS "ItemClass_fk" CASCADE;
ALTER TABLE "itemClass"."Properties" ADD CONSTRAINT "ItemClass_fk" FOREIGN KEY ("ItemClassID")
REFERENCES "itemClass"."ItemClass" ("ItemClassID") MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: "ItemClass_fk" | type: CONSTRAINT --
-- ALTER TABLE "itemClass"."StateModel" DROP CONSTRAINT IF EXISTS "ItemClass_fk" CASCADE;
ALTER TABLE "itemClass"."StateModel" ADD CONSTRAINT "ItemClass_fk" FOREIGN KEY ("ItemClassID")
REFERENCES "itemClass"."ItemClass" ("ItemClassID") MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: "StateModel_fk" | type: CONSTRAINT --
-- ALTER TABLE "itemClass"."State" DROP CONSTRAINT IF EXISTS "StateModel_fk" CASCADE;
ALTER TABLE "itemClass"."State" ADD CONSTRAINT "StateModel_fk" FOREIGN KEY ("StateModelID")
REFERENCES "itemClass"."StateModel" ("StateModelID") MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "FromStateID_fk" | type: CONSTRAINT --
-- ALTER TABLE "itemClass"."StateTransitions" DROP CONSTRAINT IF EXISTS "FromStateID_fk" CASCADE;
ALTER TABLE "itemClass"."StateTransitions" ADD CONSTRAINT "FromStateID_fk" FOREIGN KEY ("FromState")
REFERENCES "itemClass"."State" ("StateID") MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: "ToStateID" | type: CONSTRAINT --
-- ALTER TABLE "itemClass"."StateTransitions" DROP CONSTRAINT IF EXISTS "ToStateID" CASCADE;
ALTER TABLE "itemClass"."StateTransitions" ADD CONSTRAINT "ToStateID" FOREIGN KEY ("ToState")
REFERENCES "itemClass"."State" ("StateID") MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "ItemClass_fk" | type: CONSTRAINT --
-- ALTER TABLE items."Items" DROP CONSTRAINT IF EXISTS "ItemClass_fk" CASCADE;
ALTER TABLE items."Items" ADD CONSTRAINT "ItemClass_fk" FOREIGN KEY ("ItemClassID")
REFERENCES "itemClass"."ItemClass" ("ItemClassID") MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: "Item_fk" | type: CONSTRAINT --
-- ALTER TABLE items."Properties" DROP CONSTRAINT IF EXISTS "Item_fk" CASCADE;
ALTER TABLE items."Properties" ADD CONSTRAINT "Item_fk" FOREIGN KEY ("ItemID")
REFERENCES items."Items" ("ItemID") MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: "ItemClassProperty_fk" | type: CONSTRAINT --
-- ALTER TABLE items."Properties" DROP CONSTRAINT IF EXISTS "ItemClassProperty_fk" CASCADE;
ALTER TABLE items."Properties" ADD CONSTRAINT "ItemClassProperty_fk" FOREIGN KEY ("ItemClassPropertyID")
REFERENCES "itemClass"."Properties" ("PropertyID") MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "ItemID_fk" | type: CONSTRAINT --
-- ALTER TABLE items."StateModel" DROP CONSTRAINT IF EXISTS "ItemID_fk" CASCADE;
ALTER TABLE items."StateModel" ADD CONSTRAINT "ItemID_fk" FOREIGN KEY ("ItemID")
REFERENCES items."Items" ("ItemID") MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: "ItemClassStateModel_fk" | type: CONSTRAINT --
-- ALTER TABLE items."StateModel" DROP CONSTRAINT IF EXISTS "ItemClassStateModel_fk" CASCADE;
ALTER TABLE items."StateModel" ADD CONSTRAINT "ItemClassStateModel_fk" FOREIGN KEY ("ItemClassStateModel")
REFERENCES "itemClass"."StateModel" ("StateModelID") MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: "ItemClassState_fk" | type: CONSTRAINT --
-- ALTER TABLE items."StateModel" DROP CONSTRAINT IF EXISTS "ItemClassState_fk" CASCADE;
ALTER TABLE items."StateModel" ADD CONSTRAINT "ItemClassState_fk" FOREIGN KEY ("State")
REFERENCES "itemClass"."State" ("StateID") MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --


