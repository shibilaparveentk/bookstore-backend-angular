//import model Credential
const db = require('./db')



//login function
const login = (uname) => {
  console.log('inside login function definition');
  //check uname and psswd is present in mongo db
  return db.Credential.findOne({
    uname
  }).then((result) => {
    if (result) {
      //uname is presnt in db
      console.log('Login successful');
      return {
        status: true,
        message: 'Login successful',
        statusCode: 200
      }

    }
    else {
      console.log('Inavlid Username');
      return {
        status: false,
        message: 'Inavlid Username',
        statusCode: 404
      }
    }
  })
}

//getallbooks
const getallbooks = () => {
  return db.Novel.find()
    .then((data) => {
      if (data) {
        return {
          statusCode: 200,
          result: data
        }
      }
      else {
        return {
          statusCode: 404,
          message: 'Failed to fetch data from database'
        }
      }
    })
}

//addtowishlist
const addtowishlist = (id, title, author, price, description, image) => {
  return db.Wishlist.findOne({
    id
  }).then((result)=>{
    if(result){
      return{
        statusCode:404,
        message:'Book already exist in your wishlist'
      }
    }
    else{
      const newNovel = new db.Wishlist({
        id,
        title,
        author,
        price,
        description,
        image
      });
      newNovel.save()
      return{
        statusCode:200,
        message: 'Book successfully added to your wishlist'
      }
    }
  })
}


//getwishlist
const getwishlist = ()=>{
  return db.Wishlist.find()
  .then((data) => {
    if (data) {
      return {
        statusCode: 200,
        result: data
      }
    }
    else {
      return {
        statusCode: 404,
        message: 'Your Wishlist is empty'
      }
    }
  })
}


//deleteFromWishlist
const deletefromwishlist = (id) => {
  return db.Wishlist.deleteOne({
    id
  })
    .then(
      (data) => {
        if (data) {
         return db.Wishlist.find()
         .then((data)=>{
          if(data){
            return{
              statusCode:200,
              wishlist:data,
              message:'Book removed from your wishlist'
            }
          }
          else{
            return{
              statusCode:404,
              message:'Your Wishlist is empty'
            }
          }
         })
        }
        else {
          return {
            statusCode: 404,
            message: 'Book not available'
          }
        }
      }
    )
}



//export
module.exports = {
  login,
  getallbooks,
  addtowishlist,
  getwishlist,
  deletefromwishlist
}

