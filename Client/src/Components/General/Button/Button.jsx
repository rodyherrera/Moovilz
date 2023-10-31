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

import React from 'react';
import { CircularProgress } from '@mui/material';
import './Button.css';

const Button = ({ Title, IsLoading, Icon = undefined, ...Props }) => (
    <button {...Props?.ButtonProps} className={'Button'.concat(' ' + Props?.ButtonProps?.className || '')}>
        <span className='Button-Text' {...Props?.TitlepProps}>{Title}</span>
        {(Icon !== undefined || IsLoading) && (  
            <i className='Button-Icon' {...Props?.IconProps}>
                {(IsLoading) ? (
                    <CircularProgress />
                ) : (
                    <Icon />
                )}
            </i>
        )}
    </button>  
);

export default Button;