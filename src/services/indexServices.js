const format = require('pg-format')
const pool = require('../dataBase/conexion')

const mostrar = async ({ limits = 2, page = 1, order_by = 'id_ASC' }) => {

    if (limits <= 0 || isNaN(limits))
        throw new Error('El límite debe ser un número mayor a cero 👌')

    const [column, forma] = order_by.split('_')
    const offset = (page - 1) * limits

    const command = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s;', column, forma, limits, offset)
    const { rows: joyas } = await pool.query(command)
    return joyas
}

const filtrarJoyas = async ({ precio_min, precio_max, categoria, metal }) => {

    if (isNaN(precio_min) || isNaN(precio_max))
        throw new Error('Precio debe ser un número sin otros carácteres')

    const tipos = ['aros', 'anillo', 'collar']

    if (!tipos.includes(categoria))
        throw new Error(`No trabajamos con ${categoria}, intenta con aros, anillo o collar`)

    const metalTipo = ['oro', 'plata']

    if (!metalTipo.includes(metal))
        throw new Error('Solo trabajamos con oro y plata, no con ' + metal)

    let fullCommand = []
    let values = []
    let mainCommand = 'SELECT * FROM inventario'

    const addFilter = (column, comparisson, value) => {
        values.push(value)
        const { length } = fullCommand
        fullCommand.push(`${column} ${comparisson} $${length + 1}`)
    }

    if (precio_min) addFilter('precio', '>=', precio_min)
    if (precio_max) addFilter('precio', '<=', precio_max)
    if (categoria) addFilter('categoria', '=', categoria)
    if (metal) addFilter('metal', '=', metal)

    if (fullCommand.length > 0) {
        fullCommand = fullCommand.join(' AND ')
        mainCommand += ` WHERE ${fullCommand}`
    }

    const { rows: joyas } = await pool.query(mainCommand, values)
    return joyas
}

const Hateos = parameter => {

    const results = parameter.map( params => (
        {
            name: params.nombre,
            href: `/joya/${params.id}`
        }
    )).slice(0, 2)

    const total = parameter.length
    const HATEOS = {
        total,
        results

    }
    return HATEOS
} 

module.exports = { mostrar, filtrarJoyas, Hateos }