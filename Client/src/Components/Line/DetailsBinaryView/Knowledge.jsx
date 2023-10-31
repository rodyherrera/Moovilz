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
import { RiCodeView } from 'react-icons/ri';
import UseWindowSize from '@Hooks/UseWindowSize';
import OutlinedArrowedButton from '@Components/General/OutlinedArrowedButton';
import Button from '@Components/General/Button';
import Fade from 'react-reveal/Fade';

const KnowledgeComponent = () => {
    const Navigate = useNavigate();
    const SelectedLine = useSelector((State) => State.Line.SelectedLine);
    const SelectedCity = useSelector((State) => State.City.SelectedCity);
    const { CitySlug, CountrySlug } = useParams();
    const { Width } = UseWindowSize();
    
    return (
        <React.Fragment>
            <div id='Line-Details-Knowledge-Top-Container'>
                <Fade clear duration={500} delay={150}>
                    <OutlinedArrowedButton 
                        IsLoading={!SelectedLine?.Name}
                        OnClick={() => Navigate(`/workspace/country/${CountrySlug}/module/city/${CitySlug}/lines/`, { replace: true })}
                        Title={(SelectedLine?.Name) ? ('Línea ' + SelectedLine.Name) : ('Línea (Cargando...)')} />
                </Fade>
                <Fade clear duration={500} delay={250}>
                    <Button
                        Icon={RiCodeView}
                        Title={(!SelectedCity?.Name) ? ('Ciudad (Cargando...)') : (SelectedCity.Name)}
                        ButtonProps={{ 
                            id: 'Line-Details-Knowledge-City',
                            className: 'Icon-Start',
                            onClick: () => Navigate(`/workspace/country/${CountrySlug}/module/cities/`, { replace: true })
                        }} />
                </Fade>
            </div>
            <div id='Line-Details-Header-Container'>
                <h3 className='Knowledge-Header-Title'>
                    <Fade clear duration={500} delay={350}>
                        <span>Información sobre</span>
                    </Fade>
                    <Fade clear duration={500} delay={450}>
                        <span id='Line-Details-HL-Title'>
                            <span>la </span>
                            {(Width <= 768) ? (
                                <React.Fragment>
                                    <span className='Knowledge-Header-Title-Highlighted'>línea</span>
                                    <span className='Knowledge-Header-Title-Highlighted'>seleccionada.</span>
                                </React.Fragment>
                            ) : (
                                <span className='Knowledge-Header-Title-Highlighted'>línea seleccionada.</span>
                            )}
                        </span>
                    </Fade>
                </h3>
            </div>
        </React.Fragment>
    );
};

export default KnowledgeComponent;