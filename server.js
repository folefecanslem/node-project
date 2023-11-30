 //const http= require('http');
  const path = require('path');
 const express = require('express');
 const nodemon = require('nodemon');
 const bodyParser = require('body-parser');
 const errorController = require('./controllers/error');
 const mongoConnect = require('./util/database').mongoConnect;
 const User = require('./models/user');

 const app = express();
 



//  app.set('view engine', 'pug');
//  app.set('views', 'views');
   app.set('view engine', 'ejs');
   app.set('views','views');

  const adminRoutes = require('./routes/admin.js');
 const shopRoutes = require('./routes/shop.js');
 app.use(bodyParser.urlencoded({extended:false}));
 app.use(express.static(path.join(__dirname,'public')));
//the '/admin' is a filter that allows us to put a common starting segment for our path
app.use((req,res,next)=>{
  User.findById(1)
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err => console.log(err));
next();

});

  app.use('/admin',adminRoutes);
 app.use(shopRoutes); 


 //adding 404 error page
app.use(errorController.get404);
 
 
 
 app.use('/ ',(req,res,next)=>{
    res.send('<h1>HELLO FROM THE OTHER SIDE!!!</h1>'); 
 
 });



// const server =  http.createServer(app);
//model view control structure

// server.listen(3000);
mongoConnect(() => {
  
  app.listen(3000);
});


