//connection btw server and mongo db
//1.import mongoose
const mongoose = require('mongoose')

//2. define connection string
mongoose.connect('mongodb://localhost:27017/signing', () => {
  console.log('Mongodb connected successfully');
})

//3.create model
const Credential = mongoose.model('Credential', {
  uname: String
})

//book schema
const Novel = mongoose.model('Novel',{
    id: Number,
    title: String,
    author: String,
    price: Number,
    description:String,
    image: String,
    rating: {
      rate: Number,
      count: Number
    }
  })

//wishlist schema
const Wishlist = mongoose.model('Wishlist',{
  id: Number,
  title: String,
  author: String,
  price: Number,
  description:String,
  image: String
})





//4.export
module.exports = {
  Credential,
  Novel,
  Wishlist
}
