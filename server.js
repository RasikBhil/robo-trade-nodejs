import express from 'express';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const app = express();
app.use(express.urlencoded({extended:false}))
app.use(express.json())
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('./swagger.json');
import instrumentController from './src/controllers/instruments/index.js'

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
app.use('/instruments', instrumentController)
app.get('/',(req, res) => {
    res.send({status:200, message:'working'})
})

const server = app.listen(process.env.PORT || 3030, () => {
    console.log('Server listning on port', 3030)
})
