const mongoose=require('mongoose');
const MONGO_ADDRESS=require('./MONGO_ADDRESS');

mongoose.Promise=global.Promise;

var questionPaper=mongoose.model("questionpapers",{
    subjectID:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    examType:{
        type:String,
        required:true
    }
});

const addQuestion=(subjectID,year,link,examType,callback)=>{
    mongoose.connect(MONGO_ADDRESS);
    questionPaper.findOne({subjectID,year,examType},(err,body)=>
    {
        if(body)
        {
            questionPaper.update({subjectID,year,examType},{subjectID,year,examType,link},(err,res)=>
            {
                mongoose.connection.close((err)=>
                {
                    callback(err);
                });
            });
        }else{
            
            var newQuestionPaper= new questionPaper(
                {
                    subjectID:subjectID,
                    year:parseInt(year),
                    link:link,
                    examType:examType
                });     
            newQuestionPaper.save((err,resp)=>
            {
                mongoose.connection.close((err)=>
                {
                    callback(err);
                });
            });
        }
    });
};

function getQuestionsAll(callback)
{ 
    mongoose.connect(MONGO_ADDRESS);
    questionPaper.find({},(err,res)=>{
        mongoose.connection.close(()=>{
                res.sort((x,y)=>
                {
                    return y.year-x.year;
                });
                callback(err,res);
        });
    });
}

function delQuestion(_id,callback){
    mongoose.connect(MONGO_ADDRESS);
    questionPaper.findByIdAndRemove({_id},(err,doc)=>{
        mongoose.connection.close(()=>{
            callback(err);
        });
    });
}

module.exports={
    addQuestion,
    getQuestionsAll,
    delQuestion
};