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
export const ServerAPI = new StandardizedAPIRequestBuilder({ Endpoint: '/server' });

const CoreLocalStorageId = 'Moovilz::Core';

export const GetCoreLocalStorage = () => {
    const CoreData = JSON.parse(localStorage.getItem(CoreLocalStorageId));
    if(CoreData){
        return CoreData;
    }
    return {};
};

export const SetCoreLocalStorage = (Data) => {
    const CoreData = GetCoreLocalStorage();
    const NewCoreData = Object.assign(CoreData, Data);
    localStorage.setItem(CoreLocalStorageId, JSON.stringify(NewCoreData));
}

export const Health = ServerAPI.Register({ Path: '/health' });