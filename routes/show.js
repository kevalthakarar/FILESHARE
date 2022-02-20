const router = require('express').Router();
const FileSchema = require('../models/file.model');


router.get('/:uuid' , async(req , res) => {

    try {
        const file = await  FileSchema.findOne({ uuid : req.params.uuid });
        
        if(!file){
            return res.send({
                success : false,
                err : "Link Not Found",
            })
        }

        // we get the file 

        return res.send({
            success : true,
            message : file,
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        })

    } catch(err){
        return res.send({
            success : false,
            err : err.message,
        });
    }

})




module.exports = router;