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

// ! UseChildrenElementHover listens for mouse hover events on the 
// ! children of a specified parent element. (I'm not creative with names lol.)
const UseChildrenElementHover = (ParentNodeReference) => {
    const [GetHoveredElement, SetHoveredElement] = useState(null);
    const [GetElementChildrens, SetElementChildrens] = useState([]);

    useEffect(() => {
        if(!ParentNodeReference.current)
            return;
        const HandleMouseEnter = (Event) => SetHoveredElement(Event.target);
        const HandleMouseLeave = () => SetHoveredElement(null);
        const Children = ParentNodeReference.current.children;
        SetElementChildrens(Children);
        const HandleChildrenNodesListener = (Method) => {
            for(let ChildrenIterator = 0; ChildrenIterator < Children.length; ChildrenIterator++){
                Children[ChildrenIterator][Method]('mouseenter', HandleMouseEnter);
                Children[ChildrenIterator][Method]('mouseleave', HandleMouseLeave);
            }
        };
        HandleChildrenNodesListener('addEventListener');
        return () => {
            HandleChildrenNodesListener('removeEventListener');
        }
    }, [ParentNodeReference]);

    return [GetHoveredElement, GetElementChildrens];
};

export default UseChildrenElementHover;