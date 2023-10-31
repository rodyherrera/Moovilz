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
import './MenuIcon.css';

const MenuIcon = ({ IsActive, ...Props }) => (
    <div id='Menu-Icon-Box'>
        <label className='Toggle'>
            <input
                readOnly={true}
                checked={IsActive} 
                type='checkbox' {...Props} />
            <div>
                <div>
                    <span></span>
                    <span></span>
                </div>
                <svg>
                    <use xlinkHref="#Path" />
                </svg>
                <svg>
                    <use xlinkHref="#Path" />
                </svg>
            </div>
        </label>
                
        <svg xmlns='http://www.w3.org/2000/svg' style={{ display: 'none' }}>
            <symbol xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 44' id='Path'>
                <path d='M22,22 L2,22 C2,11 11,2 22,2 C33,2 42,11 42,22'></path>
            </symbol>
        </svg>
    </div>
);

export default MenuIcon;