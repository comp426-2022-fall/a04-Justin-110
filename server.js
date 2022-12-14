#!/usr/bin/env node
import { roll } from "./lib/roll.js";
import minimist from 'minimist';
import express from 'express';

const app = express();
const args = minimist(process.argv.slice(2));

//Encoded URI
app.use(express.urlencoded({extended:true}));

//take an arbitrary port number as a command line argument, default to 5000 if no argument is given
var port = 5000;
if ("port" in args) {
    port = args.port;
};


app.get('/', (req, res, next) => {
	res.send('Hello, world!');
});

// Check endpoint at /app/ that returns 200 OK
app.get('/app/', (req, res, next) => {
    res.status(200);
    res.send('200 OK');
});

app.get('/app/roll/', (req, res) => {
    res.status(200);
    res.send(roll(6,2,1));
});

app.post('/app/roll/', (req,res) => {
	res.send(roll(parseInt(req.body.sides),parseInt(req.body.dice),parseInt(req.body.rolls)));
});

app.get('/app/roll/:sides/', (req, res) => {
    res.status(200);
    res.send(roll(parseInt(req.params.sides), 2, 1));
});

app.get('/app/roll/:sides/:dice/', (req, res) => {
    res.status(200);
    res.send(roll(parseInt(req.params.sides), parseInt(req.params.dice), 1));
});

app.get('/app/roll/:sides/:dice/:rolls/', (req, res) => {
    res.status(200);
    res.send(roll(parseInt(req.params.sides),parseInt(req.params.dice),parseInt(req.params.rolls)));
});

// Default API endpoint that returns 404 NOT FOUND for any endpoints that are not defined
app.get("*", (req, res) => {
    res.status(404).send("404 NOT FOUND");
});

app.listen(port);