var
  express = require('express'),
  url = require('url'),
  fs = require('fs'),
  mongoose = require('mongoose'),
  path = require('path'),
  dotenv = require('dotenv').config(),
  cookieParser = require('cookie-parser'),
  cookieSession = require('cookie-session'),
  randomUrl = require('random-url'),
  nodemailer = require('nodemailer'),
  mailer = require('express-mailer'),
  buildUrl = require('build-url'),
  PDF = require('pdfkit'),
  quizzer = require('node-quizzer'),
  passwordHash = require('password-hash'),
  _ = require('underscore-node'),
  getQuiz = function(method, req) {
    var urlParts = url.parse(req.url, true),
      query = urlParts.query,

      // generate random quiz
      quiz = quizzer[method]({
        uname: query.fullname,
        uemail: query.email,
        name: query.quiz,
        count: parseInt(query.count),
        time: parseInt(query.time),
        perc: parseInt(query.perc)
      });

    return quiz;
  };




// multer = require("multer"),
//   cloudinary = require("cloudinary"),
//   cloudinaryStorage = require("multer-storage-cloudinary"),
// var express = require('express');
// var bodyParser = require('body-parser');
// var request = require('request');
// var mongoose = require('mongoose');
// const fs = require('fs');
// var JSAlert = require("js-alert");
// var cookieParser = require('cookie-parser');
// var passwordHash = require('password-hash');
// var alert = require('alert-node');
// var pdf = require('express-pdf');
// 
// var mailer = require('express-mailer');
// var session = require('express-session');
// var cookieSession = require('cookie-session');
// var nodemailer = require('nodemailer');
// var mailer = require('express-mailer');
// 
// var async = require('async');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var bcrypt = require('bcrypt-nodejs');
// var crypto = require('crypto');
// var passportfb = require('passport-facebook');


var count=1;



var personSchema = mongoose.Schema({
    
    rollno:{type: String,
      required: true,
      unique: true
    },
    email:{type:String,
      required :true,
      unique: true},
    password:{type: String,
      required: true
    }
});
var Person = mongoose.model("Person", personSchema);





var imageSchema = mongoose.Schema({
    
    name:{type: String,
      required: true,
    },
    email:{type:String,
      required :true,
  },
    link:{type: String,
      required: false,
    }
});

var Image = mongoose.model("Image", imageSchema);

var quizqSchema = mongoose.Schema({
    q1:{
      type: String,
      required: true,
      unique: true
    },
    q11:{
      type: String,
      required: true,
      unique: true
    },
    q12:{
      type: String,
      required: true,
      unique: true
    },
    q13:{
      type: String,
      required: true,
      unique: true
    },
    q14:{
      type: String,
      required: true,
      unique: true
    },
    anss:{
      type: String,
      required: true
    }
});

var Quizq = mongoose.model("Quizq", quizqSchema);





var facultySchema = mongoose.Schema({
  fname:{type: String,
      required: true,
    },
    teach_id:{type: String,
      required: true,
      unique: true
    },
    email:{type:String,
      required :true,
      unique: true},
    password:{type: String,
      required: true
    }
});
var Faculty = mongoose.model("Faculty", facultySchema);


var abcSchema = mongoose.Schema({
    a:{type: String,
      required: true,
      unique: true
    },
    b:{type:String,
      required :true,
      unique: true},
    c:{type: String,
      required: true
    }
});
var Abc = mongoose.model("Abc", abcSchema);


var testScore = mongoose.Schema({
  uname:{type: String,
      required: true,
      unique : false
    },
    topic:{type:String,
      required :true,
      unique : false
    },
    total_ques:{type: String,
      required: true,
      unique : false
    },
    correct:{type:String,
      required :true,
      unique : false
    },
    percentage:{type: String,
      required: true,
      unique : false
    }
});
var Test = mongoose.model("Test", testScore);



var codeSwap = mongoose.Schema({
  uname:{type: String,
      required: true,
      unique : false
    },
    total_ques:{type: String,
      required: true,
      unique : false
    },
    correct:{type:String,
      required :true,
      unique : false
    },
    percentage:{type: String,
      required: true,
      unique : false
    }
});
var Code = mongoose.model("Code", codeSwap);



var pdfSchema = mongoose.Schema({
    fullname:{type: String,
      required: true
    },
    billby:{type:String,
      required :true},
    billto:{type: String,
      required: true
    },
    date:{type: String,
      required: true
    }
});
var Pdf = mongoose.model("Pdf", pdfSchema);


var linkSchema = mongoose.Schema({
  link:{type: String,
      required: true,
      unique: true
    },
    count:{type: Number,
      unique: true,
      startAt: 1,
    incrementBy: 1
  	}
});
var Link = mongoose.model("Link", linkSchema);



var createSchema = mongoose.Schema({
  noq:{type: String,
      required: true,
    },
    quiz_name:{type: String,
      required: true,
      unique: true
    }
});
var Create = mongoose.model("Create", createSchema);



var animalSchema = mongoose.Schema({
    name: String,
    type: String,
    tags: { type: [String], index: true } // field level
  });

var Animal = mongoose.model("Animal", animalSchema);




// const storage = cloudinaryStorage({
// cloudinary: cloudinary,
// folder: "demo",
// allowedFormats: ["jpg", "png"],
// transformation: [{ width: 500, height: 500, crop: "limit" }]
// });

// const parser = multer({ storage: storage });

var app = express();
app.set('port', (process.env.PORT || 5000));

// var uri ='mongodb://shkamboj:qwerty123@localhost:27017/open_elec16?authSource=admin'; 
var uri = 'mongodb://amit:amit123@ds237072.mlab.com:37072/quizapp';

mongoose.connect(uri);

app.set('view engine', 'ejs');
app.set('views','./views');

var path = require('path');
app.use('/static',express.static(__dirname + '/public'));


app.use(cookieParser());

app.use(cookieSession({
  name: 'session',
  keys: ['poiuytrewq'],
 
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.set("view options", { layout: false } );
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));



app.get('/xyz', function(req, res){
   if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});


app.get('/', function (req, res) {
  if(req.session.rollno)
  {
    res.render('main');
  }
  else
  {
    res.render('main2');
  }
});

app.get('/just', function (req, res) {
    console.log(req.session.rollno);
});


app.get('/newhome', function (req, res) {
    res.render('newhome');
});

app.get('/password', function (req, res) {
    res.render('password');
});



app.post('/password',function (req,res) {
	pass = req.body.password;
	if(pass=="PKMKB")
	{
		res.redirect('/');
	}
	else
	{
		res.send("enter correct credentials");
	}
});



app.get('/profile/:rollno', function(req, res)
{
  if(req.session.rollno)
  {
    Test.find({"uname" : req.params.rollno},function(err,res2){
         if(res2.length>0)
         {
            console.log('OK');
            res.render('myp2',{Test: res2});
         }
         else
         {
            res.redirect('login');
         }
  });
  }
  else
  {
    Test.find({"uname" : req.params.rollno},function(err,res2){
         if(res2.length>0)
         {
            console.log('OK');
            res.render('myp',{Test: res2});
         }
         else
         {
            res.redirect('login');
         }
  });
  }
  


});

// app.get('/images', function (req, res) {
//     res.render('img');
// });

// app.post('/images', parser.single("image"), (req, res) => {
//   console.log(req.file) // to see what is returned to you
//   const image = {};
//   image.url = req.file.url;
//   image.id = req.file.public_id;

//   Image.create(image) // save image information in database
//     .then(newImage => res.json(newImage))
//     .catch(err => console.log(err));
// });




app.get('/quizap', function(req, res) {
  if(req.session.rollno)
  {
    var list = quizzer.getCategories();
  console.log(list);

  // load the index.html template
  fs.readFile(__dirname + '/public/index.html', function(err, data) {
    if(err) throw err;

    // populate it with templated questions from the node-quizzer module
    var compiled = _.template(data.toString());
    res.send(compiled({ availableQuizzes: list }));
  });
  }
  
});




app.use(express.static(path.join(__dirname, 'public')));

app.get('/quiz', function(req, res) {
  var quiz = getQuiz('generate', req);

  // load the quiz.html template
  fs.readFile(__dirname + '/public/quiz.html', function(err, data) {
    if(err) throw err;

    // populate it with templated questions from the node-quizzer module
    var compiled = _.template(data.toString());
    res.send(compiled({ quiz: quiz }));
  });
});

app.get('/tokenize', function(req, res) {
  var quiz = getQuiz('tokenize', req),
    tokenUrl = req.protocol + '://' + req.get('host') + "/quiz/" + quiz.quid;

  res.set('Content-Type', 'text/plain');
  res.send(tokenUrl);
});


app.get('/pops', function(req, res) {
  res.render('pops');
});

app.get('/tender', function(req, res) {
  res.render('tender');
});


app.get('/privacy', function(req, res) {
  res.render('privacy');
});


app.get('/enter_links', function(req, res) {
  res.render('enter_links');
});



app.post('/enter_links',function (req,res) {
  var name = req.body.name;
  var email = req.body.email;
  var link = req.body.link;
  var image = new Image({
    name : name,
    email : email,
    link : link,
  });
  image.save(function (err) {
    if(err)
    {
      console.log("ERRONN");
    }
    else
    {
      res.redirect('/login');
    }
  });
});



app.get('/images', function(req, res) {
  res.render('images');
});



app.post('/images',function(req, res){


	var name = req.body.name;
	var email = req.body.email;
	Image.find({"email" : email },function(err,res2){
	var link2 = res2[0].link;
    console.log(link2); 
          



  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({

  from: process.env.gmail_id,
  host: 'smtp.gmail.com',
  secureConnection: true,
  port: 465,
  transportMethod: 'SMTP',
  auth: {
    user: process.env.gmail_id,
    pass: process.env.gmail_password
  }
    });


var text = 'Hi ' + name  + ' You can now download your images from here ' + link2;


    let mailOptions = {
        from: process.env.gmail_id,
        to: email,
        subject: 'Your Images',
        text: text,
       //  attachments: [
       // 	{   // use URL as an attachment
       //      filename: 'shubham1.jpg',
       //      href: link,
       //  }
       // ]
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    else
    {
      res.redirect('/mailsent');
  }
    });
});
});

});



app.get('/takeaquiz', function (req, res) {
  if(req.session.rollno)
  {
    res.redirect('/quizap');
  }
  else
  {
    res.redirect('/login');
  }
});

app.get('/quiz/:id', function(req, res) {
  var quiz = quizzer.fromToken(req.params.id);

  // load the quiz.html template
  if(quiz) {
    fs.readFile(__dirname + '/public/quiz.html', function(err, data) {
      if(err) throw err;

      // populate it with templated questions from the node-quizzer module
      var compiled = _.template(data.toString());
      res.send(compiled({ quiz: quiz }));
    });
  } else {
    res.send("This token has expired!");
  }
})

app.get('/review', function(req, res) {
  var urlParts = url.parse(req.url, true),
    query = urlParts.query,
    results = quizzer.evaluate(query);
    uname = req.session.rollno;
    topic = results.stats.quiz['name'];
    total_ques = results.stats['total'];
    correct = results.stats['correct'];
    percentage = results.stats['perc'];
    var test = new Test({
    uname : uname,
    topic : topic,
    total_ques : total_ques,
    correct : correct,
    percentage : percentage
  });
    var code = new Code({
    uname : uname,
    total_ques : total_ques,
    correct : correct,
    percentage : percentage
  });
    if(topic == "nodejs")
    {
      code.save();
    }
    test.save(function (err){
    if(err)
    {
      console.log("ERRONN");
    }
  });
    console.log(results.stats['perc']);
    console.log(results.stats['total']);
    console.log(results.stats['correct']);
    console.log(results.stats.quiz['name']);
    console.log(req.session.rollno);

  // load the review.html template
  fs.readFile(__dirname + '/public/review.html', function(err, data) {
    if(err) throw err;

    // populate it with templated questions from the node-quizzer module
    var compiled = _.template(data.toString());
    res.send(compiled({ results: results }));
  });
});




app.get('/loaderio-8c5ea0416ac343e72bc71126374d6478', function (req, res)
{
    res.render('loaderio-8c5ea0416ac343e72bc71126374d6478');
});


app.get('/register', function (req, res)
{
    res.render('reg');
});

app.get('/home', function (req, res)
{
    res.redirect('/');
});


// app.get('/register', function (req, res)
// {
//     res.render('reg');s
// });


app.get('/fagnum',function(req,res){
   res.render('fagnum');
});

app.post('/fagnum', function(req,res){
  var fullname = req.body.fullname;
  var billby = req.body.billby;
  var billto = req.body.billto;
  var date = req.body.date;
  
  var pdfx = new Pdf({
    fullname : fullname,
    billby : billby,
    billto : billto,
    date : date,
  });

  const doc = new PDF();
  let filename = fullname;
  filename = encodeURIComponent(filename)+'.pdf';

  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
  res.setHeader('Content-type', 'application/pdf');
  const content ="Billing of your order "+"\n"+"Name: "+ pdfx.fullname +"\n"+ "Bill By: "+pdfx.billby +"\n"+"Bill To: " + pdfx.billto +"\n"+ "Date: "+pdfx.date;
  doc.y = 300;

  doc.text(content, 50, 50);
  doc.pipe(res);
  doc.end();
  pdfx.save(function (err){
    if(err)
    {
      console.log("ERRONN");
    }
  });
});

app.get('/fac_signup',function(req, res){
  res.render('fac_signup');
})

app.post('/fac_signup',function (req,res) {
  var fname = req.body.fname;
  var teach_id = req.body.teach_id;
  var email = req.body.email;
  var password = req.body.password;
  var hashedPassword = passwordHash.generate(password);
  console.log(hashedPassword);
  var faculty = new Faculty({
    fname : fname,
    teach_id : teach_id,
    email : email,
    password : hashedPassword,
  });
  faculty.save(function (err) {
    if(err)
    {
      console.log("ERRONN");
    }
    else
    {
      alert('Successfully Registered.');
    }
  });
});

app.get('/fac_login',function(req,res){
   res.render('fac_login');
});


app.post('/fac_login',function (req,res) {
  var teach_id = req.body.teach_id;
  var password = req.body.password;
  Faculty.find({"teach_id" : teach_id },function(err,res2){
    // console.log(res2.length);
    // HP = res2[0].password;
    // console.log(HP);
    //   console.log( passwordHash.verify(password, res2[0].password));
         if(res2.length>0 && passwordHash.verify(password,res2[0].password))
         {
            console.log('OK');
            console.log(res2[0].teach_id);
            req.session.uid = 'string';
            res.redirect('/quiz11');
         }
         else
         {
            alert('Wrong Details');
            res.redirect('/fac_login');
         }
          
});
});

app.get('/signup',function(req,res){
   res.render('signup');
});

app.post('/signup',function (req,res) {
  var rollno = req.body.rollno;
  var email = req.body.email;
  var password = req.body.password;
  var hashedPassword = passwordHash.generate(password);
  console.log(hashedPassword);
  var person = new Person({
    rollno : rollno,
    email : email,
    password : hashedPassword,
  });
  person.save(function (err) {
    if(err)
    {
      console.log("ERRONN");
      res.redirect('/signup');
    }
    else
    {
      res.redirect('/login');
    }
  });
});

app.get('/pdf',function(req,res){
   res.send('PDF');
});


app.get('/viewdata',(req , res) =>{
    Person.find().exec(function(err , i){
        if (err) return console.log(err);

        res.render('viewdata',{Person: i});
     })
 });


app.get('/leader_route',(req , res) =>{
    res.render('leader_route');
 });

app.get('/leaderboard/:topic',(req , res) =>{
  let par1 = req.params.topic;
    Test.find({"topic" : par1}).sort({percentage: 'desc'}).exec(function(err , i){
        if (err) return console.log(err);

        res.render('leader',{Test: i});
     })
 });




app.get('/myprofile',function (req,res) {

  Test.find({"uname" : req.session.rollno},function(err,res2){
         if(req.session.rollno)
         {
            console.log('OK');
            res.render('myprofile',{Test: res2});
         }
         else 
         {
            res.redirect('login');
         }
          
});
});





app.get('/exam',(req , res) =>{
    Quizq.aggregate([{ $sample: { size: 2} }]).exec(function(err , i){
        if (err) return console.log(err);

        res.render('exam',{Quizq: i});
     })
 });

app.get('/login',function(req,res){
   res.render('login');
});


app.post('/login',function (req,res) {
  var rollno = req.body.rollno;
  var email = req.body.email;
  var password = req.body.password;
  Person.find({"rollno" : rollno },function(err,res1){
      // console.log( passwordHash.verify(password, res1[0].password));
         if(res1.length>0 && passwordHash.verify(password, res1[0].password))
         {
         	req.session.rollno = rollno;
          res.redirect('/');
         }
         else
         {
            
            
            res.redirect('login');
         }
          
});
});

// app.get('/quiz',function(req,res){
	
// 	 if(req.session.uid)
// 		res.render('quiz');
//   else
//     res.send("YOu are not logged in");
   
// });


app.post('/quiz11',function(req, res){
    if(req.body.noq=="DBMS")
    res.redirect('/ten');
  else
    res.redirect('/dash2');
})

app.get('/ten',function(req,res){
  res.render('ten');
});

app.post('/ten',function (req,res) {
  var q1 = req.body.q1;
  var q11 = req.body.q11;
  var q12= req.body.q12;
  var q13 = req.body.q13;
  var q14 = req.body.q14;
  var anss = req.body.anss;
  var quizq = new Quizq({
    q1 : q1,
    q11 : q11,
    q12 : q12,
    q13 : q13,
    q14 : q14,
    anss : anss
  });

  quizq.save();
  res.redirect('ten');

});


app.get('/dash2',function(req,res){
  res.render('twenty');
});


app.get('/logout', function (req, res) {
  delete req.session.rollno;
  res.redirect('/');
});




app.get('/forgot_password',function(req, res){
  res.render('forgot_password');
});


app.post('/forgot_password',function(req, res){


  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({

  from: 'nithparadox@gmail.com',
  host: 'smtp.gmail.com',
  secureConnection: true,
  port: 465,
  transportMethod: 'SMTP',
  auth: {
    user: process.env.gmail_id,
    pass: process.env.gmail_password
  }
    });

    var mrl = buildUrl('https://play.google.com/store/apps/details?id=com.exe.paradoxplay');

var text = 'please click on the link to download the Paradox App: \n\n' + mrl;

var maillist = [
  process.env.mail,
];

    let mailOptions = {
        from: process.env.gmail_id,
        to: maillist,
        subject: 'Reset Password',
        text: text,
        attachments: [
       	{   // use URL as an attachment
            filename: 'license.txt',
            path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE' // whatever to be sent
        }
       ]
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    else
    {
      res.redirect('/mailsent');
  }
    });
});
});


app.get('/mailsent',function(req, res){
  res.render('mailsent');
});


app.get('/createquiz',(req , res) =>{
    Create.find().exec(function(err , i){
        if (err) return console.log(err);

        res.render('createquiz',{Create: i});
     })
 });





app.post('/createquiz',function (req,res) {
  var noq = req.body.noq;
  var quiz_name = req.body.quiz_name;
  var create = new Create({
    noq : noq,
    quiz_name : quiz_name
  });

  create.save();


});



app.get('/linking',(req , res) =>{
    Person.find().exec(function(err , i){
        if (err) return console.log(err);

        res.render('linking',{Person: i});
     })
 });





app.get('/tenders/:rollno', function(req,res){
  let par1 = req.params.rollno;
  
  const doc = new PDF();
  let filename = par1;
  filename = encodeURIComponent(filename)+'.pdf';

  res.setHeader('Content-disposition', 'attachment; filename="' + filename);
  res.setHeader('Content-type', 'application/pdf');
  const content ="Billing of your order "+"\n"+"Name: " +"\n"+ "Bill By: " +"\n"+"Bill To: " +"\n"+ "Date: ";
  doc.y = 300;

  doc.text(content, 50, 50);
  doc.pipe(res);
  doc.end();
});




app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'));
});
