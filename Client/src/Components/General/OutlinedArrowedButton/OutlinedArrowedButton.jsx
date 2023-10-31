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
import { GoArrowLeft } from 'react-icons/go';
import { CircularProgress } from '@mui/material';
import './OutlinedArrowedButton.css';

const OutlinedArrowedButton = ({ Title, OnClick, IsLoading = false }) => {
    return (
        <div className='Outlined-Arrowed-Button-Container' onClick={OnClick}>
            <i className='Outlined-Arrowed-Button-Icon-Container'>
                {(IsLoading) ? (<CircularProgress />) : (<GoArrowLeft />)}
            </i>
            <h3 className='Outlined-Arrowed-Button-Title'>{Title}</h3>
        </div>
    );
};

export default OutlinedArrowedButton;