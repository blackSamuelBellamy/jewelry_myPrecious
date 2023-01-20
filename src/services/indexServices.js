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

const mostrarJoya = async id => {
    const command = 'SELECT * FROM inventario WHERE id = $1;'
    const value = [id]
    const { rows: joya } = await pool.query(command, value)
    return joya
}

const filtrarJoyas = async ({ precio_min, precio_max, categoria, metal }) => {
    if (precio_min && isNaN(precio_min))
    throw new Error('Precio mínimo debe ser un número sin otros caracteres')

    if (precio_max && isNaN(precio_max))
    throw new Error('Precio máximo debe ser un número sin otros caracteres')

    const tipos = ['aros', 'anillo', 'collar']

    if (categoria && !tipos.includes(categoria))
    throw new Error(`No trabajamos con ${categoria}, intenta con aros, anillo o collar`)

    const metalTipo = ['oro', 'plata']

    if (metal && !metalTipo.includes(metal))
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
    const results = parameter.map(params => (
        {
            href: `http://localhost:3000/joya/${params.id}`,
            name: params.nombre,
            category: params.categoria,
            metal: params.metal,
            price: params.precio,
            stock: params.stock
        }
    ))

    let count = 0
    results.map(cantidad => count += cantidad.stock)

    const totalJoyas = results.length
    const stockTotal = count
    const HATEOS = {
        totalJoyas,
        stockTotal,
        results
    }
    return HATEOS
}

module.exports = { mostrar, mostrarJoya, filtrarJoyas, Hateos }