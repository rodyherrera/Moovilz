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
import { GoLinkExternal } from 'react-icons/go';
import './FooterNavegationItem.css';

const FooterNavegationItem = ({ Title }) => {
    return (
        <li className='Footer-Navigation-Item-Container'>
            <i className='Footer-Navigation-Item-Icon'>
                <GoLinkExternal />
            </i>
            <span className='Footer-Navigation-Item-Title'>{Title}</span>
        </li>
    );
};

export default FooterNavegationItem;