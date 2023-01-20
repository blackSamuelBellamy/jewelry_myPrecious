require('colors')

const message = (port) => {
    console.clear()
    console.log('============================'.green)
    console.log(`   SERVER ON PORT ${port}...   `.bgWhite.black)
    console.log('============================'.green)
    console.log(`  
     ─▌█──║─║╔═║─║─╔═╗─
     ─███─╠═╣╠═║─║─║─║─
     ─▐█▐─║─║╚═╚═╚═╚═╝─
     ─▐▐───────────────
     ─▐▐─────────────── `.cyan)
}

module.exports = message