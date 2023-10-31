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

const ReportError = (ErrorRaised, Response) => {
    if(process.env.NODE_ENV === 'development' && !ErrorRaised.IsOperational)
        Response.status(ErrorRaised.StatusCode).json({
            Status: ErrorRaised.Status,
            Message: ErrorRaised.message,
            Stack: ErrorRaised.stack,
            Error: ErrorRaised
        });
    else if(ErrorRaised.IsOperational){
        Response.status(500).json({
            Status: ErrorRaised.Status,
            Message: ErrorRaised.message,
            ...(process.env.NODE_ENV === 'development') && ({ Exception: ErrorRaised.Exception })
        });
    }else{
        Response.status(500).json({
            Status: 'Server Error',
            Message: 'Internal Server Error'
        });
    }
};

module.exports = (RaisedError, _, Response, __) => {
    console.log(RaisedError);
    RaisedError.StatusCode = RaisedError.StatusCode || 500;
    RaisedError.Status = RaisedError.Status || 'Server Error';
    ReportError(RaisedError, Response);
}