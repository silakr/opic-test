const express = require("express");
const router = express.Router();
const jwt = require('../JsonWebToken/jwt');
const utils_file = require('../util_file');


router.get("/", (req, res) => {
  res.send('hello');
});

router.get("/jwt", (req, res) => {
  token = jwt.generateAccessToken(req.query)
  res.status(200).send(token);
});


//TO-DO implementation
router.post('/upload', utils_file.imgUpload.single('file'), async (req, res) => {
  try {
    if(req.body.filesave){
      res.send(200);
    }else{
      res.send(400);
    }
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).send();
    }
  }
});

//TO-DO implementation
router.post('/exam', utils_file.imgUpload.single('file'), async (req, res) => {
  try {
    if(req.body.filesave){
      res.send(200);
    }else{
      res.send(400);
    }
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).send();
    }
  }
});

module.exports = router;
