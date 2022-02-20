const router = require('express').Router();
const FileSchema = require('../models/file.model');

router.get('/:uuid' , async (req , res) => {

    try{
        const file = await FileSchema.findOne({ uuid : req.params.uuid });

        if(!file){
            return res.send({
                success : false,
                error : 'Link is not found or expired'
            })
        }

        const filePath = `${__dirname}/../${file.path}`;

        res.download(filePath);

    } catch(err){
        
        return res.send({
            success : false,
            error : err.message,
        })
    }



})




module.exports = router;