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

import React, { useContext } from 'react';
import { CoreContext } from '@Services/Core/Context';
import './Snackbar.css';

const Snackbar = () => {
    const { GetSnackbar, SetSnackbar } = useContext(CoreContext)

    return (Object.keys(GetSnackbar).length >= 1) && (
        <aside className='Snackbar-Container'>
            <div className='Snackbar-Content-Container'>
                <div className='Snackbar-Title-Container'>
                    <p className='Snackbar-Title'>{GetSnackbar.Title}</p>
                </div>
                <div className='Snackbar-Close-Title-Container' onClick={() => SetSnackbar({})}>
                    <p className='Snackbar-Close-Title'>Cerrar</p>
                </div>
            </div>
        </aside>
    );
};

export default Snackbar;