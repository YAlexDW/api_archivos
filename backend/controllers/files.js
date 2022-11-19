let moment = require ("moment")
let files = require ("../models/Files")
let fs = require("fs")
let path = require ("path")
const multer = require(`multer`);
const Files = require("../models/Files");
moment.locale('es')

let fecha_subida = moment()

const storage = multer.diskStorage(
    {
        filename:function(res,file,cb){
            const ext =file.originalname.split(".").pop()
            const fileName = Date.now();
            cb(null,`${fileName}.${ext}`);
        },
        destination:function(res,file,cb){
            cb(null,)
        },
    }
)
const CreateFiles = (req,res)=>{
    let params= req.bod;
    let files = new Files();
    if(
        params.id_user &&
        params.rut &&
        params.camara_comercio &&
        params.cc_representante_legal &&
        params.certificacion_bancaria &&
        params.certificaciones_producto_fechatecnica &&
        params.Plantilla_seguridad &&
        params.matricula_profesional &&
        params.certificado_experiencia &&
        params.fecha_subida 
    ){
        let imagespath = req.files.image.path;
        let filename = id_user + imagespath;
        let routeserve = "./upload/Files_provedor" + filename + path.extname(imagespath);
        fs.fs.createReadStream(imagesPath).pipe(fs.createWriteStream(routeserve));
        let image = filename + path.extname(imagesPath).toLowerCase();

        Files.id_user = params.id_user;
        Files.rut = params.rut;
        Files.camara_comercio = params.camara_comercio;
        Files.cc_representante_legal = params.cc_representante_legal;
        Files.certificacion_bancaria = params.certificacion_bancaria;
        Files.certificaciones_producto_fechatecnica = params.certificaciones_producto_fechatecnica;
        Files.Plantilla_seguridad = params.Plantilla_seguridad;
        Files.matricula_profesional = params.matricula_profesional;
        Files.certificado_experiencia = params.certificado_experiencia;
        Files.fecha_subida = params.fecha_subida + moment;

        Files.save((err, datafile) => {
            if (err) {
                res.status(500).send({mensaje: "error al guardar"});
            } else {
                if (datafile) {
                    res.status(200).send({Files: datafile});
                } else {
                    res.status(401).send({mensaje: "no se pudo subir imagenes"})
                }
            }
        });
        
    } else {
        res.status(401).send({mensaje: "faltan algunos de los datos"})
    }
};

const obtenerImages = (req, res) => {
    let img = req.params["jpg"];
    if (img != "null") {
let pathImg = "./upload/Files_provedor/" + img;
res.status(200).sendFile(path.resolve(pathImg));
    }
}

const listFiles = (req, res) => {
    files.find((err,fileData)=>{
        if(fileData) {
            res.status(200).send({file: fileData});
        }
    });
};

const getfileid = (req,res)=> {
    let id = req.params["id"];
    files.findById(id,(err,userData)=> {
        if (userData) {
            res.status(200).send({user : userData})
        }else{
            res.status(403).send({ message: "No se encontro ningun registro" })
        }
    })
}

    


const updateFiles = (req, res) => {
    console.log(req.body);
    let params = req.body;
    let id = req.params["id"];
    let img = req.params["img"];

    if (
        params.id_user &&
        params.rut &&
        params.camara_comercio &&
        params.cc_representante_legal &&
        params.certificacion_bancaria &&
        params.certificaciones_producto_fechatecnica &&
        params.Plantilla_seguridad &&
        params.matricula_profesional &&
        params.certificado_experiencia &&
        params.fecha_subida 
    ){

        let imagesPath = req.files.image.path;
        let filename = id_user + imagespath;
        var routeServe =
            "./upload/Files_provedor/" + filename + path.extname(imagesPath);
        fs.createReadStream(imagePath).pipe(fs.createWriteStream(routeServe));
        let IMG = filename + path.extname(imagesPath);
        console.log(params);
        console.log(IMG);
        Product.findByIdAndUpdate(
            { _id: id },
            {
            id_user: params.id_user,
            rut: params.rut,
            camara_comercio: params.camara_comercio,
            cc_representante_legal: params.cc_representante_legal,
            certificacion_bancaria: params.certificacion_bancaria,
            certificaciones_producto_fechatecnica: params.certificaciones_producto_fechatecnica,
            Plantilla_seguridad: params.Plantilla_seguridad,
            matricula_profesional: params.matricula_profesional,
            certificado_experiencia: params.certificacion_bancaria,
            fecha_subida_params: params.fecha_subida,
            },
            (err, fileData) => {
            console.log(fileData)
            if (err) {
                res.status(500).send({ message: "Error en el servidor" });
            } else {
                if (fileData) {
                res.status(200).send({ File: fileData });
                } else {
                res.status(403).send({ message: "No se editaron las imagenes" });
                }
            }
            }
        );
        } else {
        res.status(401).send({ mensaje: "Falto algunas imagenes" });
        }
    };

    const getfilesbyid = (req,res)=> {
        let id = req.params["id_user"];
        files.findById(id,(err,fileData)=> {
            if (filesData) {
                res.status(200).send({user : fileData})
            }else{
                res.status(403).send({ message: "No se encontro ningun archivo" })
            }
        })
    }
    
    const deleteuserfiles = (req, res) => {
        let id = req.params["id"];
        files.findByIdAndDelete({ _id: id },  (err, fileData) => {
            if (err) {
                res.status(500).send({mensaje: "error al conectar al servidor"});
            } else {
            if (fileData) {
                fs.unlink("./upload/Files_provedor/" + fileData.image, (err) => {
                    if (err) throw err;
                });   
                res.status(200).send({product: fileData});
            } else {
                res.status(401).send({mensaje: "los archivos  no se pudieron eliminar"});
            } 
            }
        });
    };

module.exports = {
    CreateFiles,
    obtenerImages,
    listFiles,
    updateFiles,
    getfilesbyid,
    deleteuserfiles,
    getfileid
}




/*  const editfile =(req,res)=> {
        let id = req.params["id"];
    let params = req.body; {
        if (Update) {
            File.findByIdAndUpdate(id,
                {
            rut: params.rut, 
            camara_comercio: params.camara_comercio,
            cc_representante_legal : params.cc_representante_legal,
            certificacion_bancaria: params.certificacion_bancaria,
            certificaciones_producto_fechatecnica: params.certificaciones_producto_fechatecnica,
            Plantilla_seguridad: params.Plantilla_seguridad,
            matricula_profesional: params.matricula_profesional,
            certificado_experiencia : params.certificado_experiencia,
            fecha_subida: fecha_subida,
                },
        (err,fileData)=>{
            if(fileData) {
                res.status(200).send({ User: fileData });
                } else {
                res.status(501).send({ message: "no se pudieron editar los archivos" });
            }
        }    
    )}
    });
    }else{
        {User.findByIdAndUpdate(id,
            {
                name: params., 
                nit: params.,
                billing_email: params.,
                phoneNumber: params.,
                adress: params.,
                identification: params.,
                contac_email: params.,
            },
        (err,userData)=>{
            if(userData) {
                res.status(200).send({ User: userData });
            } else {
                res.status(501).send({ message: "El usuario no se pudo editar" });
            }
        }
    )}
    }
    }




    /* const fileList =(req,res)=>{
        User.find((err,FileData)=>{
            if(fileData) {
                res.status(200).send({user: fileData});
            }
        });
    };
     */ 