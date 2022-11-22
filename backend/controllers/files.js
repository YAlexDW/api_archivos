let moment = require ("moment")
let files = require ("../models/Files")
let fs = require("fs")
let path = require("path")
const multer = require(`multer`);
const Files = require("../models/Files");
const { Router } = require("express");
moment.locale('es')

let fecha_subida = moment()
let router = require()

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
    router.get("/files/",(req, res, next) => {
            let body = req.body;
            console.log(body)
            res.send("Cheking user...");
})
    let params= req.body;
    console.log(params)
    let files = new Files();
    if(
        params.id_user 

    ){ 
        let rut_path = req.files.rut.path;
        let rut_name = "rut_" + params.id_user;
        let rut_routeserve = "./upload/Files_provedor/" + rut_name + path.extname(rut_path);
        fs.createReadStream(rut_path).pipe(fs.createWriteStream(rut_routeserve));
        let rut = rut_name + path.extname(rut_path).toLowerCase();

        let camara_comercio_path = req.files.camara_comercio.path;
        let camara_comercio_name = "camara_comercio_" + params.id_user;
        let camara_comercio_routeserve = "./upload/Files_provedor/" +  camara_comercio_name + path.extname(camara_comercio_path);
        fs.createReadStream(camara_comercio_path).pipe(fs.createWriteStream(camara_comercio_routeserve));
        let camara_comercio =  camara_comercio_name + path.extname(camara_comercio_path).toLowerCase();

        let cc_representante_legal_path = req.files.cc_representante_legal.path;
        let cc_representante_legal_name = "cc_representante_legal_" + params.id_user;
        let cc_representante_legal_routeserve = "./upload/Files_provedor/" + cc_representante_legal_name + path.extname(cc_representante_legal_path);
        fs.createReadStream(cc_representante_legal_path).pipe(fs.createWriteStream(cc_representante_legal_routeserve));
        let cc_representante_legal = cc_representante_legal_name + path.extname(cc_representante_legal_path).toLowerCase();

        let certificacion_bancaria_path = req.files.certificacion_bancaria.path;
        let certificacion_bancaria_name = "certificacion_bancaria_" + params.id_user;
        let certificacion_bancaria_routeserve = "./upload/Files_provedor/" + certificacion_bancaria_name + path.extname(certificacion_bancaria_path);
        fs.createReadStream(certificacion_bancaria_path).pipe(fs.createWriteStream(certificacion_bancaria_routeserve));
        let certificacion_bancaria = certificacion_bancaria_name + path.extname(certificacion_bancaria_path).toLowerCase();

        let certificaciones_producto_fechatecnica_path = req.files.certificaciones_producto_fechatecnica.path;
        let certificaciones_producto_fechatecnica_name = "certificaciones_producto_fechatecnica_" + params.id_user;
        let certificaciones_producto_fechatecnica_routeserve = "./upload/Files_provedor/" + certificaciones_producto_fechatecnica_name + path.extname(certificaciones_producto_fechatecnica_path);
        fs.createReadStream(certificaciones_producto_fechatecnica_path).pipe(fs.createWriteStream(certificaciones_producto_fechatecnica_routeserve));
        let certificaciones_producto_fechatecnica = certificaciones_producto_fechatecnica_name + path.extname(certificaciones_producto_fechatecnica_path).toLowerCase();

        let Plantilla_seguridad_path = req.files.Plantilla_seguridad.path;
        let Plantilla_seguridad_name = "Plantilla_seguridad_" + params.id_user;
        let Plantilla_seguridad_routeserve = "./upload/Files_provedor/" + Plantilla_seguridad_name + path.extname(Plantilla_seguridad_path);
        fs.createReadStream(Plantilla_seguridad_path).pipe(fs.createWriteStream(Plantilla_seguridad_routeserve));
        let Plantilla_seguridad = Plantilla_seguridad_name + path.extname(Plantilla_seguridad_path).toLowerCase();

        let matricula_profesional_path = req.files.matricula_profesional.path;
        let matricula_profesional_name = "matricula_profesional_" + params.id_user;
        let matricula_profesional_routeserve = "./upload/Files_provedor/" + matricula_profesional_name + path.extname(matricula_profesional_path);
        fs.createReadStream(matricula_profesional_path).pipe(fs.createWriteStream(matricula_profesional_routeserve));
        let matricula_profesional = matricula_profesional_name + path.extname(matricula_profesional_path).toLowerCase();

        let certificado_experiencia_path = req.files.certificado_experiencia.path;
        let certificado_experiencia_name = "certificado_experiencia_" + params.id_user;
        let certificado_experiencia_routeserve = "./upload/Files_provedor/" + certificado_experiencia_name + path.extname(certificado_experiencia_path);
        fs.createReadStream(certificado_experiencia_path).pipe(fs.createWriteStream(certificado_experiencia_routeserve));
        let certificado_experiencia = certificado_experiencia_name + path.extname(certificado_experiencia_path).toLowerCase();

        files.id_user = params.id_user ;
        files.rut = rut ;
        files.camara_comercio = camara_comercio ;
        files.cc_representante_legal = cc_representante_legal ;
        files.certificacion_bancaria = certificacion_bancaria ;
        files.certificaciones_producto_fechatecnica = certificaciones_producto_fechatecnica ;
        files.Plantilla_seguridad = Plantilla_seguridad ;
        files.matricula_profesional = matricula_profesional ;
        files.certificado_experiencia = certificado_experiencia 

        files.save((err, datafile) => {
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

const updateFiles = (req,res) =>{
    console.log(req.body);
}


/* const updateFiles = (req, res) => {
    console.log(req.body);
    let params = req.body;
    let id = req.params["id"];
    let img = req.params["img"];

    if (
        params.id_user
    ){

        let rut_Path = req.files.rut.path;
        let rut_name = id_user + rut_path;
        var rut_routeServe =
            "./upload/Files_provedor/" + filename + path.extname(rut_Path);
        fs.createReadStream(rut_Path).pipe(fs.createWriteStream(rut_routeServe));
        let img = rut_name + path.extname(rut_Path);
        console.log(params);
        console.log(img);
        files.findByIdAndUpdate(
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
    }; */

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
                fs.unlink("./upload/Files_provedor/" + fileData.rut, (err) => {
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