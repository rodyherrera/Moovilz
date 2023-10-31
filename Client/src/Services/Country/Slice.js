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

import { createSlice } from '@reduxjs/toolkit';

const State = {
    Countries: [],
    SluggedCountry: '',
    IsCountrySelectionLoading: true,
    IsLoading: true,
    SelectedCountry: { Name: 'N/A' }
};

const CountrySlice = createSlice({
    name: 'Country',
    initialState: State,
    reducers: {
        SetIsCountrySelectionLoading: (State, Action) => {
            State.IsCountrySelectionLoading = Action.payload;
        },
        SetCountries: (State, Action) => {
            State.Countries = Action.payload;
        },
        SetIsLoading: (State, Action) => {
            State.IsLoading = Action.payload;
        },
        SetSelectedCountry: (State, Action) => {
            State.SelectedCountry = Action.payload;
        },
        SetSluggedCountry: (State, Action) => {
            State.SluggedCountry = Action.payload;
        }
    }
});

export const {
    SetCountries,
    SetIsLoading,
    SetSluggedCountry,
    SetIsCountrySelectionLoading,
    SetSelectedCountry
} = CountrySlice.actions;

export default CountrySlice.reducer;