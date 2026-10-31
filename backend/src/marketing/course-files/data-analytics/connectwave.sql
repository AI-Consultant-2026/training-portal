-- Paleon Certificate in Data Analytics & Business Intelligence
-- Module 5 assignment: build script for connectwave.db (Connectwave Telecom, fictional)
-- The cleaned customer list from the Module 4 assignment.
-- Run in a new database called connectwave.db, then Write Changes.
-- Expected: subscribers 12 rows.

CREATE TABLE subscribers (
  customer_id     TEXT PRIMARY KEY,
  plan            TEXT NOT NULL,
  region          TEXT NOT NULL,
  tenure_months   INTEGER,
  data_usage_gb   REAL,
  complaints      INTEGER,
  churned         TEXT
);
INSERT INTO subscribers VALUES
  ('K1001','Basic','North',4,3.5,2,'Yes'),
  ('K1002','Standard','South',18,12.0,0,'No'),
  ('K1003','Premium','East',30,40.0,1,'No'),
  ('K1004','Basic','West',2,1.2,3,'Yes'),
  ('K1005','Standard','North',9,15.5,1,'No'),
  ('K1006','Premium','South',14,35.0,0,'No'),
  ('K1007','Basic','East',6,4.0,1,'No'),
  ('K1008','Standard','West',3,8.0,4,'Yes'),
  ('K1009','Basic','North',24,2.5,0,'No'),
  ('K1010','Premium','West',5,22.0,2,'Yes'),
  ('K1011','Standard','East',12,10.5,1,'No'),
  ('K1012','Basic','South',1,0.8,2,'Yes');
