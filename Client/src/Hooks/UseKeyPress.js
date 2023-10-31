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

import { useEffect, useState } from 'react';

// TODO: Refactor this code.
const UseKeyPress = (TargetKey) => {
    const [GetKeyPressed, SetKeyPressed] = useState(false);

    useEffect(() => {
        const DownHandler = (Event) => {
            if(Event.key === TargetKey){
                SetKeyPressed(true);
            }
        };

        const UpHandler = (Event) => {
            if(Event.key === TargetKey){
                SetKeyPressed(false);
            }
        };

        window.addEventListener('keydown', DownHandler);
        window.addEventListener('keyup', UpHandler);
        return () => {
            window.removeEventListener('keydown', DownHandler);
            window.removeEventListener('keyup', UpHandler);
        }
    }, [TargetKey]);

    return GetKeyPressed;
};

export default UseKeyPress;