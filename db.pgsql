--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    image character varying,
    title character varying,
    description character varying,
    price numeric(4,2)
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO postgres;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.products.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id oid NOT NULL,
    username character varying(20),
    password character varying,
    admin boolean
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public.users.id;


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, image, title, description, price) FROM stdin;
1	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEpqPVCslipaJGcye60z7sKRPG7qYcKrU7txKM_dQYZOhPvTr2&s	Thing	Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum aliquam nesciunt sunt similique corrupti architecto ratione nulla odio distinctio rem neque laboriosam officia, repudiandae dolorem rerum, nobis quod porro aliquid!	12.00
2	https://www.tapeciarnia.pl/tapety/normalne/254761_rozowy_kwiatek_makro.jpg	Flower	Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum aliquam nesciunt sunt similique corrupti architecto ratione nulla odio distinctio rem neque laboriosam officia, repudiandae dolorem rerum, nobis quod porro aliquid!	5.21
3	https://www.tapeciarnia.pl/tapety/normalne/254761_rozowy_kwiatek_makro.jpg	Flower	Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum aliquam nesciunt sunt similique corrupti architecto ratione nulla odio distinctio rem neque laboriosam officia, repudiandae dolorem rerum, nobis quod porro aliquid!	5.21
4	https://www.tapeciarnia.pl/tapety/normalne/254761_rozowy_kwiatek_makro.jpg	Flower	Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum aliquam nesciunt sunt similique corrupti architecto ratione nulla odio distinctio rem neque laboriosam officia, repudiandae dolorem rerum, nobis quod porro aliquid!	5.21
5	https://www.tapeciarnia.pl/tapety/normalne/254761_rozowy_kwiatek_makro.jpg	Flower	Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum aliquam nesciunt sunt similique corrupti architecto ratione nulla odio distinctio rem neque laboriosam officia, repudiandae dolorem rerum, nobis quod porro aliquid!	5.21
6	https://www.tapeciarnia.pl/tapety/normalne/254761_rozowy_kwiatek_makro.jpg	Flower	Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum aliquam nesciunt sunt similique corrupti architecto ratione nulla odio distinctio rem neque laboriosam officia, repudiandae dolorem rerum, nobis quod porro aliquid!	5.21
7	https://www.tapeciarnia.pl/tapety/normalne/254761_rozowy_kwiatek_makro.jpg	Flower	Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum aliquam nesciunt sunt similique corrupti architecto ratione nulla odio distinctio rem neque laboriosam officia, repudiandae dolorem rerum, nobis quod porro aliquid!	5.21
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, admin) FROM stdin;
2	Marian	$2b$10$XdWUi.dgZvFeMR6WWrajv.RVkR/Vd5JOFcad8o5k2xvEObuMO.st.	f
1	Piotr	haslo	t
3	Stefan	$2b$10$9g9TYS9QYDSwVud8JsS.COzegRXOo1iQuG.0KxUG30/YZigU6xrHO	f
4	Maciej	$2b$10$ipsnN5hvnYX83AM6QWhjce42ZJVzIufB434D86U13fiOXpDaWa5V2	f
5	admin	$2b$10$HuwK9EpwFQYslTrnRK.2yuou.8hWrH0BcIxDCH/MpboDPl.iT60Cu	t
\.


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_id_seq', 7, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 5, true);


--
-- Name: products product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

