exports.getUpdateSqlQuery = (fleidList) => {
    let sqlString = '';
    for (let val in fleidList) {
        sqlString = `${sqlString} ${fleidList[val]} = ?`
        if (fleidList.length !== parseInt(val)+ 1) {
            sqlString = `${sqlString},`
        }
    }

    return sqlString;
}