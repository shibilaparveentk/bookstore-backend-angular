//creating server using express

//1.import express
const express = require('express')

//import cors
const cors = require('cors')

//import dataservice
const dataService = require('./services/dataservice')



//2. create server app using express
const app = express()


//to parse json data
app.use(express.json())

//using cors define origin to server app
app.use(cors({
  origin: ['http://localhost:4200']
}))


//3. setup the port to run server app
app.listen(3000, () => {
  console.log('server started at port 3000');
})

//4.http request
//1.LOGIN API
app.post('/login', (req, res) => {
  console.log('inside login function');
  console.log(req.body);
  //asynchronous
  dataService.login(req.body.uname)
    .then((result) => {
      res.status(result.statusCode).json(result)
    })
})

// //getallbooks API
app.get('/all-books',(req,res)=>{
  console.log('Inside getallbooks function');
  dataService.getallbooks()
  .then((result)=>{
    res.status(result.statusCode).json(result)
  })
})


//add-to-wishlist API
app.post('/add-to-wishlist', (req, res) => {
  console.log('inside add-to-wishlist function');
  console.log(req.body);
  dataService.addtowishlist(req.body.id, req.body.title, req.body.author,req.body.price, req.body.description, req.body.image)
    .then((result) => {
      res.status(result.statusCode).json(result)
    })
})

//getwishlist API
app.get('/get-wishlist', (req, res) => {
  console.log('inside getwishlist function');
  dataService.getwishlist()
    .then((result) => {
      res.status(result.statusCode).json(result)
    })
})

//delete-item-wishlist
app.delete('/delete-item-wishlist/:id', (req, res) => {
  console.log('inside delete-item-wishlist fucntion ');
  dataService.deletefromwishlist(req.params.id)
    .then((result) => {
      res.status(result.statusCode).json(result)
    })
})