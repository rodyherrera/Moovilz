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
import { useNavigate } from 'react-router-dom';
import * as CitySlice from './Slice';
import * as LineSlice from '@Services/Line/Slice';
import * as Service from './Service';

export const CityContext = createContext();

export const CityProvider = ({ children }) => {
    const Dispatch = useDispatch();
    const Navigate = useNavigate();
    const SluggedCity = useSelector((State) => State.City.SluggedCity);
    const SelectedCity = useSelector((State) => State.City.SelectedCity);
    const SluggedLine = useSelector((State) => State.Line.SluggedLine);
    const SluggedCountry = useSelector((State) => State.Country.SluggedCountry);
    const SelectedCountry = useSelector((State) => State.Country.SelectedCountry);

    const HandleCitySelection = async (CitySlug) => {
        // TODO: Fix Backend Query for FindOne (FILTER FIELDS)
        try{
            Dispatch(CitySlice.SetIsSelectedCityLoading(true));
            const Query = {
                Fields: ['Name', 'Slug', 'Lines'],
                Paginate: { Limit: 1 },
                Params: [CitySlug],
                Populate: {
                    path: 'Lines',
                    select: 'Name Slug Stops Agency Line Schedules',
                    populate: {
                        path: 'Stops Agency Schedules',
                        select: 'Name Slug Order Day StartOperationHour EndOperationHour FrequencyInMins'
                    }
                }
            };
            const { Data } = await Service.GetCity({ Query });
            Dispatch(CitySlice.SetSelectedCity(Data));
        }catch{
            Navigate(`/workspace/country/${SluggedCountry}/module/cities/`, { replace: true });
        }finally{
            Dispatch(CitySlice.SetIsSelectedCityLoading(false));
        }
    };

    useEffect(() => {
        if(!SluggedLine)
            return;
        if(!SelectedCity?.Lines?.length){
            Dispatch(LineSlice.SetIsStopsLoading(true));
            return;
        }
        const Line = SelectedCity.Lines.find((Line) => Line.Slug === SluggedLine);
        if(!Line)
            return Navigate(`/workspace/country/${SelectedCountry.Slug}/module/city/${SelectedCity.Slug}/lines/`, { replace: true });
        Dispatch(LineSlice.SetSelectedLine(Line));
        Dispatch(LineSlice.SetSluggedLine(''));
        Dispatch(LineSlice.SetIsLoading(false));
    }, [SluggedLine, SelectedCity])

    useEffect(() => {
        if(SelectedCity?.Lines?.[0]?._id || !SelectedCity?.Slug)
            return;
        HandleCitySelection(SelectedCity.Slug);
    }, [SelectedCity])

    useEffect(() => {
        if(!SluggedCity?.length)
            return;
        Dispatch(CitySlice.SetSelectedCity({ Slug: SluggedCity }));
        Dispatch(CitySlice.SetSluggedCity(''));
    }, [SluggedCity]);

    return (
        <CityContext.Provider
            value={{
                Service
            }}
        >
            {children}
        </CityContext.Provider>
    );
};