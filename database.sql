-- DATABASE NAME: choralsync_db

-- Database tables with no reference keys:
CREATE TABLE "shirt_size" (
	"id" SERIAL PRIMARY KEY,
	"size" VARCHAR(7)
);

CREATE TABLE "section" (
	"id" SERIAL PRIMARY KEY,
	"voice_section" VARCHAR(10)
);

CREATE TABLE "status" (
	"id" SERIAL PRIMARY KEY,
	"status" varchar(255)
);

CREATE TABLE "part" (
	"id" SERIAL PRIMARY KEY,
	"part" varchar(255)
);

CREATE TABLE "concert" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255),
	"period" VARCHAR(255),
	"year" INT
);

CREATE TABLE "calendar" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(255)
);

CREATE TABLE "songs" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(255),
	"pdf_name" varchar(255),
	"pdf_url" varchar(255)
);

--Database tables with reference values:
CREATE TABLE "tracks" (
	"id" SERIAL PRIMARY KEY,
	"track_name" VARCHAR(255),
	"track_url" VARCHAR(255),
	"track_section_id" INT REFERENCES "section",
	"track_part_id" INT REFERENCES "part",
	"song_id" INT REFERENCES "songs"	
);


CREATE TABLE "concert_songs" (
	"id" SERIAL PRIMARY KEY,
	"concert_id" INT REFERENCES "concert",
	"song_id" INT REFERENCES "songs"
);



CREATE TABLE "events" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255),
	"date" DATE,
	"time" TIME,
	"description" varchar(255),
	"calendar_id" INT REFERENCES "calendar"
);

CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"username" VARCHAR(255) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"isChecklistCompleted" BOOLEAN NOT NULL DEFAULT FALSE,
	"isAdmin" BOOLEAN NOT NULL DEFAULT FALSE,
	"isProfileComplete" BOOLEAN NOT NULL DEFAULT FALSE,
	"isContactComplete" BOOLEAN NOT NULL DEFAULT FALSE,
	"isEmergencyComplete" BOOLEAN NOT NULL DEFAULT FALSE,
	"isAboutComplete" BOOLEAN NOT NULL DEFAULT FALSE,
	"isSocialComplete" BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE "profile" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "users",
	"email" VARCHAR(255),
	"hide_email" BOOLEAN DEFAULT FALSE,
	"first_name" VARCHAR(255) DEFAULT NULL,
	"last_name" VARCHAR(255) DEFAULT NULL,
	"middle_initial" VARCHAR(3),
	"hide_middle_initial" BOOLEAN DEFAULT FALSE,
	"pronouns" VARCHAR(255) DEFAULT NULL,
	"hide_pronouns" BOOLEAN DEFAULT FALSE,
	"nickname" VARCHAR(255) DEFAULT NULL,
	"formal_name" VARCHAR(255) DEFAULT NULL,
	"street_address_1" VARCHAR(255) DEFAULT NULL,
	"street_address_2" VARCHAR(255) DEFAULT NULL,
	"city" VARCHAR(255) DEFAULT NULL,
	"state" VARCHAR(255) DEFAULT NULL,
	"zip" VARCHAR(10) DEFAULT NULL,
	"hide_address" BOOLEAN DEFAULT FALSE,
	"emergency_name" VARCHAR(255) DEFAULT NULL,
	"emergency_relation" VARCHAR(255) DEFAULT NULL,
	"emergency_phone" VARCHAR(10) DEFAULT NULL,
	"height_ft" INT,
	"height_in" INT,
	"birthday" TIMESTAMPTZ,
	"phone" VARCHAR(10) DEFAULT NULL,
	"hide_phone" BOOLEAN DEFAULT FALSE,
	"about" VARCHAR(255) DEFAULT NULL,
	"fun_fact" VARCHAR(255) DEFAULT NULL,
	"employer" VARCHAR(255) DEFAULT NULL,
	"occupation" VARCHAR(255) DEFAULT NULL,
	"website_url" VARCHAR(255) DEFAULT NULL,
	"x_url" VARCHAR(255) DEFAULT NULL,
	"instagram_url" VARCHAR(255) DEFAULT NULL,
	"facebook_url" VARCHAR(255) DEFAULT NULL,
	"linkedin_url" VARCHAR(255) DEFAULT NULL,
	"tiktok_url" VARCHAR(255) DEFAULT NULL,
	"sheet_music" VARCHAR(255) DEFAULT NULL,
	"accessibility" VARCHAR(500) DEFAULT NULL,
	"profile_photo_url" VARCHAR(255) DEFAULT NULL,
	"shirt_size_id" INT REFERENCES "shirt_size",
	"section_id" INT REFERENCES "section",
	"part_id" INT REFERENCES "part",
	"status_id" INT REFERENCES "status"
	);


--Databases with set values:
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

INSERT INTO "section"
("voice_section")
VALUES
('Tenor 1'),
('Tenor 2'),
('Baritone'),
('Bass');
('Balanced Voices')

INSERT INTO "part"
("part")
VALUES
('upper'),
('lower');

INSERT INTO "status"
("status")
VALUES
('Active'),
('Leave of Absence'),
('Alumni');