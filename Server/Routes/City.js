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
const CityController = require('../Controllers/City');

Router.get('/', CityController.GetDocuments);

// <-- AUTH MIDDLEWARE -->
Router.post('/', CityController.CreateDocument);
Router.route('/:Identifier/')
    .get(CityController.GetDocument)
    .delete(CityController.DeleteDocument)
    .patch(CityController.UpdateDocument);

module.exports = Router;