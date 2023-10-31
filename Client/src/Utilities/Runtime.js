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

import Axios from 'axios';
import * as UserGeo from '@zma-lab/user-geolocation';

export const SetDocumentTitle = (Title) => {
    document.title = ((Title?.length) ? (Title + ' | ') : ('')) + 'Moovilz - Simplificando la movilidad urbana';
};

export const GetCountry = () => {
    return UserGeo.getFullLocation();
};

export const GetNameFromSlug = (Slug) => {
    return Slug.split('-')[0].toLowerCase();
};

export class ServerRequestBuilder{
    constructor({ SetError }){
        this.SetError = SetError;
    };

    Register = ({ 
        Callback = undefined, 
        Arguments = undefined
    }) => new Promise(async (Resolve, Reject) => {
        try{
            const Response = (await Callback(...(Arguments || [])));
            Resolve(Response?.data || Response);
        }catch(Rejection){
            (this.SetError) && 
                (this.SetError(Rejection?.response?.data));
            Reject(Rejection?.response?.data);
        }
    });
};

export class StandardizedAPIRequestBuilder{
    constructor({ Endpoint }){
        this.Endpoint = Endpoint;
        this.SetError = () => {};
    };

    BindErrorSetter = (Setter) => this.SetError = Setter;

    Register = ({ Path, Method = 'GET' }) => {
        const Buffer = { Arguments: [], Method: Method.toLowerCase() };
        return ({ 
            Body,
            Query = {
                Params: undefined,
                Fields: undefined,
                Sort: undefined,
                Search: undefined,
                Paginate: undefined,
                Populate: undefined,
                Filter: undefined
            } 
        }) => {
            let QueryParams = '';
            let ParsedPath = Path;
            if(Query.Params){
                const Parts = ParsedPath.split('/');
                let Buffer = '/';
                for(let Index = 0; Index < Parts.length; Index++){
                    if(Parts[Index].startsWith(':')){
                        Buffer += Query.Params.shift();
                    }else{
                        Buffer += Parts[Index];
                    }
                }
                ParsedPath = Buffer;
            }
            const AppendParameter = (Identifier, Value) => {
                (QueryParams +=  ((!QueryParams) ? (`?`) : ('&')) + `${Identifier}=${Value}`);
            };
            (Query?.Sort) && (AppendParameter('Sort', Query.Sort.join(',')));
            (Query?.Fields) && (AppendParameter('Fields', Query.Fields.join(',')));
            (Query?.Paginate?.Limit) && (AppendParameter('Limit', Query.Paginate.Limit));
            (Query?.Paginate?.Page) && (AppendParameter('Page', Query.Paginate.Page));
            (Query?.Populate) && (AppendParameter('Populate', (typeof Query.Populate === 'object') ? (JSON.stringify(Query.Populate)) : (Query.Populate)));
            if(Query?.Filter){
                const Keys = Object.keys(Query.Filter);
                Keys.forEach((Key) => AppendParameter(Key, Query.Filter[Key]));
            }
            if(Buffer.Method === 'get' && Body){
                const Keys = Object.keys(Body);
                Keys.forEach((Key) => AppendParameter(Key, Body[Key]));
            }
            const Endpoint = `${import.meta.env.VITE_SERVER + import.meta.env.VITE_API_SUFFIX + this.Endpoint}${ParsedPath}`.concat(QueryParams);
            Buffer.Arguments = [Endpoint]
            if(['post', 'put', 'patch'].includes(Buffer.Method))
                Buffer.Arguments.push(Body);
            return new ServerRequestBuilder({ SetError: this.SetError }).Register({
                Callback: Axios[Buffer.Method],
                Arguments: Buffer.Arguments
            });
        };
    };
};