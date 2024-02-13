import express from 'express';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

import { createServer } from 'https';
import WebSocket, { WebSocketServer } from 'ws';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('./swagger.json');
import instrumentController from './src/controllers/instruments/index.js'
import websocketController from './src/controllers/webSocket/index.js'


const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', function (ws) {
    const id = setInterval(function () {
        ws.send(JSON.stringify(process.memoryUsage()), function () {
            console.log('started client');
            //
            // Ignore errors.
            //
        });
    }, 100);
    console.log('started client');

    ws.on('error', console.error);

    ws.on('close', function () {
        console.log('stopping client interval');
        clearInterval(id);
    });
});


server.listen(3030, () => {
    console.log('Listening on http://localhost:3030');
});


// app.use('/websocket',
//     (req, res) => {
//         setTimeout(function timeout() {

//             ws.send(Date.now());
//         }, 500)
//     }
// )

// app.use(
//     '/api-docs',
//     swaggerUi.serve,
//     swaggerUi.setup(swaggerDocument)
// );
// app.use('/instruments', instrumentController)

// // app.use('/websocket', websocketController)

// app.get('/', (req, res) => {
//     res.send({ status: 200, message: 'working' })
// })


// const serverssss = app.listen(process.env.PORT || 3030, () => {
//     console.log('Server listning on port http://localhost:3030/')
// })
