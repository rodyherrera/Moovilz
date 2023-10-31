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
import UseKeyPress from '@Hooks/UseKeyPress';

const UseScrollX = (NodeReference) => {
    const [GetScrollX, SetScrollX] = useState(0);
    const [GetAvailableScrollX, SetAvailableScrollX] = useState(0);
    const IsArrowRightPressed = UseKeyPress('ArrowRight');
    const IsArrowLeftPressed = UseKeyPress('ArrowLeft');

    useEffect(() => {
        if(!NodeReference.current)
            return;
        const UpdateScrollX = () => {
            const CurrentScroll = Math.round(NodeReference.current.scrollLeft);
            const AvailableScroll = Math.round(NodeReference.current.clientWidth - CurrentScroll);
            SetScrollX(CurrentScroll);
            SetAvailableScrollX(AvailableScroll);
        };
        UpdateScrollX();
        let IntervalId;
        if(IsArrowLeftPressed || IsArrowRightPressed){
            IntervalId = setInterval(UpdateScrollX, 100);
        }
        return () => {
            clearInterval(IntervalId);
            SetScrollX(0);
            SetAvailableScrollX(0);
        };
    }, [NodeReference, IsArrowLeftPressed, IsArrowRightPressed]);

    return { ScrollX: GetScrollX, AvailableScrollX: GetAvailableScrollX };
};

export default UseScrollX;