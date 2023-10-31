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
import KnowledgeBodyImage from '@Assets/Images/AgencyList/Metallic-Globe.webp';
import Fade from 'react-reveal/Fade';

const KnowledgeBodyComponent = () => {

    return (
        <Fade clear duration={500} delay={350}>
            <div id='Knowledge-Body-Image-Container'>
                <img src={KnowledgeBodyImage} className='Knowledge-Body-Image' />
            </div>
            <div id='Knowledge-Body-Image-Linear-Background' />
        </Fade>
    );
};

export default KnowledgeBodyComponent;