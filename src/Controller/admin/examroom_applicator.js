const mysql = require('../../DB/mysql');
const commonQ = require('../../DB/common/commonDB');
const util = require('../../Util');

exports.getApplicatorList = async (req, res) => {
  try {
    const {room_sn} = req.query;
    const conn = await mysql.getConnection();
    
    try{
      const applicatorQueryString = `SELECT * FROM applicator WHERE(test_room = ${room_sn})`;
      const applicatorQueryResult = await conn.query(`${applicatorQueryString}`,[])
      
      if (!res.headersSent) {
        res.status(200).send(applicatorQueryResult[0]);
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
