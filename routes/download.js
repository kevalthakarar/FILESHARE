const router = require('express').Router();
const FileSchema = require('../models/file.model');

router.get('/:uuid' , async (req , res) => {

    try{
        // const file = await FileSchema.findOne({ uuid : req.params.uuid });

        // if(!file){
        //     return res.send({
        //         success : false,
        //         error : 'Link is not found or expired'
        //     })
        // }

        // const filePath = `${__dirname}/../${file.path}`;

        // res.download(filePath);

        const file = await FileSchema.findOne({ uuid : req.params.uuid });
        if(!file){
                return res.send({
                    success : false,
                    error : 'Link is not found or expired'
                })
        }
        console.log(file.path);
        if(file.filename.includes(".png")){
            res.set('Content-Type' , 'image/png');
        }
        if(file.filename.includes(".txt")){
            res.set('Content-Type' , 'text/simple');
        }
        if(file.filename.includes(".html")){
            res.set('Content-Type' , 'text/html');
        }
        if(file.filename.includes(".pdf")){
            res.set('Content-Type' , 'application/pdf');
        }
        // list of so on
        
        res.send(file.FileData);

    } catch(err){
        
        return res.send({
            success : false,
            error : err.message,
        })
    }



})




module.exports = router;