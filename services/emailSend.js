const nodemailer = require('nodemailer');
const { transpileModule } = require('typescript');

async function SendEmail({from , to , subject , text , html}){

    let Transport = nodemailer.createTransport({
        host: process.env.HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.Email,
            pass: process.env.EmailPassword,
        }
    });

    let sendemail = await Transport.sendMail({
        from : `From ${from}`,
        to,
        subject,
        text,
        html,
    });

    if(sendemail.response.includes('OK')){
        return {
            success : true
        }
    }
    return {
        success : false
    }
}

module.exports = SendEmail;