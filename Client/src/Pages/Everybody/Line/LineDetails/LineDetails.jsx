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
import BinaryView from '@Components/General/BinaryView';
import { SetDocumentTitle } from '@Utilities/Runtime';
import { useSelector, useDispatch } from 'react-redux';
import { Interaction, Knowledge, KnowledgeBody } from '@Components/Line/DetailsBinaryView';
import './LineDetails.css';

const LineDetails = () => {
    const SelectedLine = useSelector((State) => State.Line.SelectedLine);

    useEffect(() => {
        SetDocumentTitle(`Línea ${SelectedLine?.Name || '(...)'}`);
    }, [SelectedLine]);

    return (
        <BinaryView
            Name='Line-Details'
            KnowledgeComponent={Knowledge}
            KnowledgeBodyComponent={KnowledgeBody}
            InteractionComponent={Interaction}
        />
    );
};

export default LineDetails;