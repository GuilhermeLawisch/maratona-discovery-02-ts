import "reflect-metadata";
import express = require("express");
import { createConnection } from "typeorm";
import { router } from "./routes";
import { join } from "path";

// const path = require("path")

createConnection();

const app = express();

app.use(express.json());

// usar template engine
app.set('view engine', 'ejs')

// mudar a localização da pasta views
app.set('views', join(__dirname, 'views'))

// habilitar arquivos estáticos
app.use(express.static("public"))

// usar o req.body
app.use(express.urlencoded({ extended: true }))

app.use(router);

export { app };

/*
import {createConnection} from "typeorm";
import {User} from "./entity/User";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
*/