const express = require('express');
const allparkings = require('./parkings.json');

const app = express();

// app.get('/parkings', (req,res) => {
//     res.send("Liste des parkings")
// })

// app.post('/parkings', (req,res) => {res.status(200).json(allparkings)})
// app.listen(8080, () => {console.log("Serveur à l'écoute")})

// const parkings = allparkings.parkings;
// app.get('/parkings', (req,res) => {res.status(200).json(parkings)});

// app.get('/parkings/:id', (req,res) => {const id = parseInt(req.params.id);
// const parking = parkings.find(parking => parking.id === id)
// res.status(200).json(parking)});

app.listen(8080, () => {  console.log("Serveur à l'écoute sur le port 8080")});