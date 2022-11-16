const { readFile } = require("fs");
const nodemailer = require("nodemailer");
const { SERVEREEOR } = require("../../json/enum/servererr");

exports.sendMail = async (tempPw, email) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    let html = readFile('./mail.html','utf8');
    // send mail with defined transport object
    transporter.sendMail({
      from: `"플립" <${process.env.NODEMAILER_USER}>`,
      to: `${email}`,
      subject: '주제적응형 영어말하기 모의 평가 안내 메일입니다.',
      text: "test",
      html: html
    });
  } catch (err) {
    console.log(err,true);
  }
};
