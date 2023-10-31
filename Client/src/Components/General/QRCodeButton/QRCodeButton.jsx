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

import React, { useState, useEffect } from 'react';
import ReactQRCode from 'react-qr-code';
import { LuQrCode } from 'react-icons/lu';
import './QRCodeButton.css';

const QRCodeButton = ({ ContainerProps, IconContainerProps }) => {
    const [GetIsQRMenuOpen, SetIsQRMenuOpen] = useState(false);

    useEffect(() => {
        return () => {
            SetIsQRMenuOpen(false);
        };
    }, []);

    return (
        <div {...ContainerProps}>
            {(GetIsQRMenuOpen) && (
                <aside id='QR-Floating-Container'>
                    <div id='QR-Code-Content-Container'>
                        <span id='QR-Code-Exit-Title' onClick={() => SetIsQRMenuOpen(false)}>Cerrar</span>
                        <ReactQRCode
                            id='QR-Code-Container'
                            value={window.location.href}
                            bgColor='#121212'
                            fgColor='#FFFFFf'
                            level='L'
                        />
                    </div>
                </aside>
            )}
            <i {...IconContainerProps} onClick={() => SetIsQRMenuOpen(!GetIsQRMenuOpen)}>
                <LuQrCode />
            </i>
        </div>
    );
};

export default QRCodeButton;