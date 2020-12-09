const { userInformation } = require("../models/index.js");
const multer = require('multer');

const storage = multer.diskStorage({
  destination:(req, file, callBack) =>{
    callBack(null, './app/public/images');
  },
  filename:(req, file,callBack)=>{
    callBack(null, `${file.originalname}`)
  }
})
var upload= multer({storage:storage});
module.exports = app => {
    const userinformation = require("../controllers/userinformation.controller.js");
     router.post("/getuser", userinformation.getUser);
     router.post("/addmoment", userinformation.addMoment);
     router.get("/getmoments", userinformation.getMoments);
     router.post("/create", userinformation.createUser);
     router.post("/deletemoment", userinformation.deleteMoment);
     router.post("/editmoment", userinformation.editMoment);
     router.post("/file",upload.single('file'), userinformation.addFile);
    app.use('/api/userinformation', router);
  }; 