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
import './Feature.css';

const Feature = ({ Icon, Title, Description, ...Properties }) => {

    return (
        <div className='Feature-Container' {...Properties}>
            <div className='Feature-Header-Container'>
                <i className='Feature-Header-Icon-Container'>
                    <Icon />    
                </i>
                <p className='Feature-Header-Title'>{Title}</p>
            </div>
            <div className='Feature-Content-Container'>
                <p className='Feature-Content'>{Description}</p>
            </div>
        </div>
    );
};

export default Feature;