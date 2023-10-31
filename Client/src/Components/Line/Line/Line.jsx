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
import { RiBusFill } from 'react-icons/ri';
import './Line.css';

const Line = ({ Data, ContainerProps }) => {
    return (
        <div className='Line-Container' {...ContainerProps}>
            <div className='Line-Information-Container'>
                <div className='Line-Title-Container'>
                    <i className='Line-Title-Icon-Container'>
                        <RiBusFill />
                    </i>
                    <span className='Line-Header-Title'>{Data?.Line ? 'Línea ' + Data.Line : Data.Name}</span>
                </div>
                <div className='Line-Details-Container'>
                    <small className='Line-Details'>{Data.Agency.Name} • {Data.Stops.length} paradas.</small>
                </div>
            </div>
            <div className='Line-Icon-Container'>
                <GoArrowRight />
            </div>
        </div>
    );
};

export default Line;