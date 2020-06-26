//ADARSH KUMAR KHOSLA

// AS IT IS ONLY RETRIVING THE DATA, SO HERE I M NOT USING ALL RSETFULL ROUTES

var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose");


// mongoDB address
mongoose.connect("mongodb+srv://adarsh:adarsh@cluster0-r0ogk.mongodb.net/<dbname>?retryWrites=true&w=majority",{useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false}); 
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


//MONGOOSE / MODEL CONFIG
var ballSchema = new mongoose.Schema({
    height: Number,
    COR: Number,
    heightTime: Array,
    bounces: Number,
    created:  {type: Date, default: Date.now},
});


var Ball = mongoose.model("Ball", ballSchema);

app.get('/', function(req, res){
    res.redirect('/balls/new');
});

app.get('/balls', (req, res)=>{
    Ball.find({}, (err, balls)=>{
        if(err){
            console.log('Erroe!!!');
            
        }else{
            // res.send("Successfull");
            res.render('index', {balls: balls});
        }
    })
})



// NEW ROUTES
app.get("/balls/new",function(req,res){
    res.render("new");
});


app.post("/balls",function(req,res){
    var height = req.body.height;
    var COR = req.body.COR;
    var balls = [{time:0, height:height}];
    var t = balls[0].time;
    var i = 0;
    var tempHeight = height;
    while(tempHeight > 0.000001){
        var h1 = tempHeight;
        var h2 = h1*COR*COR;
        t = Math.sqrt((2*h1)/(9.8)) + Math.sqrt((2*h2)/(9.8));
        temp = {time:t, height:h2};
        balls.push(temp);
        i++;
        tempHeight = h2;
    }
    var finalBall = {
        height: height,
        COR: COR,
        heightTime: balls,
        bounces:i,
    }

    Ball.create(finalBall,function(err,newBall){
        if(err){
            res.render("new")
        }else{
            basicball.push(newBall);
            res.render('show', {newBall:newBall});
        }
    })
})







app.listen(49966,function(){
    console.log("SERVER IS RUNNING!!!");
})