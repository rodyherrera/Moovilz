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
import { Interaction, Knowledge, KnowledgeBody } from '@Components/City/BinaryView';
import { SetDocumentTitle } from '@Utilities/Runtime';
import { Capitalize } from '@Utilities/Algorithms';
import { useSelector } from 'react-redux';
import BinaryView from '@Components/General/BinaryView';
import './CityList.css';

const CityListPage = () => {
    const SelectedCountry = useSelector((State) => State.Country.SelectedCountry);

    useEffect(() => {
        SetDocumentTitle(`Ciudades de ${Capitalize(SelectedCountry?.Name || '(...)')}`);
    }, [SelectedCountry]);

    return (
        <BinaryView
            Name='City-List'
            KnowledgeComponent={Knowledge}
            KnowledgeBodyComponent={KnowledgeBody}
            InteractionComponent={Interaction}
        />
    );
};

export default CityListPage;