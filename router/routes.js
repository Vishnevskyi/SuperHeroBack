const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const controller = require("../controllers/controller");
const upload = require("../middleware/file");
router.use("/read",(req,res,next)=>{
    fs.readdir(path.join(__dirname, "../../public/images"),(err,files)=>{
        files.forEach(file => {
            router.use(`/public/images/${encodeURI(file)}`,(request,response)=>{
                response.sendFile(path.join(__dirname, `../../public/images/${file}`));
            })
        })
    })
    next();
} ,controller.read);
router.use("/create", upload.single("img"), controller.create);
router.use("/delete", controller.delete);
router.use("/change", controller.update);
router.use("/changeImg", upload.single("img"), controller.changeImg);
router.use("/deleteimg", controller.imgRemove);
module.exports = router;