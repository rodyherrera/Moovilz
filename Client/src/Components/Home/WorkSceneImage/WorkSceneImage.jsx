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
import HomeWorkScene from '@Assets/Images/Home/Work-Scene.webp';
import './WorkSceneImage.css';

const WorkSceneImage = ({ ContainerProps }) => {
    return (
        <div {...ContainerProps}>
            <Fade clear duration={500} delay={150}>
                <img src={HomeWorkScene} alt='Escena, individuo trabajando en su computadora.' id='Home-Work-Scene' />
            </Fade>
            <div id='Room-Relaxing-Overlay'>
                <Fade clear duration={500} delay={250}>
                    <div id='Room-Relaxing-Overlay-Content'>
                        <p id='Room-Relaxing-Overlay-Title'>Te conectamos con la información global del transporte público. Facilitamos tu movilidad, sin importar en que rincon del planeta te encuentres.</p>
                    </div>
                </Fade>
            </div>
        </div>
    );
};

export default WorkSceneImage;