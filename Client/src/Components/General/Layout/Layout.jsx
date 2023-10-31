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

import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import BrandLogo from '@Components/General/BrandLogo';
import QRCodeButton from '@Components/General/QRCodeButton';
import RoundSquaredDesignToggle from '@Components/General/RoundSquaredDesignToggle';
import ServerHealth from '@Components/General/ServerHealth';
import NavigationItem from '@Components/General/NavigationItem';
import FooterNavegationItem from '@Components/General/FooterNavegationItem';
import DarkModeDesignToggle from '@Components/General/DarkModeDesignToggle';
import Snackbar from '@Components/General/Snackbar';
import CloudShellToggle from '@Components/General/CloudShellToggle';
import CloudShell from '@Components/General/CloudShell';
import UseWindowSize from '@Hooks/UseWindowSize';
import MenuIcon from '@Components/General/MenuIcon';
import MobileMenu from '@Components/General/MobileMenu';
import Fade from 'react-reveal/Fade';
import './Layout.css';

const Layout = () => {
    const [GetIsMenuActive, SetIsMenuActive] = useState(false);
    const Navigate = useNavigate('');
    const HeaderReference = useRef(null);
    const Location = useLocation();
    const { Width } = UseWindowSize();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [Location.pathname]);

    useEffect(() => {
        // ! Scroll blocked when menu is active
        const HTMLElement = document.getElementsByTagName('html')[0];
        if(GetIsMenuActive){
            HTMLElement.style.overflow = 'hidden';
            HTMLElement.style.overscrollBehavior = 'none';
        }else{
            HTMLElement.style.overflow = 'auto';
            HTMLElement.style.overscrollBehavior = 'auto';
        }
    }, [GetIsMenuActive]);

    useEffect(() => {
        if(!HeaderReference.current)
            return;
        const HeaderHeight = HeaderReference.current.clientHeight;
        const ScrollHandler = () => {
            const ScrollY = window.scrollY;
            if(ScrollY >= HeaderHeight){
                HeaderReference.current.classList.add('Header-Scrolled');
            }else{
                HeaderReference.current.classList.remove('Header-Scrolled');
            }
        };
        window.addEventListener('scroll', ScrollHandler);
        return () => {
            window.removeEventListener('scroll', ScrollHandler);
            SetIsMenuActive(false);
        };
    }, []);

    return (
        <React.Fragment>
            <CloudShell />
            <Snackbar />

            {(Width <= 768 && GetIsMenuActive) && (
                <MobileMenu 
                    SetState={SetIsMenuActive} 
                    GetState={GetIsMenuActive} />
            )}

            <header id='Header' ref={HeaderReference}>
                <section id='Brand-Container' onClick={() => Navigate('/', { replace: true })}>
                    <BrandLogo />
                    <h3 id='Brand-Container-Title'>Moovilz</h3>
                </section>
                <Fade clear>
                    <ul id='Navigation-Container'>
                        {[
                            ['DevTools'], 
                            ['Servicios'], 
                            ['Recursos'], 
                            ['Nosotros'], 
                            ['Terminos y Privacidad', '/workspace/policies/']
                        ].map(([ Item, Link ], Index) => (
                            <NavigationItem 
                                data-isdisabled={Link === undefined}
                                onClick={() => Navigate(Link, { replace: true })}
                                key={Index} 
                                Title={Item} />
                        ))}
                    </ul>
                </Fade>
                <ul id='Icon-Based-Navigation-Container'>
                    {[
                        [DarkModeDesignToggle], 
                        [RoundSquaredDesignToggle], 
                        [QRCodeButton], 
                        [CloudShellToggle, false],
                    ].map(([ Component, DisplayInMobile ], Index) => (
                        <Component
                            key={Index}
                            IconContainerProps={{ className: 'Navigation-Item-Icon-Container' }}
                            ContainerProps={{ className: 'Icon-Based-Navigation-Item-Container', 'data-disponmob': DisplayInMobile }} />
                    ))}
                    {(Width <= 768) && (
                        <MenuIcon
                            onClick={() => SetIsMenuActive(!GetIsMenuActive)}
                            IsActive={GetIsMenuActive} />
                    )}
                </ul>
            </header>

            <Outlet />

            <footer id='Footer'>
                <section id='About-Brand-Container'>
                    <div>
                        <small id='About-Brand-Title'>Copyright © 2023 Moovilz - Todos los derechos reservados.</small>
                    </div>
                </section>
                
                <ServerHealth />

                <section id='Right-Container'>
                    <ul id='Navigation-Container'>
                        {['Condiciones de Servicio', 'Documentación'].map((Title, Index) => (
                            <FooterNavegationItem Title={Title} key={Index} />
                        ))}
                    </ul>
                </section>
            </footer>
        </React.Fragment>
    );
};

export default Layout;