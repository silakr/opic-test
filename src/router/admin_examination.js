const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { validationResult } = require("express-validator");
const {getApplicatorList} = require('../Controller/admin/examroom_applicator');

router.get("/applicator",[
  check("room_sn","room_sn is required").not().isEmpty(),
], (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    if (!res.headersSent) {
      return res.status(400).json({ errors: errors.array() });
    }
  }else{
    getApplicatorList(req, res);
  }
});


module.exports = router;
