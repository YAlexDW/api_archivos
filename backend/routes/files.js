let express= require("express");
let File= require("../controllers/files");
let multipart = require("connect-multiparty");
let path =  multipart({cargas : "./upload/Files_provedor" });

let api= express.Router();

api.post("/files/CreateFiles", path ,File.CreateFiles);
api.get("/files/img/:img", File.obtenerImages);
api.put("/files/updateFiles/:id", path , File.updateFiles);
api.get("/files/:id?", File.listFiles);
api.get("/files/getfileid", File.getfileid)
api.delete("/files/deleteuserfiles/:id", File.deleteuserfiles);





module.exports = api;