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
import { SetDocumentTitle } from '@Utilities/Runtime';
import PoliciesCategory from '@Components/Policies/Category';
import Fade from 'react-reveal/Fade';
import './Policies.css';

const Policies = () => {
    useEffect(() => {
        SetDocumentTitle('Términos y Politicas');
    }, []);

    return (
        <main id='Policies-Main'>
            <section id='Policies-Header-Container'>
                <Fade top duration={700} delay={250}>
                    <h1 id='Policies-Header-Title'>Términos y políticas de uso</h1>
                </Fade>
                <Fade clear duration={700} delay={500}>
                    <p id='Policies-Header-Subtitle'>Politicas y terminos que acepta al utilizar nuestros servicios y consecuentemente cumplir con ellas.</p>
                </Fade>
                <article id='Policies-Header-Details'>
                    <Fade clear duration={700} delay={650}>
                        <h3 id='Policies-Header-Details-Title'>Utilizando nuestros servicios, nos confía su información.</h3>
                    </Fade>
                    <Fade clear duration={700} delay={750}>
                        <p id='Policies-Header-Details-Subtitle'>Entendemos que esto es una gran responsabilidad, y trabajamos duro para proteger su información y mantenerla en su control.</p>
                    </Fade>
                </article>
            </section>
            <Fade clear duration={700} delay={1000}>
                <section id='Policies-Categories-Container'>
                    {[
                        ['Privacidad', 'Garantizamos estrictamente la discreción de la información compartida dentro de la plataforma. Sin embargo, considere que en el momento donde hace ingreso a la plataforma, se capturan una diversidad de datos de carácter público proporcionados por el navegador web a través del cual visita la plataforma. Datos como su dirección, IP pública, su sistema opeartivo, país y entre otros son recolectados y registrados en nuestra base de datos con el fin de crear analíticas. Es importante que tenga en cuenta que, velamos seriamente por su privacidad y la importancia de esta. Mientras su estadía sea válida tu estancia en nuestra web, respetamos tus datos y tus búsquedas.'],
                        ['Stages', 'Nos entusiasma crear cosas nuevas, sin embargo, tenga en cuenta que la veracidad de la información puede no ser del todo exacta. Disponemos de un gran volumen de documentos alojados en nuestros servidores, de los que se necesita mucho más que una revisión exhaustiva de forma individual. Moovilz quiere contribuir contigo a formar un mundo mejor y más conectado, puedes contribuir en ediciones si lo deseas a las ubicaciones que han sido mapeadas y que ya están almacenadas en nuestra base de datos.'],
                        ['Detrás de los bytes', 'Bajo la misión de ayudar a las personas de todo el mundo a llegar a su destino de la manera mas sencilla posible, combinando todas las opciones posibles junto a una experiencia optima dentro de la aplicación.', 'Con más de 9 países mapeados, almacenamos millones de documentos en nuestros servidores para servirlos de forma gratuita, pues creamos tecnología para que personas de todo el mundo impacten su comunidad local.'],
                        ['Código Abierto', 'Todo el software de Moovilz está bajo la licencia MIT, lo que permite la reutilización del software para el aprendizaje y la construcción de proyectos mucho más ambiciosos desde la base inicial. Este servicio está abierto a colaboraciones de terceros, permitiendo nuevas integraciones, lo que a su vez, gracias a su código abierto, permite a desarrolladores externos conocer el funcionamiento de la plataforma e incluso encontrar vulnerabilidades y corregirlas.']
                    ].map(([ Title, ...Descriptions ], Index) => (
                        <PoliciesCategory Title={Title} Descriptions={Descriptions} key={Index} />
                    ))}
                </section>
            </Fade>
        </main>
    );
};

export default Policies;