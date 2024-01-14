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

import { StandardizedAPIRequestBuilder } from '@Utilities/Runtime';
export const CityAPI = new StandardizedAPIRequestBuilder({ Endpoint: '/city' });

export const GetCities = CityAPI.Register({ Path: '/' });
export const GetCity = CityAPI.Register({ Path: '/:Identifier/' });
export const CreateCity = CityAPI.Register({ Path: '/', Method: 'POST' });