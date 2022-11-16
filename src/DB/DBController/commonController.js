const sql = require('../mysql');
const commonDB = require('../common/commonDB');
const { INNERERROR } = require('../../Enum/error');


exports.insertQuery = async(tableName,data) =>{
  const conn = await sql.getConnection();
  try{
    const datalist = [];
    for(val in data){
      datalist.push(val);
    }

    const insertStr = commonDB.insertSql.getInsertSqlQuery(datalist);
    const questionStr = commonDB.insertSql.getQuestion(datalist);
    conn.query(`INSERT INTO ${insertStr} ${tableName} VALUES${questionStr}`);
  }catch(err){
    console.log(err,true);
    return INNERERROR.DBError;
  }finally{
    conn.release();
  }
}