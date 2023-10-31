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
const LineScheduleController = require('../Controllers/LineSchedule');

Router.get('/', LineScheduleController.GetDocuments);

// <-- AUTH MIDDLEWARE -->
Router.post('/', LineScheduleController.CreateDocument);
Router.route('/:Identifier/')
    .get(LineScheduleController.GetDocument)
    .delete(LineScheduleController.DeleteDocument)
    .patch(LineScheduleController.UpdateDocument);

module.exports = Router;