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
import Fade from 'react-reveal/Fade'

const KnowledgeComponent = () => {

    return (
        <React.Fragment>
            <div id='Knowledge-City-List-Header'>
                <Fade clear duration={500} delay={150}>
                    <h3 className='Knowledge-Header-Title'>Es hora de <br /><span className='Knowledge-Header-Title-Highlighted'>seleccionar</span> tu ciudad.</h3>
                </Fade>
            </div>
            <Fade clear duration={500} delay={300}>
                <p className='Knowledge-Header-Subtitle'>Descubre tu país utilizando el transporte público. Elige tu ciudad y obten instrucciones para los destinos mas populares y calles principales. Encuentra horarios, revisa mapas de las lineas  locales, entre otras cosas.</p>
            </Fade>
        </React.Fragment>
    );
};

export default KnowledgeComponent;