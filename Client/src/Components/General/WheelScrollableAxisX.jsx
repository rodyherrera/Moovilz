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

const WheelScrollableInAxisX = ({ children }, Reference) => {
    useEffect(() => {
        if(!Reference.current)
            return;
        const HandleMouseWheel = (Event) => {
            Event.preventDefault();
            const ScrollAmount = Event.deltaY;
            Reference.current.scrollLeft += ScrollAmount;
        };
        Reference.current.addEventListener('wheel', HandleMouseWheel);
        return () => Reference.current?.removeEventListener('wheel', HandleMouseWheel);
    }, [Reference]);

    return children;
};

export default React.forwardRef(WheelScrollableInAxisX);