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

const Agency = require('../Models/Agency');
const HandlerFactory = new (require('./HandlerFactory'))({
    Model: Agency,
    Fields: [
        'Name',
        'Lines'
    ]
});

exports.GetDocuments = HandlerFactory.GetAll();
exports.GetDocument = HandlerFactory.GetOne();
exports.DeleteDocument = HandlerFactory.DeleteOne();
exports.CreateDocument = HandlerFactory.CreateOne();
exports.UpdateDocument = HandlerFactory.UpdateOne();