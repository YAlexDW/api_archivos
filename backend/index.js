var express= require("express")
var bodyParser= require("body-parser")
var mongoose= require("mongoose")
var multer = require(`multer`);
const Files = require("./models/Files");

let port = process.env.PORT || 3001;

let app= express();
let files = require("./routes/files"); 



mongoose.connect("mongodb+srv://desarrollador:SQLgcg2022@constructoragcg.bm06nvx.mongodb.net/?retryWrites=true&w=majority",
(err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('BD On..');
        app.listen(port, function () {
            console.log("Servidor Backend On");
    });
}
});

mongoose.connection.on('connected', () => {
    console.log("mongo atlas");
});

app.use("/api",files);



module.exports = app;