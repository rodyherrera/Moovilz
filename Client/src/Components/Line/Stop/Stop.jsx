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
import Fade from 'react-reveal/Fade';
import './Stop.css';

const Stop = ({ Data, Delay, ...ContainerProps }) => {
    return (
        <Fade clear duration={500} delay={Delay}>
            <div {...ContainerProps} className='Stop-Container'>
                <div className='Stop-Order-Container'>
                    <span className='Stop-Order'>{Data.Order + 1}</span>
                </div>
                <div className='Stop-Header-Container'>
                    <span className='Stop-Header-Title'>{Data.Name}</span>
                    <div className='Stop-Detail-Container'>
                        <small className='Stop-Detail'>Coordenadas</small>
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default Stop;