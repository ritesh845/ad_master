const fs = require('fs');
const path = require('path');

const storage = (sampleFile,folder) => {   
    let dir = path.join(__dirname, `${folder}`);
    if (!fs.existsSync('./poster/')) {
        fs.mkdirSync('./poster/');
    }
    if (!fs.existsSync('./uploads/')) {
        fs.mkdirSync('./uploads/');
    }

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    let name =  Date.now() + '_' + sampleFile.name;
    let uploadPath = path.join(dir,name);
    sampleFile.mv(uploadPath, function(err) {
        if (err)
            return res.status(500).json({ success: false, message: [], error: 'Internal Server Error' });
    });
    return  `${folder}`.replace('../',"") +'/' + name;
}

exports.uploadFiles = async (req,res,next) => {
    let folder = '';
    let sampleFile = '';
    let errors = true;
    let message = {
        "value"     : "",
        "msg"       : "",
        "param"     : "",
        "location"  : "body"
    }
    let imageFiles = [];
    let videoFiles = [];
    if(req.files !== null){
        if(req.files.poster != undefined){
            if(req.body.poster_type === 'images'){
                if(req.files.poster.mimetype === 'image/png' || req.files.poster.mimetype === 'image/jpg' || req.files.poster.mimetype === 'image/jpeg'){
                    sampleFile = req.files.poster;
                    folder = '../poster/images';
                    errors = false;
                }else{
                    message.msg = "poster field is type of image";
                    message.param = 'poster';
                    errors = true;
                }
            }else{
                if(req.files.poster.mimetype === 'video/mp4'){
                    sampleFile = req.files.poster;
                    folder = '../poster/videos';
                    errors = false;
                }else{
                    message.msg = "poster field is type of video";
                    message.param = 'poster';
                    errors = true;
                }
            }     
            if(!errors){
                req.body.posterFile =  storage(sampleFile,folder);
            } 
        }else{
            message.msg = "poster field is required";
            message.param = 'poster';
            errors = true;
            
        }
        if(req.files.files != undefined){
            if(req.files.files.length === undefined){
                sampleFile  = req.files.files;
                if(sampleFile.mimetype === 'image/png' || sampleFile.mimetype === 'image/jpg' || sampleFile.mimetype === 'image/jpeg'){
                    folder = '../uploads/images';
                    imageFiles.push(storage(sampleFile,folder));
                }else if(sampleFile.mimetype === 'video/mp4'){
                    folder = '../uploads/videos';
                    videoFiles.push(storage(sampleFile,folder));
                }
                
            }else{
                req.files.files.forEach((file) => {
                    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
                        folder = '../uploads/images';
                       imageFiles.push(storage(file,folder));
                    }else if(file.mimetype === 'video/mp4'){
                        folder = '../uploads/videos';
                        videoFiles.push(storage(file,folder));
                    }
                });
            }
            req.body.imageFiles = imageFiles;
            req.body.videoFiles = videoFiles;
        }else{
            message.msg = "files field is required";
            message.param = 'files';
            errors = false;            
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

