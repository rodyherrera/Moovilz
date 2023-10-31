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

const Mongoose = require('mongoose');
const { CatchAsync } = require('../Utilities/Runtime');

exports.Health = CatchAsync(async (Request, Response) => {
    const IsDatabaseConnected = Mongoose.connection.readyState === 1;
    Response.status(200).json({
        Status: 'Success',
        Data: {
            Server: 'Core::Server::Health::OK',
            Database: (IsDatabaseConnected ? 'Core::Database::Health::OK' : 'Core::Database::Health::Failed')
        }
    });
});