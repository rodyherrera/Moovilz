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

import React, { useRef, useEffect } from 'react';
import UseChildrenElementHover from '@Hooks/UseChildrenElementHover';

const ChildrenHoverWrapper = ({ CSSClassHandler, children, ...Properties }, Reference) => {
    const ChildrenHoverWrapperReference = useRef(null);
    const [HasElementHover, ChildrenNodes] = UseChildrenElementHover(Reference || ChildrenHoverWrapperReference);

    useEffect(() => {
        if(!HasElementHover)
            return;
        const WhenIteration = (Callback) => {
            for(let NodeIterator = 0; NodeIterator < ChildrenNodes.length; NodeIterator++){
                const Node = ChildrenNodes[NodeIterator];
                Callback(Node);
            }
        };
        WhenIteration((Node) => (Node.id !== HasElementHover.id) && (Node.classList.add(CSSClassHandler)));
        return () => {
            WhenIteration((Node) => Node.classList.remove(CSSClassHandler));
        };
    }, [HasElementHover]);

    return (
        <div ref={Reference || ChildrenHoverWrapperReference} {...Properties}>
            {children}
        </div>
    );
};

export default React.forwardRef(ChildrenHoverWrapper);