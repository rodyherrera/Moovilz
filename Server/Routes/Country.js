/***
 * Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root
 * for full license information.
 *
 * =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
 *
 * The Moovilz Source Code.
 * 
 * For related information - https://github.com/rodyherrera/Moovilz/
 * 
 * :: https://moovilz.rodyherrera.com/
 * :: https://moovilz-backend.rodyherrera.com/
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
****/

const Express = require('express');
const Router = Express.Router();
const CountryController = require('../Controllers/Country');

Router.get('/', CountryController.GetDocuments);

// <-- AUTH MIDDLEWARE -->
Router.post('/', CountryController.CreateDocument);
Router.route('/:Identifier/')
    .get(CountryController.GetDocument)
    .delete(CountryController.DeleteDocument)
    .patch(CountryController.UpdateDocument);

module.exports = Router;