const users=require('./model/users.js');
const questionPaper=require("./model/questionPaper.js");
const subjects=require('./model/subjects');
const requestTranslator=require('./utility/requestTranslator.js');
const htmlGenerator=require('./utility/htmlGenerator.js');
const questionFullInfo=require('./model/questionFullInfo.js');


/*
                ADMIN AREA START
*/

//handling the get request of admin panel

const setPages=(server)=>{


/*

        ADMIN LOG-ADMIN START

*/
server.get('/admin-login',(req,resp)=>
{
    var session=req.session;
    if(session.userName)
    {
        resp.redirect('/admin-panel');
        return;
    }
    resp.render("admin_login.hbs",{
            warning:"none",
            pageTitle:"Admin Login"
    });
});

server.post('/admin-login',(req,res)=>
{
    var session=req.session;
    const userName=req.body.login;
    const password=req.body.password;
    users.checkUser(userName,password,(err,body)=>
    {
        if(err)
            res.render("admin_login.hbs",{
                warning:"inline",
                pageTitle:"Admin Login"
            });
        else{
            session.userName=userName;
            res.redirect("/admin-panel");
        }
    });
});

server.get("/admin-logout",(req,res)=>
{
    var session=req.session;
    session.destroy((err)=>{
        if(err)
            console.log(err);
    });
    res.redirect("/");
});


/*

        ADMIN LOG-ADMIN END
        
*/


/* 

    ADMIN QUESTION-PAPER START

*/

server.post('/admin-panel',(req,res)=>
{
    var session=req.session;
    if(session.userName){
        subjects.getSubjectID(req.body.subject,(err,subjectID)=>
        {
            const year=req.body.year;
            const exam_type=req.body.exam_type;
            const link=req.body.URL;
            questionPaper.addQuestion(subjectID,year,link,exam_type,(err)=>
            {
                        res.redirect("/admin-panel");

            });
        });
    }else
    {
        res.redirect("/admin-login")
    }
});

//handling the post request on admin panel
server.get("/admin-panel",(req,res)=>
{
    var session=req.session;
    if(session.userName)
    {
        var criteria=requestTranslator.questionPaperFilter(req);
        questionFullInfo.getQuestionPaperInfoAll(criteria,(err,body)=>
        {
            if(err)
            {
                return console.log(err);
            }
            var fullTable=htmlGenerator.generateAdminQuestionTable(body);
            res.render("admin_question.hbs",{
            pageTitle:"Manage Question Papers",
            fullTable
            });
        });
    }else
    {
        res.redirect("/admin-login");
    }   
});

server.get("/admin-delete",(req,res)=>
{
    var session=req.session;
    if(session.userName){
        questionPaper.delQuestion(req.query._id,(err)=>
        {
            res.redirect("/admin-panel");
        });
    }else
    {
        res.redirect("/admin-login");
    }
});

server.get("/admin-question-edit",(req,res)=>
{
    var session=req.session;
    if(session.userName)
    {
        res.render("admin_edit_question.hbs",{
            pageTitle:"Edit Question Paper"
        });
    }else
    {
        res.redirect("/admin-login");
    }
});


/* 

    ADMIN QUESTION-PAPER END

*/

};
module.exports={
    setPages
};