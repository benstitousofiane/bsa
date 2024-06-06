const fs = require('fs')
shell = require('shelljs')

//walls[i][0] : app name, and walls[i][1] : variables on url ?, walls[i][2] : variable path, walls[i][3] : variables names, walls[i][4] : file extension
walls = [["lacase", true, "formula:lol", "{formula : req.params.formula}","ejs"]] // faire la config des apps après qu'elles aient tous une page web.
//exemple of walls : walls = [["AppName or AppRoute", false, "number1:number2/ ~ personalised", "{var1:...,var2=...}"]]

//index.js updater
index_code = [
    'express = require("express")',
    'app = express()',
    'port = 3000',
    'app.set("views", "./views")',
    'app.set("view engine", "ejs")',
    'app.use(express.static("./views"))',

    'app.get("/", (req, res) => {',
    'res.render("index.ejs")',
    '})'
]


for (let i = 0; i < walls.length; i++){

    if (walls[i][1]){
        index_code.push(
            `app.get("/${walls[i][0]}/${walls[i][2]}", (req, res) => {`,
            `res.render("index.${walls[i][4]}", ${walls[i][3]})`,
            '})'
        )
    }
    else{
        index_code.push(
            `app.get("/${walls[i][0]}", (req, res) => {`,
            `res.render("index.${walls[i][4]}")`,
            '})'
        )
        
    }
    //ensuite modifier le fichier index.js
}

index_code.push(
    'app.listen(port, (err) => {',
    'if (err){',
    'console.log("Erreur, l application n a pas démarré ❌😡🔥")',
    '}',
    'else{',
    'console.log(`L application a démarré sur le port ${port} 😤👌✅🚀`)',
    '}',
    '})'
)


fs.open('index.js', 'w', (err, file) => {
    fs.writeFileSync(file, "")
    fs.closeSync(file)
})

fs.open('index.js', 'a', (err,file) => {
    for (let i = 0; i < index_code.length; i++){
        console.log(index_code[i])
        fs.writeFileSync(file, `${index_code[i]}\n`)
    }
    fs.closeSync(file)
})


//A faire : terminer l'algorithme en ajoutant les pages des projets.
//Page assembler :
// use for loop and :
// shell.exec(`git clone https://github.com/benstitousofiane/${walls[i][0]}`)
// shell.mv(`${walls[i][0]}`, '../views')
