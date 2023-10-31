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
const LineController = require('../Controllers/Line');

Router.get('/', LineController.GetDocuments);

// <-- AUTH MIDDLEWARE -->
Router.post('/', LineController.CreateDocument);
Router.route('/:Identifier/')
    .get(LineController.GetDocument)
    .delete(LineController.DeleteDocument)
    .patch(LineController.UpdateDocument);

module.exports = Router;