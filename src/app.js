const dotenv = require("dotenv");
dotenv.config();

const path = require("path")
const fs = require('fs');
const util = require('util');
const dayjs = require('dayjs');
const express = require("express");
const morgan = require("morgan");

const cors = require('cors');
const jwt = require('./JsonWebToken/jwt');
const routerindex = require("./routerindex");
const bodyParser = require("body-parser");


const app = express();

app.use(morgan('common', {
  stream: fs.createWriteStream('./log/access.log', {flags: 'a'})
}));

///////////////local log 파일 설정///////////////

const log_file = fs.createWriteStream(path.join(__dirname,'..',`log/${dayjs().format('YYYY-MM-DD')}debug.log`), {flags : 'a'});
const error_log_file = fs.createWriteStream(path.join(__dirname,'..',`log/${dayjs().format('YYYY-MM-DD')}error.log`), {flags : 'a'});
const log_stdout = process.stdout;

console.log = function(d,iserror = false) {
  if(iserror){
    error_log_file.write(dayjs().format('YYYY-MM-DD HH:mm:ss ')+ util.format(d) + '\n');
    //일단 슬렉 생략
    //slack.requestSlackMessage(`${process.env.RUNSERVER}/ `+util.format(d));
  }else{
    log_file.write(dayjs().format('YYYY-MM-DD HH:mm:ss ')+ util.format(d) + '\n');
  }
  log_stdout.write(dayjs().format('YYYY-MM-DD HH:mm:ss ')+ util.format(d) + '\n');  
};

///////////////local log 파일 설정///////////////


//////////////파일 저장 디렉토리 확인//////////////

!fs.existsSync('./src/media') && fs.mkdirSync('./src/media');
!fs.existsSync('./src/media/exam') && fs.mkdirSync('./src/media/logo');
!fs.existsSync('./src/media/exam') && fs.mkdirSync('./src/media/exam');

//////////////파일 저장 디렉토리 확인//////////////

app.set("port", process.env.PORT);
app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb',extended: false}));


//CORS
app.use(
  cors({
    origin: '*',
    credentials: true
  })
);



//morgan dev - 개발 , combined - 배포
app.use(morgan(process.env.RUNENV));

//file 저장소
app.use('/media', express.static(path.join(__dirname, 'media')))

//route

app.use('/api/index',routerindex.index);
app.use('/api/application',routerindex.application);
app.use('/api/admin',jwt.authenticateAccessToken,routerindex.admin);
app.use('/api/admin/exmination',jwt.authenticateAccessToken,routerindex.admin_examination);

//middle ware

app.use((req,res,next)=>{
  if(!res.headersSent)res.status(404).send("Not Found");
});

app.listen(app.get("port"),'0.0.0.0' ,() => {
  
});
