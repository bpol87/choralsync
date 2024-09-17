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
- Your choice of SQL server - We used PostgreSQL and Postico.



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

## Usage
How does someone use this application? Tell a user story here.

1. A new user can register using their email address and setting a password and selecting a role as Admin or General User. (for future use, the admins will be able to register users and send those users login information so the role will be preset for them.)
2. Upon registering, a user will be directed to the New Profile Checklist, where they can fill out their profile.
3. Once the user fills out the checklist and reviews the profile, they submit the profile and are brought to the home page of the site.
4. From there, the user can see the member directory or the music library (with additional features to be added in the future.)

## Built With

- [React.js](https://react.dev/)
- [Node.js](https://nodejs.org/en)
- [TailwindCSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)
- [Amazon Web Services (AWS) S3 Storage](https://aws.amazon.com/)



## License
[MPL-2.0](https://choosealicense.com/licenses/mpl-2.0/)

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. (Thank your people)

## Support
If you have suggestions or issues, please email me at [benpollack8723@gmail.com](www.google.com)

## Copyright
© 2024 Ben Pollack | Poseidon Marketing & Design. All rights reserved.