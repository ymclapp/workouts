'use strict';

require('dotenv').config();


const PORT = process.env.PORT || 3000;

const express = require ('express');
const methodOverride = require('method-override');
const pg = require('pg');

if(!process.env.DATABASE_URL) {
    throw 'Missing DATABASE_URL';    
}
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.log(err));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(express.static('./public'));

//middleware
const cors = require('cors');  //<<--if we need it
app.use(cors());



app.set('view engine', 'ejs');

//routes
app.get('/', (request, response) => {
    response.render('index');
})

app.get('*', (request, response) => response.status(404).send('This route does not exist'));


app.use((err, (request, response, next) => {
    handleError(err, response);
}));


client.connect()  //<----need to use this with the const client et al above
  .then (() => {
    console.log('PG Connected!');
    app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
  })
  .catch(err => {
    throw `PG error!: ${err.message}`;
  });


  //route handlers - these are the ones that would be in modules if modularizing
  //will need routes for adding a user, adding a date/weight, 