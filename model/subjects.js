const mongoose=require('mongoose');
const MONGO_ADDRESS=require('./MONGO_ADDRESS');

var subjects=mongoose.model("subjects",
{
    subjectName:{
        type:String,
        required:true
    },
    semester:{
        type:Number,
        required:true
    }
});

const getSubjectID=(subject,callback)=>
{
    mongoose.connect(MONGO_ADDRESS);
    subjects.findOne({subjectName:subject},(err,res)=>
    {
        mongoose.connection.close((err)=>
        {
            if(err||res==null)
        {
            callback(1);
        }
        callback(undefined,res._id);
        })
    });
};

const getSubjectsBySemester=(semester,callback)=>
{
    mongoose.connect(MONGO_ADDRESS);
    subjects.find({semester},(err,doc)=>
    {
        mongoose.connection.close((err)=>
        {
            if(err){
            return callback(err);
        }
        callback(undefined,doc);
        });
    });
};

function getSubjectsAll(callback)
{ 
    mongoose.connect(MONGO_ADDRESS);
    subjects.find({},(err,res)=>{
            mongoose.connection.close(()=>{
                callback(err,res);
            }
        );
    });
    
}

module.exports={
    getSubjectID,
    getSubjectsBySemester,
    getSubjectsAll
}