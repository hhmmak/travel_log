# Travel Log

*A place to store your travel memories and seek for the next adventure*

It is very common nowadays to share travel snapshots with one another. However, it is sometimes hard to remember every detail of it. 
Where you had lunch on a day, when you started the day to arrive on time for the event...  
  
This app is here for everyone to keep track of their trips, so that you can share it with family and friends. Moreover, if you are short of ideas for you next travel, this is also a place where you can take reference of other's travel plan and make it as your own.

![Screenshot 2024-03-21 at 00 21 44](https://github.com/hhmmak/travel_log/assets/100734684/2742c402-6416-43cd-b6c8-08cce721d734)


## Features
* Keep track of travel details including travel itinerary and journal.
* Create, read, update and delete your travel itinerary posts
* Bookmark posts by other users
* User authentication system using JWT to allow multi-user use and privacy of personal information
* Profile page to keep track of your own posts and bookmarks.

## Technical Overview
The following are frameworks and languages used for the application:
* React.js
* Flask
* MySQL

## Installation
This application can be run locally by cloning the application onto your computer. MySQL has to be installed prior running the application.

npm and virtual environment with the use of Pipenv is used for frontend and backend. Dependencies are required to be installed respectively.
* to install dependencies for frontend
```bash
$ cd client
$ npm install
```
* to install dependencies for backend
```bash
$ cd server
$ pipenv shell
$ pipenv install
$ exit  #exit virtual environment
```
`.env` file is required to be created for the backend (under `./server`) to store user-defined keys and data.
* example .env file
```env
MYSQL_KEY="mySQLKey"  #password to access MYSQL server
APP_KEY="flaskAppKey"
TOKEN_KEY="yourJWTsecretkey"
```

### Start running locally
The frontend and backend will be run on two different port. MongoDB server needs to be turned on before running the application.
* to start running frontend, by default on `http://localhost:3000`
```bash
$ cd client
$ npm start
```
* to activate virtual environment and start running backend, by default on `http://localhost:5000`
```bash
$ cd server
$ pipenv shell
$ python server.py
```
* to deactivate backend virtual environment when done with application
```bash
$ exit
```
