(View Raw will give you the markdown that you can copy to your repos!)

![REPO SIZE](https://img.shields.io/github/repo-size/bpol87/choralsync.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/bpol87/choralsync.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/bpol87/choralsync.svg?style=social)

# ChoralSync: A Choral Management Tool

## Description

_Duration: 2 Week Sprint_

Utilizing my background in UX/UI Design, while also being a member of a 150+ member chorus, I have heard a lot of gripings about the current tool used by my chorus. I chose to dive into that space by conducting a full UX study and interview/survey current members to identify their pain points.

Through surveys and user interviews I identified the top areas of problems for users and chose to focus on that area. The places I focused on for this project are Profile/Member Directory as well as Concerts and Rehearsal Tracks. 

To see the fully functional site, please visit: [DEPLOYED VERSION OF APP](www.heroku.com)

## Mock-up
For my project I created a full mockup of the pages and the dropdowns and functionality using Figma: [Full Mock Up Link] (https://www.figma.com/design/5sehjUrC64Cojd20ZAQskn/Solo-Project?node-id=103-1486&t=TA1x2KBtYOTVNfyF-1)


### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en)
- Your SQL server 
- [Nodemon](https://nodemon.io)
- [TailwindCSS] (https://tailwindcss.com/)
- [Heroicons] (https://heroicons.com/)


## Installation

1. Clone down this repo onto your local computer.
2. run `npm install` in the terminal.
3. use the `database.sql` file and in your SQL database client (I used Postico) create a `choralsync-db` table. 
- If you would like to name your database something else, you will need to change `choralsync-db` to the name of your new database name in `server/modules/pool.js`.
4. Create a `.env` file in your project folder.
5. you will need an `Amazon Web Services S3 Storage` (AWS) account to house the profile photos, sheet music, and rehearsal tracks.
6. In your `Amazon S3` account you will need 3 buckets - one for photos, one for sheet music, and one for rehearsal tracks.
7. in your `.env` file add the following named pieces:
  - SERVER_SESSION_SECRET = '{make this a secure string - you can use [Password Generator Plus](https://passwordsgenerator.net) to create something long and secure}'
  - `AWS_ACCESS_KEY_ID = '{your AWS public access key}'`
  - `AWS_SECRET_ACCESS_KEY = '{your AWS secret access key}'`
  - `AWS_REGION = '{your AWS region}'`
  - `AWS_PHOTO_BUCKET_NAME = '{the name of your AWS Profile Photo bucket}'`
  - `AWS_TRACKS_BUCKET_NAME = '{the name of your AWS rehearsal tracks bucket}'`
  - `AWS_SHEET_MUSIC_BUCKET_NAME = '{the name of your AWS sheet music bucket}'`
8. Once your database, AWS setup, and npm install are complete, in your terminal run: 
- `npm run server`
- `npm run client`
5. Navigate in your web browser to: `localhost:5173/`

If your application has secret keys (for example --  Twilio), make sure you tell them how to set that up, both in getting the key and then what to call it in the `.env` file.

1. Create a database named `your database name`,
2. The queries in the `tables.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage
How does someone use this application? Tell a user story here.

1. A new user can register using their email address and setting a password and selecting a role as Admin or General User. (for future use, the admins will be able to register users and send those users login information so the role will be preset for them.)
2. Upon registering, a user will be directed to the New Profile Checklist, where they can fill out their profile.
3. Once the user fills out the checklist and reviews the profile, they submit the profile and are brought to the home page of the site.
4. From there, the user can see the member directory or the music library (with additional features to be added in the future.)

## Built With

List technologies and frameworks here

## License
[MIT](https://choosealicense.com/licenses/mit/)

_Note, include this only if you have a license file. GitHub will generate one for you if you want!_

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. (Thank your people)

## Support
If you have suggestions or issues, please email me at [youremail@whatever.com](www.google.com)






# Prime Solo Project - Starting Repo

This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

We **STRONGLY** recommend following these instructions carefully. It's a lot, and will take some time to set up, but your life will be much easier this way in the long run.

## Use the Template for This Repository (Don't Clone)

- Don't Fork or Clone. Instead, click the `Use this Template` button, and make a copy to your personal account. Make the project `PUBLIC`!

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org)
- [Nodemon](https://nodemon.io)

## Create Database and Table

Create a new database called `prime_app` and create a `user` table:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
```

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`.

## Development Setup Instructions

- Run `npm install`.
    - Be sure to take stock of `package.json` to see which dependencies you'll need to add.
- Create a `.env` file at the root of the project and paste this line into the file:

```plaintext
SERVER_SESSION_SECRET=superDuperSecret
```

While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [Password Generator Plus](https://passwordsgenerator.net). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.

- Start postgres if not running already by using opening up the [Postgres.app](https://postgresapp.com), or if using [Homebrew](https://brew.sh) you can use the command `brew services start postgresql`.
- Run `npm run server` to start the server.
- Run `npm run client` to start the client.
- Navigate to `localhost:5173`.

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)

## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum.

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Run `npm run server` to start the server.
2. Import the sample routes JSON file [v2](./PostmanPrimeSoloRoutesv2.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
   1. `POST /api/user/register` registers a new user, see body to change username/password.
   2. `POST /api/user/login` will login a user, see body to change username/password.
   3. `GET /api/user` will get user information, by default it's not very much.

After running the login route above, you can try any other route you've created that requires a logged in user!

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using opening up the [Postgres.app](https://postgresapp.com), or if using [Homebrew](https://brew.sh) you can use the command `brew services start postgresql`.
- Run `npm start`.
- Navigate to `localhost:5173`.

## Lay of the Land

There are a few videos linked below that show a walkthrough the client and sever setup to help acclimatize to the boilerplate. Please take some time to watch the videos in order to get a better understanding of what the boilerplate is like.

- [Initial Set](https://vimeo.com/453297271)
- [Server Walkthrough](https://vimeo.com/453297212)
- [Client Walkthrough](https://vimeo.com/453297124)

Directory Structure:

- `src/` contains the React application.
- `public/` contains static assets for the client-side.
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site.
- `server/` contains the Express App.

This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

- src/components
  - App/App
  - Footer/Footer
  - Nav/Nav
  - AboutPage/AboutPage
  - InfoPage/InfoPage
  - UserPage/UserPage
  - LoginPage/LoginPage
  - RegisterPage/RegisterPage
  - LogOutButton/LogOutButton
  - ProtectedRoute/ProtectedRoute

## Deployment

1. Create a new Heroku project.
1. Link the Heroku project to the project GitHub Repo.
1. Create an Heroku Postgres database.
1. Connect to the Heroku Postgres database from Postico.
1. Create the necessary tables.
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security.
1. In the deploy section, select manual deploy.

## Update Documentation

Customize this ReadMe and the code comments in this project to read less like a starter repo and more like a project. Here is an example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2.
