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
import { GoArrowRight } from 'react-icons/go';
import { FormatBigNumber } from '@Utilities/Algorithms';
import './City.css';

const City = ({ Data, OnClick, ...Properties }) => {
    return (
        <div className='City-Container' onClick={() => OnClick?.(Data)} {...Properties}>
            <div className='City-Title-Container'>
                <span className='City-Header-Title'>{Data.Name}</span>
                <small className='City-Details-Container'>
                    <span>{Data?.Lines?.length} lineas</span>
                    <span>{Data?.Agencies?.length} empresas </span>
                    <span>{FormatBigNumber(Data?.Stops?.length)} paradas</span>
                </small>
            </div>
            <i className='City-Icon-Container'>
                <GoArrowRight />
            </i>
        </div>
    );
};

export default City;