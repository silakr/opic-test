const express = require("express");
const { check } = require("express-validator");
const { validationResult } = require("express-validator");
const { getApplicatorList } = require("../Controller/admin/examroom_applicator");
const util_file = require('../util_file');
const router = express.Router();


router.get("/", (req, res) => {
  res.send('hello');
});

router.get("/testRoomList",async (req, res) => {
  getTestRoomList(req, res);
});


router.post("/createTestRoom", util_file.imgUpload.single('file'),async (req, res) => {
  createTestRoom(req, res);
});

router.put("/updateTestRoom", util_file.imgUpload.single('file'),async (req, res) => {
  updateTestRoom(req, res);
});

router.get("/receiptList",[
  check("room_sn","room_sn is required").not().isEmpty(),
], async (req, res) => {
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
