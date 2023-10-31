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

import React, { useEffect } from 'react';
import { BiSolidRightArrowAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SetDocumentTitle } from '@Utilities/Runtime';
import UseWindowSize from '@Hooks/UseWindowSize';
import Features from '@Components/Home/Features';
import Button from '@Components/General/Button';
import WorkSceneImage from '@Components/Home/WorkSceneImage';
import Fade from 'react-reveal/Fade';
import './Home.css';

const HomePage = () => {
    const Navigate = useNavigate();
    const { Width } = UseWindowSize();
    const Country = useSelector((State) => State.Country.SelectedCountry);
    const IsCountryLoading = useSelector((State) => State.Country.IsLoading);

    useEffect(() => {
        SetDocumentTitle();
    }, []);

    return (
        <main id='Home-Main'>
            <section id='Brand-Container'>
                <article id='Left-Container'>
                    <Fade top duration={1000}>
                        <p id='Brand-Purpose-Title'>Mapeamos por ti, la esencia de la movilidad urbana mundial.</p>
                    </Fade>
                    <h3 id='Brand-Title'>
                        <Fade top duration={500} delay={200}>Descubre y</Fade>
                        <Fade clear duration={500} delay={400}>
                           <span id='Brand-Title-Highlight'>explora el mundo</span>
                        </Fade>
                        <br />
                        <Fade clear duration={500} delay={600}>
                            <span>como nunca antes.</span>
                        </Fade>
                    </h3>
                    {(Width <= 768) && <WorkSceneImage />}
                    <div id='Quick-Navigation-Container'>
                        <Fade clear duration={300} delay={700}>
                            <Button 
                                Title='Empezar' 
                                Icon={BiSolidRightArrowAlt} 
                                IsLoading={IsCountryLoading}
                                ButtonProps={{
                                    onClick: () => Navigate(`/workspace/country/${Country.Slug}/module/cities/`, { replace: true })
                                }} />
                        </Fade>
                        <Fade clear duration={300} delay={800}>
                            <p id='Button-Description'>Te conectamos con la información global del transporte público. Facilitamos tu movilidad, sin importar en que rincon del planeta te encuentres</p>
                        </Fade>
                    </div>
                    {(Width >= 768) && (
                        <div id='Features-Wrapper'>
                            <Features />
                            <aside id='Feature-Gradient-Container' />
                        </div>
                    )}
                </article>
                {(Width >= 768) && (
                    <WorkSceneImage ContainerProps={{ id: 'Right-Container' }} />
                )}
            </section>
            {(Width < 768) && (
                <section id='Mobile-Features-Container'>
                    <Features />
                </section>
            )}
        </main>
    );
};

export default HomePage;