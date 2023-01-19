require('colors')

const message = (port) => {
    console.clear()
    console.log('============================'.blue)
    console.log(`   SERVER ON PORT ${port}...`.yellow)
    console.log('============================'.blue)
    console.log(`  
     ─▌█──║─║╔═║─║─╔═╗─
     ─███─╠═╣╠═║─║─║─║─
     ─▐█▐─║─║╚═╚═╚═╚═╝─
     ─▐▐───────────────
     ─▐▐─────────────── `.green)
}

module.exports = message