const { mostrar, filtrarJoyas, Hateos, mostrarJoya } = require('../services/indexServices')

const controller = {

    welcome: (req, res) => {
        res.status(200).
            send('Hola! intenta navegar usando como parametro la palabra "joyas" en la URL y filtrar a tu gusto ✌️')
    },

    listar: async (req, res) => {
        try {
            const queryStrings = req.query
            const listado = await mostrar(queryStrings)
            const HATEOS = await Hateos(listado)
            res.status(200).json(HATEOS)
        }
        catch (e) {
            res.status(500)
                .send(`Ups...${e.message} 🙇`)
        }
    },

    listarJoya: async (req, res) => {
        try {
            const { id } = req.params
            const joya = await mostrarJoya(id)
            res.status(200).json(joya)

        } catch (e) {
            res.status(500).send(e.message)
        }

    },

    filtrar: async (req, res) => {
        try {
            const queryStrings = req.query
            const filtrado = await filtrarJoyas(queryStrings)
            filtrado.length === 0 ? res.status(200)
                .json('No encontramos lo que buscas, Intenta otros parámetos para poder ayudarte') :
                res.status(200).json(filtrado)

        } catch (e) {
            res.status(500).send(e.message)
        }
    },

    notFound: (req, res) => {
        res.status(404).send('Ruta desconocida... 👎')
    }
}

module.exports = controller