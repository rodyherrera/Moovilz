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

const HTTPS = require('https');
const HTTP = require('http');
const FileSystem = require('fs');
const { CapitalizeToLowerCaseWithDelimitier } = require('./Algorithms');

// ! The function takes an object with five properties: 
// ! -> Application, Routes, Suffix, Middlewares, and Settings. 
// * Application is the Express application instance.
// * Routes is an array of route names.
// * Suffix is a string to be added to the beginning of each route name.
// * Middlewares is an array of middleware functions.
// * Settings is an object with a Deactivated property that is an array of settings to be deactivated. 
// ! The function first applies each middleware function to the application instance using 
// ! the use method. It then binds each route to its respective controller using the use
// ! method and the require function to import the controller module. Finally, it
// ! deactivates any settings specified in the Deactivated property using the disabled method.
exports.StandarizedBindingToApplication = ({ Application, Routes, Suffix, Middlewares, Settings }) => {
    (Middlewares).forEach((Middleware) => (
        Application.use(...[((Array.isArray(Middleware)) 
            ? ((typeof Middleware[0] === 'string') ? (Middleware[0], Middleware[1]) 
            : (Middleware[0](Middleware[1])))
            : (Middleware()))])
    ));
    // ! Bind all routes to their respective controllers
    (Routes).forEach((Route) => {
        Application.use(Suffix + CapitalizeToLowerCaseWithDelimitier(Route), require(`../Routes/${Route}`));
    });
    // ! Disable all deactivated settings
    (Settings.Deactivated).forEach((DeactivatedSetting) => Application.disabled(DeactivatedSetting));
}

// ! Function takes an Express application instance and returns an HTTP or HTTPS server 
// ! instance depending on whether SSL certificates are set. It first sets the maximum number of 
// ! sockets to infinity to allow for infinite connections. It then checks if SSL 
// ! certificates are set by looking for the SSL_CERT and SSL_KEY environment variables. If 
// ! SSL certificates are set, it creates an HTTPS server instance using the createServer
// ! method of the https module and the readFileSync method of the fs module to read the 
// ! SSL certificates. If SSL certificates are not set, it creates an HTTP server instance 
// ! using the createServer method of the http module.
exports.GetConfiguredHTTPServerInstance = (Application) => {
    // ! Allow for infinite connections
    HTTP.globalAgent.maxSockets = HTTP.globalAgent.maxSockets = Infinity;
    // ! Check if the SSL certificates are set
    const SSL = [process.env.SSL_CERT, process.env.SSL_KEY];
    // ! If the SSL certificates are set, then use the HTTPS server
    return ((SSL[0]) ? (HTTPS.createServer) : (HTTP.createServer))({
        key: (SSL[0]) ? (FileSystem.readFileSync(SSL[0])) : (undefined),
        cert: (SSL[1]) ? (FileSystem.readFileSync(SSL[1])) : (undefined)
    }, Application);
};