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

import React, { useEffect, useRef } from 'react';
import { FiServer } from 'react-icons/fi';
import { BsCode, BsMagic } from 'react-icons/bs';
import { CiFlag1 } from 'react-icons/ci';
import Feature from '@Components/General/Feature';
import ChildrenHoverWrapper from '@Components/General/ChildrenHoverWrapper';
import WheelScrollableAxisX from '@Components/General/WheelScrollableAxisX';
import UseScrollX from '@Hooks/UseScrollX';
import Fade from 'react-reveal/Fade';
import './Features.css';

const Features = () => {
    const FeaturesContainerReference = useRef(null);
    const { AvailableScrollX } = UseScrollX(FeaturesContainerReference);

    useEffect(() => {
        const FeatureOpacityNode = document.querySelector('#Feature-Gradient-Container');
        if(!FeatureOpacityNode)
            return;
        FeatureOpacityNode.style.width = `${AvailableScrollX}px`;
    }, [AvailableScrollX]);

    return (
        <Fade clear duration={500} delay={500}>
            <WheelScrollableAxisX ref={FeaturesContainerReference}>
                <ChildrenHoverWrapper 
                    ref={FeaturesContainerReference}
                    id='Features-Container' 
                    CSSClassHandler='Feature-Container-Opacity'
                >
                    {[
                        [CiFlag1, 'Imaginar a hacer',  'Como consecuencia de una iniciativa educativa con la mirada puesta en las personas del todo el mundo, impulsamos en el empoderamiento de las grandes ciudades para incrementar la calidad de vida eliminando limitaciones y barreras en la movilidad urbana. La movilidad es un derecho humano basico de todos, pues abre infinitas oportunidades e igualdad de posinilidades, sin importar donde naciste o donde vivas.'],
                        [BsMagic, 'Nada es mágico', 'Velamos por la secillez de nuestros servicios con tal de convertir una visita a la plataforma en una experiencia de usuario unica por medio de tecnologia moderna. Nuestro volumen de documentos han sido producto de una exhaustivo mapeo del transporte publico, el cual fue llevado a cabo utilizando Web Scraping a la par de OpenStreetMap y Geofabrik. La colección de documentos en su totalidad se encuentran almacenados bajo MongoDB, hospedado en Düsseldorf, Alemania.'],
                        [FiServer, 'Software robusto', 'Nuestros servidores almacenan grandes volumenes de información, aludiendo a una base de datos con millones de documentos relacionados entre si. Puedes acceder a los registros de nuestro servicio de forma gratuita.'],
                        [BsCode, 'Open Source', 'Todo el nucleo de Moovilz es de codigo abierto. Cualquiera puede configurar su propio servidor localmente o en la nube. Además de poder constribuir con mejoras en la tecnologia empleada o bien enriquecer la experiencia de usuario obtenida dentro la plataforma.'],
                    ].map(([ Icon, Title, Description ], Index) => (
                        <Feature 
                            Icon={Icon} 
                            Title={Title} 
                            Description={Description} 
                            key={Index}
                            id={'Feature-Container-' + Index} />
                    ))}
                </ChildrenHoverWrapper>
            </WheelScrollableAxisX>
        </Fade>
    );
};

export default Features;