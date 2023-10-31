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
    Cities: [],
    SluggedCity: '',
    IsLoading: false,
    SelectedCity: {},
    IsSelectedCityLoading: true
};

const CitySlice = createSlice({
    name: 'City',
    initialState: State,
    reducers: {
        SetCities: (State, Action) => {
            const { Cities } = Action.payload;
            State.Cities = Cities;
        },
        SetIsSelectedCityLoading: (State, Action) => {
            State.IsSelectedCityLoading = Action.payload;
        },
        SetSelectedCity: (State, Action) => {
            State.SelectedCity = Action.payload;
        },
        SetIsLoading: (State, Action) => {
            State.IsLoading = Action.payload;
        },
        SetSluggedCity: (State, Action) => {
            State.SluggedCity = Action.payload;
        }
    }
});

export const {
    SetSluggedCity,
    SetCities,
    SetIsSelectedCityLoading,
    SetIsLoading,
    SetSelectedCity
} = CitySlice.actions;

export default CitySlice.reducer;