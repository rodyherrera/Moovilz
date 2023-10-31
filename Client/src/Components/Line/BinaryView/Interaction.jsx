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
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import BinaryColoredTitle from '@Components/General/BinaryColoredTitle'
import Line from '@Components/Line/Line';
import Fade from 'react-reveal/Fade';
import RectangularSkeleton from '@Components/General/RectangularSkeleton';
import * as LineSlice from '@Services/Line/Slice';

const InteractionComponent = () => {
    const Dispatch = useDispatch();
    const Navigate = useNavigate();
    const IsSelectedCityLoading = useSelector((State) => State.City.IsSelectedCityLoading);
    const SelectedCity = useSelector((State) => State.City.SelectedCity);
    const { CountrySlug, CitySlug } = useParams();

    const HandleLineSelection = (Data) => {
        Navigate(`/workspace/country/${CountrySlug}/module/city/${CitySlug}/agency/${Data.Agency.Slug}/line/${Data.Slug}/details/`, { replace: true });
        Dispatch(LineSlice.SetSelectedLine(Data));
        Dispatch(LineSlice.SetSluggedLine(Data.Slug));
    };

    return (
        <React.Fragment>
            <BinaryColoredTitle
                LeftTitle='Movilidad Pública'
                RightTitle={
                    <React.Fragment>
                        {(IsSelectedCityLoading) ? <CircularProgress /> : SelectedCity?.Lines?.length} Líneas Registradas
                    </React.Fragment>
                } />
            {(IsSelectedCityLoading) ? (
                <RectangularSkeleton />
            ) : (
                (SelectedCity?.Lines)?.map((Data, Index) => (
                    <Fade bottom duration={1000} delay={Index * 100} key={Index}>
                        <Line Data={Data} ContainerProps={{ onClick: () => HandleLineSelection(Data)}} />
                    </Fade>
                ))
            )}
        </React.Fragment>
    );
};

export default InteractionComponent;