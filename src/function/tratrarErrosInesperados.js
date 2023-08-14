const S = require('string');

function tratarErrosInesperados(res, err) {
    if(String(err).includes(`ValidationError:`)){
        return res.status(400).json({
            status: "Error",
            statusMenssagem: S(String(err).replace("ValidationError: ", "")).replaceAll(':', '').s,
            resposta: String(err)
        })
    }

    if(String(err).includes(`Error:`)){
        return res.status(400).json({
            status: "Error",
            statusMenssagem:String(err).replace("Error: ",""),
            resposta: String(err)
        });
    }

    console.error(err);
    return res.status(500).json({
        status: "Error",
        statusMenssagem: "Houve um problema inesperado, tente novamente mais tarde",
        resposta: String(err)
    });
}

module.exports = tratarErrosInesperados;