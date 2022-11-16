const mysql = require('../../DB/mysql');
const commonQ = require('../../DB/common/commonDB');
const util = require('../../Util');
const dayjs = require('dayjs');
const { ERROR } = require('../../../opic-test-enum/enum/error');

exports.getTestRoom = async (req, res) => {
  const {uuid} = req.query;
  try {
    const conn = await mysql.getConnection();
    try{
      const queryString = `SELECT * FROM testroom WHERE(group_uuid = '${uuid}')`;
      const selectResult = await conn.query(`${queryString}`,[])

      if(!selectResult[0]){
        if (!res.headersSent) {
          return res.status(400).send(err);
        }
      }

      const receiptstartTime = dayjs(selectResult[0][0].regist_period_starttime);
      const receiptendTime = dayjs(selectResult[0][0].regist_period_endtime);
      const nowjs = dayjs();

      if(nowjs >= receiptstartTime && nowjs <= receiptendTime){
        const application_form_query = `SELECT item.sn,item.name,item.text\
        FROM application_item as item, application_form as form\
        WHERE (form.testroom_type_sn = ${selectResult[0][0].room_type} AND form.application_item = item.sn)`;
        const application_form_query_Result = await conn.query(`${application_form_query}`,[]);
        
        res.status(200).send(application_form_query_Result[0]);
      }else{
        if (!res.headersSent) {
          res.status(400).send({status : ERROR.doesnotmatchApplicationPeriod ,text : "접수기간이 아닙니다."});
        }
      }
      
    }catch(err){
      console.log(err);
      if (!res.headersSent) {
        res.status(500).send(err);
      }
    }finally{
      conn.release();
    }
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).send(err);
    }
  }
};

exports.registApplication = async (req, res) => {
  const {uuid} = req.body;
  try {
    const conn = await mysql.getConnection();
    try{
      const queryString = `SELECT * FROM testroom WHERE(group_uuid = '${uuid}')`;
      const selectResult = await conn.query(`${queryString}`,[])

      if(!selectResult[0]){
        if (!res.headersSent) {
          return res.status(400).send(err);
        }
      }

      const receiptstartTime = dayjs(selectResult[0][0].regist_period_starttime);
      const receiptendTime = dayjs(selectResult[0][0].regist_period_endtime);
      const nowjs = dayjs();

      if(nowjs >= receiptstartTime && nowjs <= receiptendTime){
        const application_form_query = `SELECT item.sn,item.name,item.text\
        FROM application_item as item, application_form as form\
        WHERE (form.testroom_type_sn = ${selectResult[0][0].room_type} AND form.application_item = item.sn)`;
        const application_form_query_Result = await conn.query(`${application_form_query}`,[]);
        
        const insertlist = [];
        const valuelist = [];

        for(const val of application_form_query_Result[0]){
          if(!req.body[val.name]){
            if (!res.headersSent) {
              return res.status(400).send({status : ERROR.requiredApplicationData , text : `required ${val.name}`});
            }
          }
          let DBname = val.name;
          //이름 예외가 있음
          if(val.name === "company2"){
            DBname = 'company';
          }
          if(!util.checkInsertQueryVaild(res,`${DBname}`,req.body[val.name],insertlist,valuelist)) return;
        }

       if(!util.checkInsertQueryVaild(res,`test_room`,selectResult[0][0].sn,insertlist,valuelist)) return;
    
        const insertfield = commonQ.insertSql.getInsertSqlQuery(insertlist);
        const insertquestion = commonQ.insertSql.getQuestion(insertlist);
        const queryString = `INSERT INTO applicator ${insertfield} VALUES ${insertquestion}`;
        await conn.query(`${queryString}`,valuelist)


        res.status(200).send();
      }else{
        if (!res.headersSent) {
          res.status(400).send({status : ERROR.doesnotmatchApplicationPeriod,text : "접수기간이 아닙니다."});
        }
      }
      
    }catch(err){
      console.log(err);
      if (!res.headersSent) {
        res.status(500).send(err);
      }
    }finally{
      conn.release();
    }
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).send(err);
    }
  }
};