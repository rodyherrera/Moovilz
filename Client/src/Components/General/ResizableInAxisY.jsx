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

const ResizableInAxisY = ({ 
    InitialHeight, 
    MaxHeight,
    MinHeight, 
    ContainerRef,
    TriggerNodeRef, 
    Callback, 
    children 
}) => {
    const [GetNodeHeight, SetNodeHeight] = useState(InitialHeight);

    const UpdateFooterPaddingBottom = (Value) => {
        const FooterNode = document?.getElementById('Footer');
        if(!FooterNode)
            return;
        // ! We will put a padding-top, since the value 
        // ! that the function receives is only the height 
        // ! of the resizable container. I mean, if we don't 
        // ! add a padding-top, the content of the container 
        // ! located at the bottom and the footer itself 
        // ! will look together, and it doesn't look good visually.
        const PaddingTopInPX = 16;
        FooterNode.style.paddingBottom = (PaddingTopInPX + Value) + 'px';
    };

    const SetOverflowToParentNodes = (Overflow, OverscrollBehavior) => {
        const MoovilzROOT = document.getElementById('Moovilz-ROOT');
        const BodyElement = document.getElementsByTagName('body')[0];
        const HTMLElement = document.getElementsByTagName('html')[0];
        MoovilzROOT.style.overflow = Overflow;
        BodyElement.style.overflow = Overflow;
        HTMLElement.style.overflow = Overflow;
        HTMLElement.style.overscrollBehavior = OverscrollBehavior;
    }

    useEffect(() => {
        if(!ContainerRef.current)
            return;
        ContainerRef.current.style.height = GetNodeHeight + 'px';
        UpdateFooterPaddingBottom(GetNodeHeight);
    }, [GetNodeHeight]);

    useEffect(() => {
        const SanitizeHeightLimits = () => {
            (MaxHeight?.current) && (MaxHeight = MaxHeight.current.clientHeight);
            (MinHeight?.current) && (MinHeight = MinHeight.current.clientHeight);
            return { MaxHeight, MinHeight };
        };

        const HandleTouchEnd = () => {
            SetOverflowToParentNodes('scroll', 'auto');
            Callback();
            document.removeEventListener('touchend', HandleTouchEnd);
            document.removeEventListener('touchmove', HandleTouchMove);
        };

        const HandleTouchMove = (Event) => {
            const NewNodeHeight = (window.innerHeight - Event.touches[0].clientY);
            const HeaderNode = document.getElementById('Header');
            // ! When this block of instructions is executed, we 
            // ! assume that it is a mobile device, we will not
            // ! consider the value of the "MaxHeight" variable 
            // ! here, at least for the use that is given to 
            // ! this component now.
            const MaxHeight = window.innerHeight - HeaderNode.clientHeight;
            const { MinHeight } = SanitizeHeightLimits();
            if(NewNodeHeight > MaxHeight || NewNodeHeight < MinHeight){
                return;
            }
            SetNodeHeight(NewNodeHeight);
        };

        const HandleTouchStart = () => {
            // TODO: Is this correct?
            SetOverflowToParentNodes('hidden', 'none');
            document.addEventListener('touchend', HandleTouchEnd);
            document.addEventListener('touchmove', HandleTouchMove);
        };

        const HandleMouseUp = () => {
            Callback();
            document.removeEventListener('mouseup', HandleMouseUp);
            document.removeEventListener('mousemove', HandleMouseMove);
        };

        const HandleMouseMove = (Event) => {
            const NewNodeHeight = (window.innerHeight - Event.clientY);
            const { MaxHeight, MinHeight } = SanitizeHeightLimits();
            if(
                (MaxHeight && NewNodeHeight > MaxHeight) ||
                (MinHeight && NewNodeHeight < MinHeight)
            ){
                return;
            }
            SetNodeHeight(NewNodeHeight);
        };

        const HandleOnMouseDown = () => {
            document.addEventListener('mouseup', HandleMouseUp);
            document.addEventListener('mousemove', HandleMouseMove);
        };

        if(!TriggerNodeRef.current)
            return;
        
        TriggerNodeRef.current.addEventListener('mousedown', HandleOnMouseDown);
        TriggerNodeRef.current.addEventListener('touchstart', HandleTouchStart);

        return () => {
            UpdateFooterPaddingBottom(0);
            SetOverflowToParentNodes('scroll', 'auto');
            document.removeEventListener('mouseup', HandleMouseUp);
            document.removeEventListener('mousemove', HandleMouseMove);
            document.removeEventListener('touchend', HandleTouchEnd);
            document.removeEventListener('touchmove', HandleTouchMove);
        };
    }, []);

    return children;
};

export default ResizableInAxisY;