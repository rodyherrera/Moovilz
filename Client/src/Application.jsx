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

import React from 'react';
import { Routes as RoutesBox, Route, useLocation } from 'react-router-dom';
import Layout from '@Components/General/Layout';
import Pages from '@Pages';

const Application = () => { 
    const Location = useLocation();
    return (
        <RoutesBox location={Location} key={Location.pathname}>
            <Route element={<Layout />}>
                <Route index element={<Pages.Everybody.Home />} />
                <Route path='/workspace/policies/' element={<Pages.Everybody.Policies />} />
                <Route path='/workspace/country/:CountrySlug/module/cities/' element={<Pages.Everybody.City.CityList />} />
                <Route path='/workspace/country/:CountrySlug/module/city/:CitySlug/lines/' element={<Pages.Everybody.Line.LineList />} />
                <Route path='/workspace/country/:CountrySlug/module/city/:CitySlug/agency/:AgencySlug/line/:LineSlug/details/' element={<Pages.Everybody.Line.LineDetails />} />
            </Route>
            <Route path='*' element={<Pages.Everybody.Home />} />
        </RoutesBox>
    );
};

export default Application;