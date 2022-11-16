const mysql = require('../../DB/mysql');
const commonQ = require('../../DB/common/commonDB');
const util = require('../../Util');

exports.getTestRoomList = async (req, res) => {
  try {
    const conn = await mysql.getConnection();
    
    try{
      const testroomQueryString = `SELECT sn,group_title,group_uuid,regist_period_starttime,regist_period_endtime,test_period_starttime,test_period_endtime FROM testroom`;
      const testroomQueryResult = await conn.query(`${testroomQueryString}`,[])
      
      for(const testroomIndex in testroomQueryResult[0]){
        const testroom = testroomQueryResult[0][testroomIndex];
        let apply_tester =0;//응시자 수
        let finish_tester = 0;//응시 완료자 수
        let rater_count =0;//배정 된 평가자 수
        let all_combo = 0;//배정 된 문항 수
        let finish_combo = 0;//평가 완료 된 문항 수

        //응시자
        const testorNumberQueryString = `SELECT COUNT(*) as cnt \
        FROM applicator, opictester\
        WHERE(applicator.sn = opictester.application_sn_id AND applicator.test_room =${testroom.sn})`;
        
        const testorDoneNumberQueryString = `SELECT COUNT(*) as cnt \
        FROM applicator, opictester\
        WHERE(applicator.sn = opictester.application_sn_id AND applicator.test_room =${testroom.sn} AND opictester.tester_state)`;

        
        const testorNumberResult = await conn.query(`${testorNumberQueryString}`,[]);
        const testorDoneNumberResult = await conn.query(`${testorDoneNumberQueryString}`,[]);

        apply_tester = testorNumberResult[0][0].cnt;
        finish_tester = testorDoneNumberResult[0][0].cnt;
        testroomQueryResult[0][testroomIndex].apply_tester = apply_tester;
        testroomQueryResult[0][testroomIndex].finish_tester = finish_tester;

        //평가자
        const raterNumberQueryString = `SELECT *\
        FROM ratertestroom\
        WHERE(testroom_sn =${testroom.sn})`;

        const raterQueryResult = await conn.query(`${raterNumberQueryString}`,[]);

        if(raterQueryResult[0].length !== 0){
          rater_count = raterNumberQueryString[0].length;
          for(const rater of raterNumberQueryString[0]){
            all_combo += rater.total;
            finish_combo += rater.done;
          }
        }

        testroomQueryResult[0][testroomIndex].rater_count = rater_count;
        testroomQueryResult[0][testroomIndex].all_combo = all_combo;
        testroomQueryResult[0][testroomIndex].finish_combo = finish_combo;
      }
      
      if (!res.headersSent) {
        res.status(200).send(testroomQueryResult[0]);
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


exports.createTestRoom = async (req, res) => {
  try {
    const {group_title,titleText,regist_period_starttime,regist_period_endtime,test_period_starttime,test_period_endtime,room_type} = req.body;
    let {filepath} = req.body;

    const insertlist = [];
    const valuelist = [];

    if(!util.checkInsertQueryVaild(res,'group_title',group_title,insertlist,valuelist)) return;
    if(!util.checkInsertQueryVaild(res,'title',titleText,insertlist,valuelist)) return;
    if(!util.checkInsertQueryVaild(res,'regist_period_starttime',regist_period_starttime,insertlist,valuelist,true)) return;
    if(!util.checkInsertQueryVaild(res,'regist_period_endtime',regist_period_endtime,insertlist,valuelist,true)) return;
    if(!util.checkInsertQueryVaild(res,'test_period_starttime',test_period_starttime,insertlist,valuelist,true)) return;
    if(!util.checkInsertQueryVaild(res,'test_period_endtime',test_period_endtime,insertlist,valuelist,true)) return;
    if(!util.checkInsertQueryVaild(res,'room_type',room_type,insertlist,valuelist)) return;

    if(!!filepath){
      filepath = filepath.replace('src\\','');
      util.checkInsertQueryVaild(res,'group_logo',filepath,insertlist,valuelist);
    }

    const uuid = util.getuuid();
    util.checkInsertQueryVaild(res,'group_uuid',uuid,insertlist,valuelist);
    

    const insertfield = commonQ.insertSql.getInsertSqlQuery(insertlist);
    const insertquestion = commonQ.insertSql.getQuestion(insertlist);

    const conn = await mysql.getConnection();
    try{
      const queryString = `INSERT INTO testroom ${insertfield} VALUES ${insertquestion}`;
      await conn.query(`${queryString}`,valuelist)
      
    }catch(err){
      console.log(err);
      if (!res.headersSent) {
        res.status(500).send(err);
      }
    }finally{
      conn.release();
    }
    if (!res.headersSent) {
      res.status(200).send();
    }
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).send(err);
    }
  }
};

exports.updateTestRoom = async (req, res) => {
  try {
    const {sn,group_title,titleText,regist_period_starttime,regist_period_endtime,test_period_starttime,test_period_endtime,room_type} = req.body;
    let {filepath} = req.body;

    const insertlist = [];
    const valuelist = [];

    if(!sn){
      if (!res.headersSent) {
        res.status(400).send(`required sn`);
      }
    }
    if(!util.checkInsertQueryVaild(res,'group_title',group_title,insertlist,valuelist)) return;

    if(!util.checkInsertQueryVaild(res,'title',titleText,insertlist,valuelist)) return;
    if(!util.checkInsertQueryVaild(res,'regist_period_starttime',regist_period_starttime,insertlist,valuelist,true)) return;
    if(!util.checkInsertQueryVaild(res,'regist_period_endtime',regist_period_endtime,insertlist,valuelist,true)) return;
    if(!util.checkInsertQueryVaild(res,'test_period_starttime',test_period_starttime,insertlist,valuelist,true)) return;
    if(!util.checkInsertQueryVaild(res,'test_period_endtime',test_period_endtime,insertlist,valuelist,true)) return;
    if(!util.checkInsertQueryVaild(res,'room_type',room_type,insertlist,valuelist)) return;

    if(!!filepath){
      filepath = filepath.replace('src\\','');
      util.checkInsertQueryVaild(res,'group_logo',filepath,insertlist,valuelist);
    }

    valuelist.push(sn);
    
    const updatefield_value = commonQ.updateSql.getUpdateSqlQuery(insertlist);

    const conn = await mysql.getConnection();
    try{
      const queryString = `UPDATE testroom SET ${updatefield_value} WHERE(sn = ?)`;
      await conn.query(`${queryString}`,valuelist)
      
    }catch(err){
      console.log(err);
      if (!res.headersSent) {
        res.status(500).send(err);
      }
    }finally{
      conn.release();
    }
    if (!res.headersSent) {
      res.status(200).send();
    }
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).send(err);
    }
  }
};
