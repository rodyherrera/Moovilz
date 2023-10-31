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

import { useState, useEffect } from 'react';

const UseWindowSize = () => {
    const [GetWindowSize, SetWindowSize] = useState({
        Width: undefined,
        Height: undefined 
    });

    const HandleWindowResize = () => {
        SetWindowSize({
            Width: window.innerWidth,
            Height: window.innerHeight
        });
    };

    useEffect(() => {
        window.addEventListener('resize', HandleWindowResize);
        HandleWindowResize();
        return () => {
            window.removeEventListener('resize', HandleWindowResize);
        };
    }, []);

    return GetWindowSize;
};

export default UseWindowSize;