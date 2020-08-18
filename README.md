# Github Users App
A side project app where users can login using their Github credentials and follow other people.

## Features
- Login with Github using Oauth
- Fetch last 200 users who have forked Facebook's React repo
- Display users using Pagination
- Follow users
- In the About section, display total number of users who have forked the repo so far

## Technologies
- 100% JavaScript
- React and Context API
- ExpressJS for backed
- Material UI for pagination
- Font Awesome for Icons

## Local Setup
1. Clone the repository
2. `npm install`
3. `npm start`
4. You will need to create a `.env` file with a `client_id`, `secret_key`, `proxy_url` and `redirect_uri` to allow for github apis to work
