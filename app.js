//various constants
const COOKIE_SECRET=process.env.COOKIE_SECRET||"MyLittleSecret";

const express=require('express');
const bodyParser=require("body-parser");
const cookieParser=require('cookie-parser');
const hbs=require('hbs');
const admin=require('./admin.js');
const session=require('express-session');
const htmlGenerator=require('./utility/htmlGenerator.js');
const requestTranslator=require('./utility/requestTranslator.js');
const questionFullInfo=require('./model/questionFullInfo.js');

const port=process.env.PORT||3000; 

//setting partials for header and footer
hbs.registerPartials(__dirname+'/views/partials')


//intialising server with middle wares

var server=express();
//setting cookie
server.use(session({
    secret:COOKIE_SECRET,
    resave:false,
    saveUninitialized:true
}));

//setting static address for CSS and images
server.use(express.static(__dirname+"/views/bootstrapandjquery"));



server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));
server.set('view engine','hbs');

server.get('/',(req,resp)=>
{
    var criteria=requestTranslator.questionPaperFilter(req);
    questionFullInfo.getQuestionPaperInfoAll(criteria,(err,body)=>
    {
        if(err)
        {
            return console.log(err);
        }
        var fullTable=htmlGenerator.generateUserQuestionTable(body);
        resp.render('question_paper_list.hbs',{
        pageTitle:'Question Papers',
        fullTable
        });
    });
});

//setting admin pages
admin.setPages(server);

htmlGenerator.setHTMLGeneratorAPI(server);

server.listen(port);