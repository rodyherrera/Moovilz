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

import React, { useContext } from 'react';
import Button from '@Components/General/Button';
import { BsTerminal } from 'react-icons/bs';
import { HiLanguage } from 'react-icons/hi2';
import { CoreContext } from '@Services/Core/Context';
import { useNavigate } from 'react-router-dom';
import './MobileMenu.css';

const MobileMenu = ({ SetState }) => {
    const Navigate = useNavigate();
    const { SetIsCloudShellEnabled, GetIsCloudShellEnabled } = useContext(CoreContext);

    return (
        <aside id='Mobile-Menu-Container'>
            <article id='Mobile-Menu-Content'>
                <ul id='Mobile-Menu-Navigation-Container'>
                    {[
                        ['Servicios', '/'],
                        ['Nosotros', '/'],
                        ['DevTools', '/'],
                        ['Recursos', '/'],
                        ['Politicas de Uso', '/workspace/policies/']
                    ].map(([ Item, Link ], Index) => (
                        <li 
                            data-isdisabled={(Link === '/')}
                            onClick={() => Navigate(Link, { replace: true })}
                            className='Mobile-Menu-Navigation-Item' 
                            key={Index}
                        >{Item}</li>
                    ))}
                </ul>

                <div id='Mobile-Menu-Footer-Container'>
                    <div>
                        <Button
                            ButtonProps={{
                                className: 'Icon-Start',
                                id: 'Mobile-Menu-Language-Button'
                            }}
                            Icon={HiLanguage}
                            Title='EN' />
                    </div>
                    <div>
                    <Button 
                            ButtonProps={{
                                className: 'Outlined Icon-End',
                                id: 'Mobile-Menu-DevTools-Button',
                                onClick: () => {
                                    SetIsCloudShellEnabled(!GetIsCloudShellEnabled);
                                    SetState(false);
                                }
                            }}
                            Icon={BsTerminal}
                            Title='Terminal' />
                    </div>
                </div>
            </article>
        </aside>
    );
};

export default MobileMenu;