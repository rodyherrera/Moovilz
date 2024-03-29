/***
 * Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root
 * for full license information.
 *
 * =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
 *
 * The Moovilz Source Code.
 * 
 * For related information - https://github.com/rodyherrera/Moovilz/
 * 
 * :: https://moovilz.rodyherrera.com/
 * :: https://moovilz-backend.rodyherrera.com/
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
****/

import { createSlice } from '@reduxjs/toolkit';

const State = {
    SelectedLine: {},
    SluggedLine: '',
    IsLoading: true,
    IsStopsLoading: true,
    LineDetails: {}
};

const LineSlice = createSlice({
    name: 'Line',
    initialState: State,
    reducers: {
        SetSelectedLine: (State, Action) => {
            State.SelectedLine = Action.payload;
        },
        SetIsStopsLoading: (State, Action) => {
            State.IsStopsLoading = Action.payload;
        },
        SetLineDetails: (State, Action) => {
            const { CitySlug, Lines, TotalStops } = Action.payload;
            State.LineDetails[CitySlug] = { Lines, TotalStops };
        },
        SetSluggedLine: (State, Action) => {
            State.SluggedLine = Action.payload;
        },
        SetIsLoading: (State, Action) => {
            State.IsLoading = Action.payload;
        }
    }
});

export const {
    SetSelectedLine,
    SetSluggedLine,
    SetLineDetails,
    SetIsStopsLoading,
    SetIsLoading
} = LineSlice.actions;

export default LineSlice.reducer;