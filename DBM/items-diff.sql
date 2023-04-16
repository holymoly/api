-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 0.9.2-beta2
-- Diff date: 2019-11-23 12:43:34
-- Source model: items
-- Database: items
-- PostgreSQL version: 12.0

-- [ Diff summary ]
-- Dropped objects: 0
-- Created objects: 1
-- Changed objects: 1
-- Truncated tables: 0

SET search_path=public,pg_catalog,"itemClass",items;
-- ddl-end --


-- [ Dropped objects ] --
ALTER TABLE items."StateModels" DROP COLUMN IF EXISTS "ItemClassStateModel" CASCADE;
-- ddl-end --


-- [ Created objects ] --
-- object: "ItemClassStateModelID" | type: COLUMN --
-- ALTER TABLE items."StateModels" DROP COLUMN IF EXISTS "ItemClassStateModelID" CASCADE;
ALTER TABLE items."StateModels" ADD COLUMN "ItemClassStateModelID" integer NOT NULL;
-- ddl-end --




-- [ Changed objects ] --
COMMENT ON COLUMN items."StateModels"."StateID" IS E'Actual State';
-- ddl-end --
