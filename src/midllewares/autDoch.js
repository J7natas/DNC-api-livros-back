async function autDocProduction(req, res, next) {
    const { senha } = req.body;

    if(req.headers.host.includes("localhost") || req.originalUrl !== '/doc/'){
        return next();
    }

    if(senha === process.env.SENHA_DOC){
        return next();
    }

    if(senha){
        res.status(401).set('Content-Type', 'text/html');
        res.send(Buffer.from(`
            <form method="post">
                <p style="color:red;">Senha errada</p>
                <label for="senha">Senha da documentação</label>
                <input type="password" name="senha" id="senha" />
                <button type="submit">Entrar</button>
            </form>
        `))
    }else{
        res.status(200).set('Content-Type', 'text/html');
        res.send(Buffer.from(`
            <form method="POST">
                <label for="senha">Senha da documentação</label>
                <input type="password" name="senha" id="senha" />
                <button type="submit">Entrar</button>
            </form>
        `))
    }
}

module.exports = autDocProduction;