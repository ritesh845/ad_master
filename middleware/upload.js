const fs = require('fs');
const path = require('path');

exports.uploadFiles = (req,res,next) => {

    if(req.files !== null){
        if(req.files.poster !== 'undefined'){
            if(req.body.poster_type === 'images'){
                if(req.files.poster.mimetype === 'image/png' || req.files.poster.mimetype === 'image/jpg' || req.files.poster.mimetype === 'image/jpeg'){
                    req.files.poster.mv(path.join(__dirname, 'uploads', req.files.poster.name), (err) => {
                        if (err)
                            return res.status(500).send(err);
                        return res.send('File uploaded!');
                    });
                }else{
                    return res.status(400).json({ success: false, error: "Validator Error", message: [{
                        "value": "",
                        "msg": "poster field is type of image",
                        "param": "poster",
                        "location": "body"
                    }] }); 
                }
            }else{
                if(req.files.poster.mimetype === 'video/mp4'){

                }else{
                    return res.status(400).json({ success: false, error: "Validator Error", message: [{
                        "value": "",
                        "msg": "poster field is type of video",
                        "param": "poster",
                        "location": "body"
                    }] }); 
                }
            }       
        }else{
            return res.status(400).json({ success: false, error: "Validator Error", message: [{
                "value": "",
                "msg": "poster field is required",
                "param": "poster",
                "location": "body"
            }] }); 
        }
        if(req.files.files !== 'undefined'){
            
        }else{
            return res.status(400).json({ success: false, error: "Validator Error", message: [{
                "value": "",
                "msg": "files field is required",
                "param": "files",
                "location": "body"
            }] }); 
        }
    }else{
        return res.status(400).json({ success: false, error: "Validator Error", message: [{
            "value": "",
            "msg": "File upload error",
            "param": "files and poster",
            "location": "body"
        }] });
    }
    next();
}