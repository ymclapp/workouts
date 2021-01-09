'use strict';

require('dotenv').config();


const PORT = process.env.PORT || 3000;

const express = require ('express');
// const methodOverride = require('method-override');   //<<--uncomment when the delete/update gets used in one of the view pages
const cors = require('cors');  //<<--if we need it
const pg = require('pg');
const superagent = require('superagent');

if(!process.env.DATABASE_URL) {
    throw 'Missing DATABASE_URL';    
}
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.log(err));





//middleware
const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(methodOverride('_method'));   //<<--uncomment when the delete/update gets used in one of the view pages
app.use(express.static('./public'));

app.set('view engine', 'ejs');

//routes
app.get('/', (request, response) => {
    response.render('index.ejs');
})

app.get('*', (request, response) => response.status(404).send('This route does not exist'));


// app.use((err, (request, response, next) => {
//     handleError(err, response);
// }));  <<--need to create before I can use


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