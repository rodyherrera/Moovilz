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
import './BinaryColorTitle.css'

const BinaryColorTitle = ({ RightTitle, LeftTitle, ...ContainerProps }) => {
    return (
        <div {...ContainerProps} id='Binary-Color-Title-Container'>
            <Fade bottom duration={500} delay={150}>
                <h3 id='Binary-Color-Title-Left'>{LeftTitle}</h3>
            </Fade>
            <Fade clear duration={500} delay={300}>
                <h3 id='Binary-Color-Title-Right'>{RightTitle}</h3>
            </Fade>
        </div>
    );
};

export default BinaryColorTitle;