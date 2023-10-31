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
import { Skeleton } from '@mui/material';
import Fade from 'react-reveal/Fade';
import './RectangularSkeleton.css';

const RectangularSkeleton = ({ Length = 10, ContainerProps, Width = '100%', Height = 85 }) => {

    return (
        <div className='Rectangular-Skeleton-Container' {...ContainerProps}>
            {Array.from(Array(Length).keys()).map((Index) => (
                <Fade bottom key={Index} duration={1000} delay={Index * 100}>
                    <Skeleton 
                        key={Index} 
                        variant='rectangular' 
                        width={Width} 
                        height={Height} />
                </Fade>
            ))}
        </div>
    );
};

export default RectangularSkeleton;