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
import { useSelector, useDispatch } from 'react-redux';
import { GetCountry } from '@Utilities/Runtime';
import { useNavigate } from 'react-router-dom';
import * as CountrySlice from '@Services/Country/Slice';
import * as Service from './Service';

export const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
    const Navigate = useNavigate();
    const Dispatch = useDispatch();
    const Countries = useSelector((State) => State.Country.Countries);
    const SluggedCountry = useSelector((State) => State.Country.SluggedCountry);
    const SelectedCountry = useSelector((State) => State.Country.SelectedCountry);

    const ResolveMappedCountries = async () => {
        try{
            Dispatch(CountrySlice.SetIsLoading(true));
            const Query = {
                Fields: ['Name', '_id', 'Slug'],
                Paginate: { Limit: -1 }
            };
            const { Data } = await Service.GetCountries({ Query });
            Dispatch(CountrySlice.SetCountries(Data));
        }finally{
            Dispatch(CountrySlice.SetIsLoading(false));
        }
    };

    const HandleCountrySelection = async (CountrySlug) => {
        try{
            Dispatch(CountrySlice.SetIsCountrySelectionLoading(true));
            const Query = {
                Fields: ['Name', '_id', 'Slug', 'Cities'],
                Paginate: { Limit: 1 },
                Params: [CountrySlug],
                Populate: {
                    path: 'Cities',
                    select: 'Lines Stops Agencies Name Slug -_id'
                }
            };
            const { Data } = await Service.GetCountry({ Query });
            Dispatch(CountrySlice.SetSelectedCountry(Data));
        }finally{
            Dispatch(CountrySlice.SetIsCountrySelectionLoading(false));
        }
    };

    useEffect(() => {
        if(SelectedCountry.Name !== 'N/A' && !SelectedCountry?.Cities?.length){
            HandleCountrySelection(SelectedCountry.Slug);
        }
    }, [SelectedCountry]);

    useEffect(() => {
        if(Countries?.length)
            return;
        ResolveMappedCountries();
    }, [Countries]);

    useEffect(() => {
        if(!Countries?.length || SelectedCountry?._id){
            return;
        }
        Dispatch(CountrySlice.SetIsCountrySelectionLoading(true));
        Dispatch(CountrySlice.SetIsLoading(true));
        const Country = (SluggedCountry?.length) ? SluggedCountry: (GetCountry().country).toLowerCase();
        let MatchedCountry = Countries.find(({ Slug, Name }) => {
            const ToMatch = (SluggedCountry?.length) ? (Slug) : (Name);
            return ToMatch === Country;
        });
        if(!MatchedCountry){
            MatchedCountry = Countries[0];
        }
        if(SluggedCountry.length && (MatchedCountry.Slug !== SluggedCountry)){
            Navigate('/', { replace: true });
        }
        Dispatch(CountrySlice.SetSelectedCountry(MatchedCountry));
        Dispatch(CountrySlice.SetSluggedCountry(''));
        Dispatch(CountrySlice.SetIsLoading(false));
    }, [SluggedCountry, Countries]);

    return (
        <CountryContext.Provider
            value={{
                Service,
                HandleCountrySelection
            }}
        >
            {children}
        </CountryContext.Provider>
    );
};