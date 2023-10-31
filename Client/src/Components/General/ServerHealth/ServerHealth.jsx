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

import React, { useContext, useState, useEffect } from 'react';
import { CoreContext } from '@Services/Core/Context';
import { CircularProgress } from '@mui/material';
import './ServerHealth.css';

const ServerHealth = () => {
    const { GetServerHealth, GetIsServerHealthLoading, SetSnackbar } = useContext(CoreContext);
    const [GetIsClientOffline, SetIsClientOffline] = useState(false);

    useEffect(() => {
        const OfflineHandler = () => {
            SetIsClientOffline(true);
            SetSnackbar({
                Title: 'Se ha perdido la conexión a internet.',
                Time: 2500
            })
        };
        const OnlineHandler = () => {
            SetIsClientOffline(false);
            SetSnackbar({
                Title: 'Se ha recuperado la conexión a internet.',
                Time: 2500
            });
        };
        window.addEventListener('offline', OfflineHandler);
        window.addEventListener('online', OnlineHandler);
        return () => {
            window.removeEventListener('offline', OfflineHandler);
            window.removeEventListener('online', OnlineHandler);
        };
    }, []);

    return (
        <section className='Server-Health-Container'>
            <article className='Health-Container'>
                <i className='Health-Icon-Container'>
                    {(GetIsServerHealthLoading) ? (
                        <CircularProgress />
                    ) : (
                        <div className='Health-Icon' data-error={GetServerHealth?.Details?.length >= 1} />
                    )}
                </i>
                <div>
                    <small className='Health-Title'>
                        {(GetIsClientOffline) ? (
                            'No tienes conexión a internet'
                        ) : (
                            (GetIsServerHealthLoading) ? 
                                ('Estado del sistema (Cargando...)') 
                                    : 
                                (GetServerHealth?.Details?.length >= 1 ?
                                    ('Servidores con problemas.')
                                        :
                                    ('Todos los servidores operativos.'))
                        )}
                    </small>
                </div>
            </article>
        </section>
    );
};

export default ServerHealth;