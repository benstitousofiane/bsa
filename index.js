require("dotenv").config();
const express = require("express")
const session = require("express-session")
const mysql = require("mysql")
const path = require("path")

const port = 3000
const app = express()


app.set("views", "./vus")
app.set("view engine", "ejs")
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(express.static(path.join(__dirname + "/public")))

// let oui = "oui"

app.get("/", (req, res) => {
    req.session.pseudo = "utilisateur"
    req.session.isConnect = true
    res.render("index", {pseudo: req.session.pseudo, isConnect: req.session.isConnect})
})

app.listen(port, (err)=>{
    if (err){
        console.log("Erreur, le serveur n'a pas démarré")
    } else{
        console.log(`Le serveur à démarré au port ${port}`)
    }
})