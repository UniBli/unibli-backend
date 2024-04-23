require('dotenv').config()
const {MongoClient, ObjectId} = require('mongodb')
const { identificarChaveValor } = require('./UniBliService') // Acessar o método

const {
    MONGO_BASE_CONNECT_URI,
} = process.env

// Instancia um objeto de cliente para o a collection de acervo no Mongo
const acervo = new MongoClient(`${MONGO_BASE_CONNECT_URI}`)
try {
    acervo.connect().then(() => console.log("Conectado com o MongoDB"))
    
} catch(e){console.log(`Erro ao conectar com o MongoDB: ${e}`)}

module.exports = class FatecAService{

    static async listaAcervoFatec(req, res){
        try {
            const livros = await acervo.db('fatec1').collection('acervo').find().toArray() // Chamo a conexão, indico o banco, a colection 
            //console.log(livros);
            const chavesValores = await identificarChaveValor(livros); // Vai no banco em cima e retornar os dados localizados
            return res.json(chavesValores); // retorna as chaves e valores dos documentos
        } catch(err) {
            console.log(err)
        } 
    }

    static async buscaLivroPorId(req, res){
        const id = req.params.id; // Obtém o ID do livro dos parâmetros da requisição
        const livroID = new ObjectId(`${id}`)
        try {
            const livro = await acervo.db('fatec1').collection('acervo').findOne({_id: livroID})// Encontra o livro com o ID fornecido
            console.log(livro);
        
            livro // Se nenhum livro for encontrado com o ID fornecido
            ? res.json(livro) // Retorna o livro encontrado
            : res.status(404).json({ message: "Livro não encontrado" });
            
        } catch(err) {
            console.log(err);
            return res.status(500).json({ message: "Erro ao buscar o livro" }); // Retorna um erro se algo der errado
        } 
    }

}