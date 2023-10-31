/***
 * Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root
 * for full license information.
 *
 * =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
 *
 * The Moovilz Source Code.
 * 
 * For related information - https://github.com/CodeWithRodi/Moovilz/
 * 
 * :: https://moovilz.codewithrodi.com/
 * :: https://moovilz-backend.codewithrodi.com/
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
****/

(require('dotenv')).config({ path: './.env' });
const Express = require('express');
const Helmet = require('helmet');
const XSS = require('xss-clean');
const Compression = require('compression');
const MongoSanitize = require('express-mongo-sanitize');
const Mongoose = require('mongoose');
const HPP = require('hpp');
const Cors = require('cors');
const BootHelper = require('./Utilities/BootHelper');

process.on('uncaughtException', (UncaughtServerError) => {
    console.error(UncaughtServerError);
    process.exit(1);
});

const GlobalErrorHandler = require('./Controllers/Error');
const Application = Express();
const Port = process.env.SERVER_PORT || 8000;
const Hostname = process.env.SERVER_HOST = '0.0.0.0';
const Database = process.env.DATABASE_HOST.replace('<password>', process.env.DATABASE_PASSWORD);

BootHelper.StandarizedBindingToApplication({
    Application,
    Suffix: '/api/v1/',
    Routes: [
        'Agency',
        'City',
        'LineSchedule',
        'LineStop',
        'Server',
        'Country',
        'Line'
    ],
    Middlewares: [
        Helmet,
        [Cors, [ { origin: process.env.CORS_ORIGIN } ]],
        [Express.json, [ { limit: process.env.BODY_MAX_SIZE || '10kb' } ]],
        Compression,
        HPP,
        XSS,
        MongoSanitize
    ],
    Settings: {
        Deactivated: [
            'x-powered-by'
        ]
    }
});

Application.all('*', (Request, Response) => {
    if(Request.path.startsWith('/api/v1/')){
        return Response.status(404).json({
            Status: 'Error',
            Data: {
                Message: 'INVALID_API_REQUEST',
                URL: Request.originalUrl
            }
        })
    }
    Response.redirect(process.env.CLIENT_HOST);
});

Application.use(GlobalErrorHandler);
const WebServer = BootHelper.GetConfiguredHTTPServerInstance(Application);

WebServer.listen(Port, Hostname, async () => {
    try{
        Mongoose.set('strictQuery', false);
        Mongoose.set('strictPopulate', false);
        await Mongoose.connect(Database, { authSource: "admin",
            useNewUrlParser: true,
            useUnifiedTopology: true, });
        console.log('[Moovilz]: Connected to the Mongo Database.');
    }catch(ConnectionError){
        console.error('[Moovilz]: An error has been ocurred in the MongoDB connection.\n', ConnectionError)
    }
    console.log(`[Moovilz]: The server was started successfully in the network address (${Hostname}:${Port}).`);
});

process.on('unhandledRejection', (UnhandledServerError) => {
    console.warn(UnhandledServerError);
    console.log('[Moovilz]: The server is shutting down...');
    WebServer.close(() => {
        console.log('[Moovilz]: The server was successfully shutted down.');
        process.exit(0);
    });
});