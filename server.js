#!/usr/bin/env node

import minimist from 'minimist';
import express, { application } from 'express';
import { roll } from "./lib/roll.js";

const app = express()
const args = minimist(process.argv.slice(2))

//take an arbitrary port number as a command line argument, default to 5000 if no argument is given
var port = 0
if (args.port) {
    port = args.port
} else {
    port = 5000
}

//Encoded URI
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Check endpoint at /app/ that returns 200 OK
app.get('/app/', (req, res, next) => {
    res.type('html')
    res.status(200)
    res.send('200 OK')
})

const sides = 6
const dice = 2
const rolls = 1

app.get('/app/roll/', (req, res, next) => {
    res.status(200)
    res.send(roll(parseInt(sides, dice, rolls)))
})

app.post('/app/roll/', (req, res) => {
    res.status(200);
    res.send(roll(parseInt(req.body.sides),parseInt(req.body.dice),parseInt(req.body.rolls)));
});

app.get('/app/roll/:sides/', (req, res, next) => {
    res.status(200);
    res.send(roll(parseInt(req.params.sides), dice, rolls))
})

app.get('/app/roll/:sides/:dice/', (req, res, next) => {
    res.status(200);
    res.send(roll(parseInt(req.params.sides), parseInt(req.params.dice), rolls))
})

app.get('/app/roll/:sides/:dice/:rolls/', (req, res, next) => {
    res.status(200);
    res.send(roll(parseInt(req.params.sides),parseInt(req.params.dice),parseInt(req.params.rolls)))
})

app.listen(port)



// Default API endpoint that returns 404 NOT FOUND for any endpoints that are not defined
app.get('*', (req, res, next) => {
    res.type('html')
	res.status(404)
    res.send('404 NOT FOUND')
})

app.listen(port)