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
import { CoreContext } from '@Services/Core/Context';
import { BsTerminal } from 'react-icons/bs';

const CloudShellToggle = ({ ContainerProps, IconContainerProps }) => {
    const { SetIsCloudShellEnabled, GetIsCloudShellEnabled } = useContext(CoreContext);

    return (
        <div {...ContainerProps} onClick={() => SetIsCloudShellEnabled(!GetIsCloudShellEnabled)}>
            <i {...IconContainerProps}>
                <BsTerminal />
            </i>
        </div>
    );
};

export default CloudShellToggle;