exports.getInsertSqlQuery = (fleidList) => {
    let sqlString = '';
    for (let val in fleidList) {
        sqlString = `${sqlString} ${fleidList[val]}`
        if (fleidList.length !== parseInt(val)+ 1) {
            sqlString = `${sqlString},`
        }
    }
    sqlString = `(${sqlString})`;

    return sqlString;
}

exports.getQuestion = (fleidList) =>{
    let question ='';
    for(let val in fleidList){
        question = `${question} ?`;
        if (fleidList.length !== parseInt(val)+ 1) {
            question = `${question},`
        }
    }
    question = `(${question})`;
    
    return question;
}