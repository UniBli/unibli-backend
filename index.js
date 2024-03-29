// Import express
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())


// Import do conn para conexão do Oracle com Sequelize
const conn = require('./db/conn')

/*****************IMPORT MODELS****************/
// Obs.: só o fato delas estarem aqui quando rodar o projeto elas já são criadas.
const Usuario = require('./models/Usuario')
/**********************************************/

/*****************IMPORT ROUTES****************/
const usuariosRotas =  require('./routes/usuariosRotas')
const authRotas = require('./routes/auth0ManagementRotas')
/**********************************************/


/**************CONFIGURAÇÕES APP****************/
// Configurar Express para poder pegar o body dos forms
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json()) //Obter o dado do body em json()


app.use('/usuarios', usuariosRotas)//significa que o middleware usuariosRotas será acionado para qualquer requisição cujo caminho comece com '/usuarios'.
app.use('/auth0', authRotas)
/***********************************************/


conn.sync()
    .then(() => {
        app.listen(3307)
    }).catch(err => console.log(err))
