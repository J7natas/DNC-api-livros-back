const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const  cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerOption = { customCssUrl: '/swagger-ui.css' }

const routes = require('./src/routes');
const autDocProduction = require('./src/midllewares/autDoch');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if(process.env.NODE_ENV !== 'test'){
    const swaggerFile = require('./swagger/swagger_output.json');
    app.get('/', (req, res) => {/* swagger.ignore = true */ res.redirect('/doc'); })
    app.use('/doc', autDocProduction, swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerOption));
}

routes(app);

if(process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}


module.exports = app;