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

const { v4 } = require('uuid');

exports.Slugify = (StringToSlugify) => StringToSlugify.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + v4().slice(0, 8);

exports.CheckIfSlugOrID = (Identifier) => {
    if(Identifier.length === 24)
        return { _id: Identifier };
    return { Slug: Identifier };
};

exports.RuntimeError = class extends Error{
    constructor(Message, StatusCode){
        super(Message);
        this.StatusCode = StatusCode;
        this.Status = `${StatusCode}`.startsWith(4) ? 'Client Error' : 'Server Error';
        this.IsOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
};

exports.FilterObject = (ObjectToOperate, ...Fields) => {
    let FilteredObject = {};
    Object.keys((ObjectToOperate)).forEach((Key) => (
        Fields.includes(Key)) && (FilteredObject[Key] = ObjectToOperate[Key]));
    return FilteredObject;
};

exports.CatchAsync = (AsyncFunction) => (Request, Response, Next, ...Arguments) =>
    AsyncFunction(Request, Response, Next, ...Arguments).catch(Next);