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

import React, { createContext, useState, useEffect } from 'react';
import UseImagePreloader from '@Hooks/UseImagePreloader';
import ImagesAssets from '@Assets/Images/';
import * as Service from './Service';

export const CoreContext = createContext();

export const CoreProvider = ({ children }) => {
    const [GetServerHealth, SetServerHealth] = useState({});
    const [GetIsServerHealthLoading, SetIsServerHealthLoading] = useState(true);
    const [GetSnackbar, SetSnackbar] = useState({});
    const [GetIsCloudShellEnabled, SetIsCloudShellEnabled] = useState(false);
    
    // TODO: { GetImagesPreloaded } = UseImag...(...);
    UseImagePreloader(ImagesAssets);

    const HandleServerHealthResolution = async () => {
        try{
            SetIsServerHealthLoading(true);
            const { Data: { Database, Server } } = await Service.Health({});
            SetServerHealth({ Database, Server });
        }catch(Error){
            SetServerHealth({
                Database: 'Core::DB::Health::Failed',
                Server: 'Core::Server::Health::Failed',
                Details: Error || 'Core::Server::Health::Unexpected'
            });
        }finally{
            SetIsServerHealthLoading(false);
        }
    };

    useEffect(() => {
        if(!Object.keys(GetSnackbar).length)
            return;
        const SnackbarTimeout = setTimeout(() => {
            SetSnackbar({});
        }, GetSnackbar.Time);
        return () => {
            clearTimeout(SnackbarTimeout);
        };
    }, [GetSnackbar]);

    useEffect(() => {
        // ! Call the server health resolution in a interval of 30 seconds
        const ServerHealthInterval = setInterval(() => {
            HandleServerHealthResolution();
        }, 5000);
        // ! Call the server health resolution in the first time
        HandleServerHealthResolution();
        return () => {
            // ! Clear the interval
            clearInterval(ServerHealthInterval);
            SetIsServerHealthLoading(false);
            SetServerHealth({});
            SetSnackbar({});
            SetIsCloudShellEnabled(false);
        };
    }, []);

    return (
        <CoreContext.Provider
            value={{
                GetIsServerHealthLoading,
                GetServerHealth,
                GetIsCloudShellEnabled,
                SetIsCloudShellEnabled,
                GetSnackbar,
                SetSnackbar
            }}
        >
            {children}
        </CoreContext.Provider>
    );
};