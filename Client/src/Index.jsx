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
import ReactDOM from 'react-dom/client';
import Application from '@/Application.jsx';
import Store from '@Utilities/Store';
import { MultiProvider } from 'react-pendulum';
import { CityProvider } from '@Services/City/Context.jsx';
import { CountryProvider } from '@Services/Country/Context.jsx';
import { LineProvider } from '@Services/Line/Context.jsx';
import { CoreProvider } from '@Services/Core/Context';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@Styles/Theme.css';
import '@Styles/General.css';

ReactDOM.createRoot(document.getElementById('Moovilz-ROOT')).render(
    <MultiProvider
        providers={[
            <BrowserRouter />,
            <Provider store={Store} />,
            <CoreProvider />,
            <CountryProvider />,
            <CityProvider />,
            <LineProvider />
        ]}
    >
        <Application />
    </MultiProvider>
);