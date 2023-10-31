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

const Express = require('express');
const Router = Express.Router();
const LineStopController = require('../Controllers/LineStop');

Router.get('/', LineStopController.GetDocuments);

// <-- AUTH MIDDLEWARE -->
Router.post('/', LineStopController.CreateDocument);
Router.route('/:Identifier/')
    .get(LineStopController.GetDocument)
    .delete(LineStopController.DeleteDocument)
    .patch(LineStopController.UpdateDocument);

module.exports = Router;