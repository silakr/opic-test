const express = require("express");
const multer  = require('multer');
const path = require('path');

const manageUrl = (req,file) =>{
  var ext = path.extname(file.originalname);
  if(req.url === "/upload" || req.url === "/createTestRoom"){
    //업로드 또는 룸 생성인데 url인데 데이터가 webm이면 error
    if(ext === ".webm"){
      return false
    }else{
      return './src/media'
    }
  }else if(req.url === "/exam"){
    //시험영상은 .webm만 업로드 가능
    if(ext === ".webm"){
      return './src/media/exam'
    }else{
      return false
    }
  }else{
    return false
  }
  
}

const imgStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, manageUrl(req,file)); // 저장할 파일 경로
  },
  filename: function(req, file, callback) {
    fName = `${Date.now()}` + file.originalname; // 저장할 파일명 = 시간 + 원래 파일명
    req.body.filesave = true;
    req.body.filepath = path.join(manageUrl(req,file),fName);
    callback(null, fName);
  }
});

exports.imgUpload = multer({
  storage: imgStorage,
  fileFilter: function(req, file, callback) {
    //확장자 확인 주석
    var ext = path.extname(file.originalname);
    console.log('ext : '+ ext);
    //저장 허용 파일 : png, jpg, svg, webm
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.JPG' && ext !== '.PNG' && ext !== '.svg' && ext !== '.webm') {
      console.log('not png, jpg, svg, webm');
      req.body.filesave = false;
      callback(null, false);
    } else {
      if(!manageUrl(req,file)){
        //Url에 해당하는 데이터 없으면 false
        req.body.filesave = false;
        return callback(null,false);
      }else{
        return callback(null, true);
      }
    }
  }
});

