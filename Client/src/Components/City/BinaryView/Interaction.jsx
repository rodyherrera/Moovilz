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
import { CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UseWindowSize from '@Hooks/UseWindowSize';
import Fade from 'react-reveal/Fade';
import City from '@Components/City/City';
import RectangularSkeleton from '@Components/General/RectangularSkeleton';
import BinaryColoredTitle from '@Components/General/BinaryColoredTitle';
import * as CitySlice from '@Services/City/Slice';

const InteractionComponent = () => {
    const Navigate = useNavigate();
    const Dispatch = useDispatch();
    const IsCountrySelectionLoading = useSelector((State) => State.Country.IsCountrySelectionLoading);
    const SelectedCountry = useSelector((State) => State.Country.SelectedCountry);
    const { CountrySlug } = useParams();
    const { Width } = UseWindowSize();
    
    const HandleCitySelection = (City) => {
        Dispatch(CitySlice.SetIsSelectedCityLoading(true));
        Dispatch(CitySlice.SetSelectedCity(City));
        Navigate(`/workspace/country/${CountrySlug}/module/city/${City.Slug}/lines/`, { replace: true });
    };

    return (
        <React.Fragment>
            <BinaryColoredTitle
                LeftTitle='Ciudades'
                RightTitle={(
                    <React.Fragment>
                        {(IsCountrySelectionLoading) ? (
                            <CircularProgress />
                        ) : (
                            (SelectedCountry.Cities).length
                        )} localidades mapeadas
                    </React.Fragment>
                )} />
            {(IsCountrySelectionLoading) ? (
                <RectangularSkeleton />
            ) : (
                (SelectedCountry.Cities).map((Data, Index) => (
                    <Fade bottom duration={(Width > 768) ? (1000) : (300)} delay={Math.min(Index * 100, 700)} key={Index}>
                        <City OnClick={HandleCitySelection} Data={Data} />
                    </Fade>
                ))
            )}
        </React.Fragment>
    );
};

export default InteractionComponent;