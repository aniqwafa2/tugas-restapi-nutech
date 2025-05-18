CREATE TABLE "users" (
  "id" INT PRIMARY KEY,
  "email" VARCHAR(50) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL
);

CREATE TABLE "user_profiles" (
  "id" INT PRIMARY KEY,
  "user_id" INT NOT NULL,
  "first_name" VARCHAR(100),
  "last_name" VARCHAR(100),
  "profile_image" VARCHAR(225),
  "created_at" TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP',
  "updated_at" TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
);

CREATE TABLE "user_balances" (
  "id" INT PRIMARY KEY,
  "user_id" INT NOT NULL,
  "balance" INT DEFAULT '0',
  "created_at" TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP',
  "updated_at" TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
);

CREATE TABLE "banners" (
  "id" INT PRIMARY KEY,
  "banner_name" VARCHAR(100),
  "banner_image" VARCHAR(225),
  "description" TEXT,
  "created_at" TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP',
  "updated_at" TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
);

CREATE TABLE "services" (
  "id" INT PRIMARY KEY,
  "service_code" VARCHAR(100),
  "service_name" VARCHAR(100),
  "service_icon" VARCHAR(225),
  "service_tarif" INT,
  "created_at" TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP',
  "updated_at" TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
);

CREATE TABLE "Trsnsactions" (
  "id" INT PRIMARY KEY,
  "user_id" INT NOT NULL,
  "invoice_number" VARCHAR(225),
  "transaction_type" VARCHAR(100),
  "service_code" VARCHAR(100),
  "service_name" VARCHAR(100),
  "total_amount" INT,
  "created_at" TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP',
  "updated_at" TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
);

ALTER TABLE "user_profiles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_balances" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "Trsnsactions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
