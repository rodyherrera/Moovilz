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

import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import UseWindowSize from '@Hooks/UseWindowSize';

const XTerm = ({ ContainerProps, UseReference }) => {
    const TerminalContainerReference = useRef(null);
    const XTermFitAddonReference = useRef(null);
    const { Width } = UseWindowSize();

    useEffect(() => {
        if(!XTermFitAddonReference.current || !UseReference.current || Width > 768)
            return;
        UseReference.current.setOption('fontSize', 11);
        XTermFitAddonReference.current.fit();
    }, [Width]);

    useEffect(() => {
        if(!TerminalContainerReference.current)
            return;
        
        const XTermTerminal = new Terminal();
        (UseReference) && (UseReference.current = XTermTerminal)
        const XTermFitAddon = new FitAddon();
        XTermTerminal.loadAddon(XTermFitAddon);
        XTermTerminal.open(TerminalContainerReference.current);
        XTermFitAddonReference.current = XTermFitAddon;
        XTermFitAddon.fit();
    
        (UseReference) && (UseReference.current.Fit = () => XTermFitAddon.fit());

        return () => {
            XTermFitAddonReference.current = null;
            XTermTerminal.dispose();
            XTermFitAddon.dispose();
            (UseReference) && (UseReference.current = null)
        };
    }, []);

    return (
        <div {...ContainerProps}>
            <div ref={TerminalContainerReference} />
        </div>
    );
};

export default XTerm;