const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const FileSchema = require('../models/file.model');
const {v4 : uuid4 } = require('uuid');

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/') ,
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
              cb(null, uniqueName)
    } ,
});

let upload = multer({ 
    //storage, 
    limits:{ fileSize: 1000000 * 100 }, 
}).single('myfile');


router.post('/' , (req , res) => {

    // uploading the file
    upload(req , res , async (err) => {

        if(!req.file){              
            return res.json({
                "error" : "File not Found"
            })
        }


        if(err){
            return res.status(500).send({ error : err.message});
        }

        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(req.file.originalname)}`;

        // if no error then We can upload the file into the database
        const File = new FileSchema({
            filename : uniqueName,
            uuid : uuid4(),
            path : req.file.path,
            size : req.file.size,
            FileData : req.file.buffer,
        });
        const result = await File.save();
        res.json({ file: `${process.env.APP_BASE_URL}/files/${result.uuid}` });
    })
})

router.post('/send' , async (req  , res) => {
    try{
        const {uuid , EmailFrom , EmailTo} = req.body;
        
        if(!uuid || !EmailFrom || !EmailTo){
            return res.send({
                success : false,
                error : "Not Enough Data"
            })
        }


        const file = await FileSchema.findOne({ uuid : uuid});

        if(file.sender){
            return res.send({
                success : false,
                error : 'Mail Is already sent' 
            })
        }

        file.sender = EmailTo;
        file.receiver = EmailFrom;

        const response = await file.save();

        // sending mail


        const SendEmail = require('../services/emailSend');
        
        const respo = await SendEmail({
            from : EmailFrom,
            to : EmailTo,
            subject : 'File From NodeJS',
            text : `${EmailFrom} Shared File to You`,
            html : require('../services/emailTemplate')({
                emailFrom : EmailFrom,
                downloadLink : `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
                size : file.size,
                expires : 'No expires',
            })
        })
        if(respo.success){
            return res.send({
                success : true,
                message : 'Email Sent succesfully'
            })
        }
        return res.send({
            success : false,
            message : 'Problem Occured while Sending Mail'
        })   

    } catch(err) {
        return res.send({
            success : false,
            error : err.message,
        })
    }

    



})



module.exports = router;