var MONGO_ADDRESS=new String();
if(process.env.MONGO_ADDRESS!=undefined)
    MONGO_ADDRESS=process.env.MONGO_ADDRESS;
else
    MONGO_ADDRESS="mongodb://localhost:27017/MCA-APP";

module.exports=MONGO_ADDRESS;