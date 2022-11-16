const express = require("express");
const { check } = require("express-validator");
const { validationResult } = require("express-validator");
const { getTestRoom, registApplication } = require("../Controller/application/applicationController");
const router = express.Router();


router.get("/", (req, res) => {
  res.send('hello');
});

router.get("/applicationform",[
  check("uuid","uuid is required").not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    if (!res.headersSent) {
      return res.status(400).json({ errors: errors.array() });
    }
  }else{
    getTestRoom(req, res);
  }
});

router.post("/applicationform",[
  check("uuid","uuid is required").not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    if (!res.headersSent) {
      return res.status(400).json({ errors: errors.array() });
    }
  }else{
    registApplication(req, res);
  }
});



module.exports = router;
