-- DATABASE NAME: choralsync_db

-- Database tables with no reference keys:
CREATE TABLE "section" (
	"id" SERIAL PRIMARY KEY,
	"voice_section" VARCHAR(10) NOT NULL
);

CREATE TABLE "shirt_size" (
	"id" SERIAL PRIMARY KEY,
	"size" VARCHAR(7) NOT NULL
);

CREATE TABLE "songs" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(255),
	"pdf_name" varchar(255) NOT NULL,
	"pdf_url" varchar(255) NOT NULL
);

CREATE TABLE "concert" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"period" VARCHAR(255) NOT NULL,
	"year" INT NOT NULL
);

CREATE TABLE "status" (
	"id" SERIAL PRIMARY KEY,
	"status" varchar(255) NOT NULL
);

CREATE TABLE "part" (
	"id" SERIAL PRIMARY KEY,
	"part" varchar(255) NOT NULL
);

CREATE TABLE "calendar" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(255) NOT NULL
);

-- Tables with foreign key references. 
    -- Must be entered in Postico AFTER tables above:
CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"username" VARCHAR(255) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"isChecklistCompleted" BOOLEAN NOT NULL DEFAULT FALSE,
	"isAdmin" BOOLEAN NOT NULL DEFAULT FALSE,
	"profile_id" INT REFERENCES "profile" NOT NULL
);

CREATE TABLE "profile" (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR(255) NOT NULL,
	"last_name" VARCHAR(255) NOT NULL,
	"middle_initial" VARCHAR(3),
	"hide_middle_initial" BOOLEAN NOT NULL DEFAULT FALSE,
	"pronouns" VARCHAR(255),
	"hide_pronouns" BOOLEAN NOT NULL DEFAULT FALSE,
	"street_address_1" VARCHAR(255),
	"street_address_2" VARCHAR(255),
	"city" VARCHAR(255),
	"state" VARCHAR(255),
	"zip" VARCHAR(10),
	"hide_address" BOOLEAN NOT NULL DEFAULT FALSE,
	"emergency_name" VARCHAR(255),
	"emergency_relation" VARCHAR(255),
	"emergency_phone" VARCHAR(10),
	"height_ft" INT,
	"height_in" INT,
	"phone" VARCHAR(10),
	"hide_phone" BOOLEAN NOT NULL DEFAULT FALSE,
	"email" VARCHAR(255) NOT NULL,
	"hide_email" BOOLEAN NOT NULL DEFAULT FALSE,
	"about" VARCHAR(255),
	"fun_fact" VARCHAR(255),
	"employer" VARCHAR(255),
	"occupation" VARCHAR(255),
	"website_url" VARCHAR(255),
	"x_url" VARCHAR(255),
	"facebook_url" VARCHAR(255),
	"linkedin_url" VARCHAR(255),
	"tiktok_url" VARCHAR(255),
	"sheet_music" VARCHAR(255),
	"accessibility" VARCHAR(500),
	"profile_photo_url" VARCHAR(255),
	"shirt_size_id" INT REFERENCES "shirt_size" NOT NULL,
	"section_id" INT REFERENCES "section" NOT NULL,
	"part_id" INT REFERENCES "part" NOT NULL,
	"status_id" INT REFERENCES "status" NOT NULL
	);

CREATE TABLE "tracks" (
	"id" SERIAL PRIMARY KEY,
	"track_name" VARCHAR(255) NOT NULL,
	"track_url" VARCHAR(255) NOT NULL,
	"track_section_id" INT REFERENCES "section" NOT NULL,
	"track_part_id" INT REFERENCES "part" NOT NULL,
	"song_id" INT REFERENCES "songs" NOT NULL	
);

CREATE TABLE "concert_songs" (
	"id" SERIAL PRIMARY KEY,
	"concert_id" INT REFERENCES "concert" NOT NULL,
	"song_id" INT REFERENCES "songs" NOT NULL
);

CREATE TABLE "events" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"date" DATE NOT NULL,
	"time" TIME NOT NULL,
	"description" varchar(255) NOT NULL,
	"calendar_id" INT REFERENCES "calendar" NOT NULL
);


-- Dropdown values into tables. 
-- Predetermined values for certain tables
INSERT INTO "part"
("part")
VALUES
('upper'),
('lower');

INSERT INTO "section"
("voice_section")
VALUES
('Tenor 1'),
('Tenor 2'),
('Baritone'),
('Bass');

INSERT INTO "status"
("status")
VALUES
('Active'),
('Leave of Absence'),
('Alumni');

INSERT INTO "shirt_size"
("size")
VALUES
('XS'),
('S'),
('M'),
('L'),
('XL'),
('XXL'),
('XXXL'),
('XXXXL');
