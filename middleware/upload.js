const fs = require('fs');
const path = require('path');


exports.uploadFiles = (req,res,next) => {
    let  uploadPath = '';
    let sampleFile = '';
    let errors = true;
    let message = {
        "value"     : "",
        "msg"       : "",
        "param"     : "",
        "location"  : "body"
    }
    if(req.files !== null){
        if(req.files.poster != undefined){
            if(req.body.poster_type === 'images'){
                if(req.files.poster.mimetype === 'image/png' || req.files.poster.mimetype === 'image/jpg' || req.files.poster.mimetype === 'image/jpeg'){
                    sampleFile = req.files.poster;
                    uploadPath = __dirname + '/../poster/images/' + sampleFile.name;
                    errors = false;
                }else{
                    message.msg = "poster field is type of image";
                    message.param = 'poster';
                    errors = true;
                }
            }else{
                if(req.files.poster.mimetype === 'video/mp4'){
                    sampleFile = req.files.poster;
                    uploadPath = __dirname + '/../poster/videos/' + sampleFile.name;
                    errors = false;
                }else{
                    message.msg = "poster field is type of video";
                    message.param = 'poster';
                    errors = true;
                }
            }     
            // if(!errors){
            //     sampleFile.mv(uploadPath, function(err) {
            //         if (err)
            //             return res.status(500).json({ success: false, message: [], error: 'Internal Server Error' });
                
            //     });
            // } 
        }else{
            message.msg = "poster field is required";
            message.param = 'poster';
            errors = true;
            
        }
        if(req.files.files != undefined){
            console.log("files type",typeof(req.files.files))
            console.log("files",req.files.files.name)
        }else{
            message.msg = "files field is required";
            message.param = 'files';
            errors = true;            
        }
    }else{
        message.msg = "Files and poster fields is required";
        message.param = "files and poster";
        errors = true;  
    }
    if(errors){
        return res.status(400).json({ success: false, error: "Validator Error", message: [message] });
    }
    next();
}