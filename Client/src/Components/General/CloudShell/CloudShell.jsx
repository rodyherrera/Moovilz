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

import React, { useEffect, useRef, useContext } from 'react';
import { CoreContext } from '@Services/Core/Context';
import { BsTerminal } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { BiBookAlt } from 'react-icons/bi';
import { VscGithubAlt } from 'react-icons/vsc';
import { PiDotsSixBold } from 'react-icons/pi';
import { HandleXTermDataEvent, DisplayInitialCommandLineContent, DisplayCommandLineInput } from '@Utilities/CloudShell';
import ResizableInAxisY from '@Components/General/ResizableInAxisY';
import XTerm from '@Components/General/XTerm';
import './CloudShell.css';
import 'xterm/css/xterm.css';

const CloudShell = () => {
    const { GetIsCloudShellEnabled, SetIsCloudShellEnabled } = useContext(CoreContext);
    const XTermReference = useRef(null);

    // ! Node references for ResizableInAxisY component
    const CloudShellContainerReference = useRef(null);
    const DragIconContainerReference = useRef(null);
    const CloudShellHeaderReference = useRef(null);

    useEffect(() => {
        if(!XTermReference.current || !GetIsCloudShellEnabled)
            return;
        XTermReference.current.onData((Data) => HandleXTermDataEvent(Data, XTermReference.current));
        DisplayInitialCommandLineContent(XTermReference.current);
        DisplayCommandLineInput(XTermReference.current);
    }, [GetIsCloudShellEnabled]);

    return (GetIsCloudShellEnabled) && (
        <ResizableInAxisY
            ContainerRef={CloudShellContainerReference}
            TriggerNodeRef={DragIconContainerReference}
            InitialHeight={300}
            MaxHeight={700}
            MinHeight={CloudShellHeaderReference}
            Callback={() => {
                if(!XTermReference?.current)
                    return;
                XTermReference.current.Fit();
            }}
        >
            <aside id='Cloud-Shell-Container' ref={CloudShellContainerReference}>
                <section id='Cloud-Shell-Header' ref={CloudShellHeaderReference}>
                    <article id='Cloud-Shell-Header-Title-Container'>
                        <i id='Cloud-Shell-Header-Title-Icon-Container'>
                            <BsTerminal />
                        </i>
                        <div id='Cloud-Shell-Header-Title-Text-Container'>
                            <h3 id='Cloud-Shell-Header-Title'>Cloud Shell</h3>
                            <h4 id='Cloud-Shell-Header-Subtitle'>Terminal</h4>
                        </div>
                    </article>
                    <article id='Cloud-Shell-Header-Center-Container'>
                        <i id='Cloud-Shell-Header-Drag-Icon-Container' ref={DragIconContainerReference}>
                            <PiDotsSixBold />
                        </i>
                    </article>
                    <article id='Cloud-Shell-Header-Actions-Container'>
                        {[
                            [VscGithubAlt, () => {}], 
                            [BiBookAlt, () => {}], 
                            [AiOutlineClose, () => SetIsCloudShellEnabled(false)]
                        ].map(([ Icon, OnClick ], Index) => (
                            <i className='Cloud-Shell-Header-Icon-Container' key={Index} onClick={OnClick}>
                                <Icon />
                            </i>
                        ))}
                    </article>
                </section>
                <XTerm 
                    ContainerProps={{ id: 'Cloud-Shell-Body' }}
                    UseReference={XTermReference} />
            </aside>
        </ResizableInAxisY>
    );
};

export default CloudShell;