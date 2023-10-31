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
import { useSelector } from 'react-redux';
import { SetDocumentTitle } from '@Utilities/Runtime';
import { Interaction, Knowledge, KnowledgeBody } from '@Components/Line/BinaryView';
import BinaryView from '@Components/General/BinaryView';
import './LineList.css';

const LineList = () => {
    const SelectedCity = useSelector((State) => State.City.SelectedCity);

    useEffect(() => {
        SetDocumentTitle(`T. Público de ${SelectedCity?.Name || '(...)'}`);
    }, [SelectedCity]);

    return (
        <BinaryView
            Name='Line-List'
            KnowledgeComponent={Knowledge}
            KnowledgeBodyComponent={KnowledgeBody}
            InteractionComponent={Interaction}
        />
    );
};

export default LineList;