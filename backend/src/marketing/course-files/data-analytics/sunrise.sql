-- Paleon Certificate in Data Analytics & Business Intelligence
-- Lesson 5.2: build script for sunrise.db (Sunrise Mart, fictional)
-- In DB Browser for SQLite: New Database > sunrise.db > Cancel the table dialog >
-- Execute SQL tab > paste this whole file > Execute all > Write Changes.
-- Expected: customers 8 rows, sales 10 rows. Order total = quantity * unit_price.

CREATE TABLE customers (
  customer_id   TEXT PRIMARY KEY,
  full_name     TEXT NOT NULL,
  gender        TEXT,
  date_of_birth TEXT,
  city          TEXT,
  signup_date   TEXT,
  channel       TEXT
);
INSERT INTO customers VALUES
  ('C001','Amara Mensah','F','1998-04-12','Riverside','2026-01-05','App'),
  ('C002','John Kamau','M','1995-07-12','Central','2026-01-05','Branch'),
  ('C003','Thandi Nkosi','F','2001-11-30','Hilltop','2026-01-06','Website'),
  ('C005','Chinedu Eze','M',NULL,'Central','2026-01-07','Branch'),
  ('C006','Wanjiru Otieno','F','1990-06-21','Hilltop','2026-01-08','App'),
  ('C007','Kwame Boateng','M',NULL,'Central','2026-01-08','Branch'),
  ('C008','Fatima Bello','F','1993-09-03','Riverside','2026-01-09','Website'),
  ('C009','Lindiwe Dube','F','1999-02-17','Riverside','2026-01-10','App');
CREATE TABLE sales (
  order_id    INTEGER PRIMARY KEY,
  order_date  TEXT NOT NULL,
  branch      TEXT NOT NULL,
  customer_id TEXT REFERENCES customers(customer_id),
  category    TEXT NOT NULL,
  quantity    INTEGER NOT NULL,
  unit_price  INTEGER NOT NULL
);
INSERT INTO sales VALUES
  (1001,'2026-03-02','Central','C001','Drinks',4,350),
  (1002,'2026-03-02','Riverside','C002','Snacks',2,500),
  (1003,'2026-03-02','Central','C005','Groceries',1,2500),
  (1004,'2026-03-03','Hilltop','C003','Drinks',6,350),
  (1005,'2026-03-03','Riverside','C008','Drinks',3,350),
  (1006,'2026-03-03','Central','C007','Snacks',5,500),
  (1007,'2026-03-04','Hilltop','C006','Groceries',2,2500),
  (1008,'2026-03-04','Riverside','C001','Groceries',1,2500),
  (1009,'2026-03-04','Hilltop','C003','Drinks',8,350),
  (1010,'2026-03-04','Central','C002','Drinks',2,350);
