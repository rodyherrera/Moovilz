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
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UseWindowSize from '@Hooks/UseWindowSize';
import OutlinedArrowedButton from '@Components/General/OutlinedArrowedButton';
import Fade from 'react-reveal/Fade';

const KnowledgeComponent = () => {
    const Navigate = useNavigate();
    const SelectedCity = useSelector((State) => State.City.SelectedCity);
    const { Width } = UseWindowSize();
    const { CountrySlug } = useParams();

    return (
        <React.Fragment>
            <article id='Knowledge-Header-Container'>
                <Fade clear duration={500} delay={150}>
                    <OutlinedArrowedButton 
                        OnClick={() => Navigate(`/workspace/country/${CountrySlug}/module/cities/`, { replace: true })}
                        Title={SelectedCity.Name} />
                </Fade>
                <div id='Knowledge-Header-Subtitle-Container'>
                    <h3 className='Knowledge-Header-Title'>
                        <Fade clear duration={500} delay={250}>
                            <span>Seleccione una línea </span>
                        </Fade>
                        <Fade clear duration={500} delay={350}>
                            <span id='Knowledge-Header-Title-HL'>
                                <span>de </span>
                                {(Width <= 768) ? (
                                    <React.Fragment>
                                        <span className='Knowledge-Header-Title-Highlighted'>transporte</span>
                                        <span className='Knowledge-Header-Title-Highlighted'>público</span>
                                    </React.Fragment>
                                ) : (
                                    <span className='Knowledge-Header-Title-Highlighted'>transporte público</span>
                                )}
                            </span>
                        </Fade>
                    </h3>
                </div>
            </article>
        </React.Fragment>
    );
};

export default KnowledgeComponent;