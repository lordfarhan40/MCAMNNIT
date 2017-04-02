function questionPaperFilter(req)
{
    const exam_type_array=["End Semester","Mid Semester","Class Test"];
    var reqObject=new Object();
    if(req.query.semester!=undefined&&req.query.semester!=0)
    {
        reqObject.semester=req.query.semester;
        if(req.query.subject!=undefined&&req.query.subject!=0)
        {
            reqObject.subjectName=req.query.subject;
        }
    }
    if(req.query.exam_type!=undefined&&req.query.exam_type!=0)
    {
        reqObject.examType=exam_type_array[req.query.exam_type-1];
    }
    return reqObject;
}

module.exports={
    questionPaperFilter
}