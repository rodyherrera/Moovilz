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

import React, { useEffect, useState, useContext, useRef } from 'react';
import { CiDark } from 'react-icons/ci';
import { BsSun } from 'react-icons/bs';
import { CoreContext } from '@Services/Core/Context';
import { GetCoreLocalStorage, SetCoreLocalStorage } from '@Services/Core/Service';

const DarkModeDesignToggle = ({ ContainerProps, IconContainerProps }) => {
    const [GetIsDarkMode, SetIsDarkMode] = useState((GetCoreLocalStorage()?.ThemeColor || 'Dark') === 'Dark');
    const { SetSnackbar } = useContext(CoreContext);
    const IsComponentMounted = useRef(false);

    useEffect(() => {
        const Method = (GetIsDarkMode) ? ('remove') : ('add');
        if(IsComponentMounted.current){
            SetCoreLocalStorage({ ThemeColor: (GetIsDarkMode) ? ('Dark') : ('Light') });
            SetSnackbar({
                Title: (Method === 'remove') ? ('Has activado el modo oscuro.') : ('Se ha desactivado el modo oscuro.'),
                Time: 2500
            });
        }else{
            IsComponentMounted.current = true;
        }
        document.documentElement.classList[Method]('Light-Mode');
    }, [GetIsDarkMode]);

    return (
        <div {...ContainerProps}>
            <i {...IconContainerProps} onClick={() => SetIsDarkMode(!GetIsDarkMode)}>
                {(GetIsDarkMode) ? (
                    <BsSun />
                ) : (
                    <CiDark />
                )}
            </i>
        </div>
    );
};

export default DarkModeDesignToggle;