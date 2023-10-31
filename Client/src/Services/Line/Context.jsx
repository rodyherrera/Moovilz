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

import React, { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Service from './Service';
import * as LineSlice from './Slice';

export const LineContext = createContext();

export const LineProvider = ({ children }) => {
    const Dispatch = useDispatch();
    const SelectedLine = useSelector((State) => State.Line.SelectedLine);

    useEffect(() => {
        if(SelectedLine?.Stops?.length){
            Dispatch(LineSlice.SetIsStopsLoading(false));
            return;
        }
        Dispatch(LineSlice.SetIsStopsLoading(true));
    }, [SelectedLine]);

    return (
        <LineContext.Provider
            value={{
                Service
            }}
        >
            {children}
        </LineContext.Provider>
    );
};