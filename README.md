# React TODO App with Mongo DB and API with Express server

[Based on Udemy course](https://www.udemy.com/course/ruby-on-rails-react-angular/)

![App Example](https://github.com/rcoproc/todo_app_react/blob/master/api/public/capa_React_app.png)

## Installing mongodb 

  https://docs.mongodb.com/manual/administration/install-community/


## Instructions for use:

    cd api/
    npm install
    npm start               # run express server on 3000 port


## Making the transpile with babel to app.js
    cd app
    npx babel --watch src --out-dir . --presets react-app/prod
