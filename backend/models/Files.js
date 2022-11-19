let mongoose = require("mongoose");
let Schema = mongoose.Schema;


let files = new Schema({
    id_user: {type: Schema.ObjectId, ref: 'User'},
    rut: String,
    camara_comercio : String,
    cc_representante_legal: String,
    certificacion_bancaria: String,
    certificaciones_producto_fechatecnica : String,
    Plantilla_seguridad: String,
    matricula_profesional: String,
    certificado_experiencia: String,
    fecha_subida: String,
    fecha_update: Date
});

module.exports= mongoose.model("Files", files);