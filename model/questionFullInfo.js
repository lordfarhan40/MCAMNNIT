const questionPaper=require('./questionPaper.js');
const subjects=require('./subjects.js');

function checkObject(candidate,criteria){
    if(criteria.semester==undefined&&criteria.examType==undefined)
        return true;
    
    if(criteria.semester!=undefined&&criteria.examType==undefined)
    {
        if(criteria.semester==candidate.semester)
        {
            if(criteria.subjectName==undefined)
            {
                return true;
            }else
            {
                if(criteria.subjectName==candidate.subjectName)
                    return true;
                return false;
            }
        }
        return false;
    }

    if(criteria.semester==undefined&&criteria.examType!=undefined)
    {
        return criteria.examType==candidate.examType;
    }

    if(criteria.semester!=undefined&&criteria.examType!=undefined)
    {
        if(criteria.semester==candidate.semester)
        {
            if(criteria.subjectName==undefined)
            {
                return criteria.examType==candidate.examType;
            }else
            {
                if(criteria.subjectName==candidate.subjectName)
                    return criteria.examType==candidate.examType;
                return false;
            }
        }
        return false;
    }
}

function getQuestionPaperInfoAll(filterObject,callback){
    questionPaper.getQuestionsAll((err,questionPapers)=>
    {
        if(err)
        {
            return callback(err);
        }
        subjects.getSubjectsAll((err,subjects)=>
        {
            if(err)
            {
                return callback(err);
            }
            var allQuestionInfo=new Array();
            for(var i=0;i<questionPapers.length;++i)
            {
                var subjectName=new String();
                var semester=0;
                for(var j=0;j<subjects.length;++j){
                    if(subjects[j]._id==questionPapers[i].subjectID)
                    {
                        subjectName=subjects[j].subjectName;
                        semester=subjects[j].semester;
                        break;
                    }
                }
                allQuestionInfo[i]={
                    _id:questionPapers[i]._id,
                    subjectName,
                    semester,
                    examType:questionPapers[i].examType,
                    year:questionPapers[i].year,
                    link:questionPapers[i].link
                }
            }

            var filteredQuestion=new Array()
            for(var i=0;i<allQuestionInfo.length;++i)
            {
                if(checkObject(allQuestionInfo[i],filterObject))
                    filteredQuestion.push(allQuestionInfo[i]);
            }
            callback(err,filteredQuestion);
        });
    });
}

module.exports={
    getQuestionPaperInfoAll
};