const slackbots = require("slackbots");
const axios = require('axios');
var  emitir = false;
const bot = new slackbots({
    token: 'xoxb-809498885137-816969516756-LauQR0OkF98ZgfxXDOawfSLW',
    name: 'GmdApp'
});

bot.on('open', () => console.log("Bot estoy  Listo Ready !!!"));

bot.on('start', () => {
    bot.postMessageToChannel('general', 'EStoy aqui Activo Con Vida :smile:');
    bot.postMessageToChannel('general', 'Saludos :smiley:');

});


bot.on('message', async (data) => {
    if (data.type !== 'message' || data.subtype == 'bot_message' || !data.text) return;
    const args = data.text.split(" ");
    const comando = args.splice(1, 1)[0].toLowerCase();;
    const usuario_id = args.splice(0, 1);
    const parametros = args.join(' ');

    // console.log(comando);
    // console.log(parametros);
    // con axios realizo peticion http axios



    

    if (comando === 'movie') {
        var emitir = true
        const res = await axios.get(`http://www.omdbapi.com/?t=${parametros}&?i=tt3896198&apikey=b71ef170`)

        if (res.data.Response === 'False') return bot.postMessageToChannel('general', 'Pelicula no encontrada :-1:')
        bot.postMessageToChannel('general', ` :+1: ${res.data.Title} : ${res.data.Poster}`)


    
    }

    if (comando === 'capital') {
        var emitir = true
        const res = await axios.get(`https://restcountries.eu/rest/v2/name/${parametros}`)



        if (!res.status === 200 || res.err || parametros == '' || res == '') return bot.postMessageToChannel('general', 'Pais No encontrado :-1:')
        const datosPais = res.data[0]


        bot.postMessageToChannel('general', ` :+1: Pais :${datosPais.name}  Capital ${datosPais.capital} : ${datosPais.flag}`);
    }

    if (!emitir ){ 
        console.log("entro aquiiiiiiiiiiii");
        bot.postMessageToChannel('general', 'Saludos te puedo Responder las Capitales y las Peliculas.Con el Siguiente comando Capital pais o el Comando movie nombre de la Pelicula :smile::+1:')
        var emitir = false
}

});
// ejemplo de paises
// https://restcountries.eu/rest/v2/name/venezuela
// ejemplo de peticion
// http://www.omdbapi.com/?t=superman/&?i=tt3896198&apikey=b71ef170