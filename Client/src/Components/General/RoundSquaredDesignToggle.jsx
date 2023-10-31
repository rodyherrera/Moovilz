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
import { TbSquare, TbSquareRounded } from 'react-icons/tb';
import { CoreContext } from '@Services/Core/Context';
import { GetCoreLocalStorage, SetCoreLocalStorage } from '@Services/Core/Service';

const RoundSquaredDesignToggle = ({ ContainerProps, IconContainerProps }) => {
    const [GetIsRoundedMode, SetIsRoundedMode] = useState((GetCoreLocalStorage()?.RSDesign || 'Rounded') === 'Rounded');
    const { SetSnackbar } = useContext(CoreContext);
    const IsComponentMounted = useRef(false);

    useEffect(() => {
        const Method = (GetIsRoundedMode) ? ('add') : ('remove');
        if(IsComponentMounted.current){
            SetCoreLocalStorage({ RSDesign: (GetIsRoundedMode) ? ('Rounded') : ('Squared') });
            SetSnackbar({
                Title: (Method === 'add') ? ('Has activado el modo redondeado.') : ('Se ha desactivado el modo redondeado.'),
                Time: 2500
            });
        }else{
            IsComponentMounted.current = true;
        }
        document.body.classList[Method]('Rounded-Mode');
    }, [GetIsRoundedMode]);

    return (
        <div {...ContainerProps}>
            <i {...IconContainerProps} onClick={() => SetIsRoundedMode(!GetIsRoundedMode)}>
                {(GetIsRoundedMode) ? <TbSquare /> : <TbSquareRounded />}
            </i>
        </div>
    );
};

export default RoundSquaredDesignToggle;