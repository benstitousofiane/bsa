express = require("express")
app = express()
port = 3000

app.set("views", "./views")
app.set("view engine", "ejs")
app.use(express.static("./views"))

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.listen(port, (err) => {
    if (err){
        console.log("Erreur, l'application n'a pas démarré ❌😡🔥")
    }
    else{
        console.log(`L'application a démarré sur le port ${port} 😤👌✅🚀`)
    }
})