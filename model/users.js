const mongoose=require('mongoose');
const MONGO_ADDRESS=require('./MONGO_ADDRESS');

var admin=mongoose.model("admin",{
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    }
});

const checkUser=(userName,password,callback)=>{
    mongoose.connect(MONGO_ADDRESS);
    admin.findOne({userName,password},(err,res)=>
    {
        if(err||res==null){
            callback(1);
        }else
        {
            const userInfo={
                userName:res.userName,
                password:res.password
            };
            callback(undefined,userInfo);
        }
    });
    mongoose.connection.close();
}

module.exports={
    checkUser
};