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

import { StandardizedAPIRequestBuilder } from '@Utilities/Runtime';
export const CountryAPI = new StandardizedAPIRequestBuilder({ Endpoint: '/country' });

export const GetCountries = CountryAPI.Register({ Path: '/' });
export const GetCountry = CountryAPI.Register({ Path: '/:Identifier/' });
export const CreateCountry = CountryAPI.Register({ Path: '/', Method: 'POST' });