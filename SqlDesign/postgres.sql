--
-- PostgreSQL database dump
--

-- Dumped from database version 12.0 (Debian 12.0-2.pgdg100+1)
-- Dumped by pg_dump version 12.0

-- Started on 2019-10-30 10:26:49 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 11 (class 2615 OID 24586)
-- Name: api; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA api;


ALTER SCHEMA api OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 24589)
-- Name: groups; Type: TABLE; Schema: api; Owner: postgres
--

CREATE TABLE api.groups (
    group_id bigint NOT NULL,
    username character varying(45),
    isguest character varying(4) DEFAULT '0'::character varying NOT NULL,
    isuser character varying(4) DEFAULT '0'::character varying NOT NULL,
    isadmin character varying(4) DEFAULT '0'::character varying NOT NULL,
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE api.groups OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 24587)
-- Name: groups_group_id_seq; Type: SEQUENCE; Schema: api; Owner: postgres
--

CREATE SEQUENCE api.groups_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE api.groups_group_id_seq OWNER TO postgres;

--
-- TOC entry 2958 (class 0 OID 0)
-- Dependencies: 208
-- Name: groups_group_id_seq; Type: SEQUENCE OWNED BY; Schema: api; Owner: postgres
--

ALTER SEQUENCE api.groups_group_id_seq OWNED BY api.groups.group_id;


--
-- TOC entry 211 (class 1259 OID 24599)
-- Name: passwords; Type: TABLE; Schema: api; Owner: postgres
--

CREATE TABLE api.passwords (
    password_id bigint NOT NULL,
    hash character varying(60) NOT NULL,
    username character varying(45),
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE api.passwords OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 24597)
-- Name: passwords_password_id_seq; Type: SEQUENCE; Schema: api; Owner: postgres
--

CREATE SEQUENCE api.passwords_password_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE api.passwords_password_id_seq OWNER TO postgres;

--
-- TOC entry 2959 (class 0 OID 0)
-- Dependencies: 210
-- Name: passwords_password_id_seq; Type: SEQUENCE OWNED BY; Schema: api; Owner: postgres
--

ALTER SEQUENCE api.passwords_password_id_seq OWNED BY api.passwords.password_id;


--
-- TOC entry 213 (class 1259 OID 24606)
-- Name: users; Type: TABLE; Schema: api; Owner: postgres
--

CREATE TABLE api.users (
    user_id bigint NOT NULL,
    firstname character varying(45) NOT NULL,
    lastname character varying(45) NOT NULL,
    username character varying(45) NOT NULL,
    email character varying(100) NOT NULL,
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE api.users OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 24604)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: api; Owner: postgres
--

CREATE SEQUENCE api.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE api.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 2960 (class 0 OID 0)
-- Dependencies: 212
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: api; Owner: postgres
--

ALTER SEQUENCE api.users_user_id_seq OWNED BY api.users.user_id;


--
-- TOC entry 2799 (class 2604 OID 24592)
-- Name: groups group_id; Type: DEFAULT; Schema: api; Owner: postgres
--

ALTER TABLE ONLY api.groups ALTER COLUMN group_id SET DEFAULT nextval('api.groups_group_id_seq'::regclass);


--
-- TOC entry 2804 (class 2604 OID 24602)
-- Name: passwords password_id; Type: DEFAULT; Schema: api; Owner: postgres
--

ALTER TABLE ONLY api.passwords ALTER COLUMN password_id SET DEFAULT nextval('api.passwords_password_id_seq'::regclass);


--
-- TOC entry 2806 (class 2604 OID 24609)
-- Name: users user_id; Type: DEFAULT; Schema: api; Owner: postgres
--

ALTER TABLE ONLY api.users ALTER COLUMN user_id SET DEFAULT nextval('api.users_user_id_seq'::regclass);


--
-- TOC entry 2948 (class 0 OID 24589)
-- Dependencies: 209
-- Data for Name: groups; Type: TABLE DATA; Schema: api; Owner: postgres
--

-- COPY api.groups (group_id, username, isguest, isuser, isadmin, created) FROM stdin;



--
-- TOC entry 2950 (class 0 OID 24599)
-- Dependencies: 211
-- Data for Name: passwords; Type: TABLE DATA; Schema: api; Owner: postgres
--

-- COPY api.passwords (password_id, hash, username, created) FROM stdin;



--
-- TOC entry 2952 (class 0 OID 24606)
-- Dependencies: 213
-- Data for Name: users; Type: TABLE DATA; Schema: api; Owner: postgres
--

-- COPY api.users (user_id, firstname, lastname, username, email, created) FROM stdin;


--
-- TOC entry 2961 (class 0 OID 0)
-- Dependencies: 208
-- Name: groups_group_id_seq; Type: SEQUENCE SET; Schema: api; Owner: postgres
--

SELECT pg_catalog.setval('api.groups_group_id_seq', 1, true);


--
-- TOC entry 2962 (class 0 OID 0)
-- Dependencies: 210
-- Name: passwords_password_id_seq; Type: SEQUENCE SET; Schema: api; Owner: postgres
--

SELECT pg_catalog.setval('api.passwords_password_id_seq', 1, true);


--
-- TOC entry 2963 (class 0 OID 0)
-- Dependencies: 212
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: api; Owner: postgres
--

SELECT pg_catalog.setval('api.users_user_id_seq', 1, true);


--
-- TOC entry 2810 (class 2606 OID 24625)
-- Name: groups idx_24589_primary; Type: CONSTRAINT; Schema: api; Owner: postgres
--

ALTER TABLE ONLY api.groups
    ADD CONSTRAINT idx_24589_primary PRIMARY KEY (group_id);


--
-- TOC entry 2812 (class 2606 OID 24624)
-- Name: passwords idx_24599_primary; Type: CONSTRAINT; Schema: api; Owner: postgres
--

ALTER TABLE ONLY api.passwords
    ADD CONSTRAINT idx_24599_primary PRIMARY KEY (password_id);


--
-- TOC entry 2816 (class 2606 OID 24626)
-- Name: users idx_24606_primary; Type: CONSTRAINT; Schema: api; Owner: postgres
--

ALTER TABLE ONLY api.users
    ADD CONSTRAINT idx_24606_primary PRIMARY KEY (email);


--
-- TOC entry 2808 (class 1259 OID 24614)
-- Name: idx_24589_fk_username_idx; Type: INDEX; Schema: api; Owner: postgres
--

CREATE INDEX idx_24589_fk_username_idx ON api.groups USING btree (username);


--
-- TOC entry 2813 (class 1259 OID 24612)
-- Name: idx_24599_username_unique; Type: INDEX; Schema: api; Owner: postgres
--

CREATE UNIQUE INDEX idx_24599_username_unique ON api.passwords USING btree (username);


--
-- TOC entry 2814 (class 1259 OID 24617)
-- Name: idx_24606_email_unique; Type: INDEX; Schema: api; Owner: postgres
--

CREATE UNIQUE INDEX idx_24606_email_unique ON api.users USING btree (email);


--
-- TOC entry 2817 (class 1259 OID 24615)
-- Name: idx_24606_user_id_unique; Type: INDEX; Schema: api; Owner: postgres
--

CREATE UNIQUE INDEX idx_24606_user_id_unique ON api.users USING btree (user_id);


--
-- TOC entry 2818 (class 1259 OID 24618)
-- Name: idx_24606_username_unique; Type: INDEX; Schema: api; Owner: postgres
--

CREATE UNIQUE INDEX idx_24606_username_unique ON api.users USING btree (username);


--
-- TOC entry 2819 (class 2606 OID 24627)
-- Name: groups fk_username; Type: FK CONSTRAINT; Schema: api; Owner: postgres
--

ALTER TABLE ONLY api.groups
    ADD CONSTRAINT fk_username FOREIGN KEY (username) REFERENCES api.users(username) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2820 (class 2606 OID 24632)
-- Name: passwords username; Type: FK CONSTRAINT; Schema: api; Owner: postgres
--

ALTER TABLE ONLY api.passwords
    ADD CONSTRAINT username FOREIGN KEY (username) REFERENCES api.users(username) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2019-10-30 10:26:50 CET

--
-- PostgreSQL database dump complete
--
