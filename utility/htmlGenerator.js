const subjects=require('./../model/subjects.js');

function generateSubjectList(semester,callback){
    subjects.getSubjectsBySemester(semester,(err,res)=>
    {
        if(err)
            return callback(err);
        var s1=new String();
        for(var i=0;i<res.length;++i)
        {
            s1+="<option>"
            s1+=res[i].subjectName;
            s1+="</option>"
        }
            return callback(undefined,s1);
    })
}

const setHTMLGeneratorAPI=(express)=>
{
    express.get('/subjects',(req,res)=>
    {
        generateSubjectList(req.query.semester,(err,body)=>
        {
            if(err)
            {
                return console.log(err);
            }else{
                res.send(body);
            }
        })
    });
}

function generateUserQuestionTable(res){
    var s1=new String();
    s1+="<tr><th>#</th><th>Subject</th><th>Semester</th><th>Type</th><th>Year</th><th>Download</th></tr>";
    for(var i=0;i<res.length;++i)
    {
        s1+="<tr>";
        s1+="<td>"+(i+1)+"</td>";
        s1+="<td>"+res[i].subjectName+"</td>"
        s1+="<td>"+res[i].semester+"</td>"
        s1+="<td>"+res[i].examType+"</td>"
        s1+="<td>"+res[i].year+"</td>"
        s1+="<td><a href='"+res[i].link+"'>Download</a></td>"
        s1+="</tr>"
    }
    return s1;
}

function generateAdminQuestionTable(res){
    var s1=new String();
    s1+="<tr><th>#</th><th>Subject</th><th>Semester</th><th>Type</th><th>Year</th><th>Delete</th></tr>";
    for(var i=0;i<res.length;++i)
    {
        s1+="<tr>";
        s1+="<td>"+(i+1)+"</td>";
        s1+="<td>"+res[i].subjectName+"</td>"
        s1+="<td>"+res[i].semester+"</td>"
        s1+="<td>"+res[i].examType+"</td>"
        s1+="<td>"+res[i].year+"</td>"
        s1+="<td><a href='/admin-delete?_id="+res[i]._id+"' class='delete_button'>Delete</a></td>"
        s1+="</tr>"
    }
    return s1;
}

module.exports={
    setHTMLGeneratorAPI,
    generateUserQuestionTable,
    generateAdminQuestionTable
}