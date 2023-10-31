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
const AgencyController = require('../Controllers/Agency');

Router.get('/', AgencyController.GetDocuments);

// <-- AUTH MIDDLEWARE -->
Router.post('/', AgencyController.CreateDocument);
Router.route('/:Identifier/')
    .get(AgencyController.GetDocument)
    .delete(AgencyController.DeleteDocument)
    .patch(AgencyController.UpdateDocument);

module.exports = Router;