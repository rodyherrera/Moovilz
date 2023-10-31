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

import React, { useState, useEffect, useRef, useContext } from 'react';
import Fade from 'react-reveal/Fade';
import Button from '@Components/General/Button';
import { CountryContext } from '../../../Services/Country/Context';
import { CgArrowsExchangeAltV } from 'react-icons/cg';
import { AiOutlineClose } from 'react-icons/ai';
import { GoArrowLeft } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as CountrySlice from '@Services/Country/Slice';
import * as CitySlice from '@Services/City/Slice';
import * as LineSlice from '@Services/Line/Slice';
import './BinaryView.css';

const BinaryView = ({ KnowledgeBodyComponent, KnowledgeComponent, InteractionComponent, Name = '' }) => {
    const { HandleCountrySelection } = useContext(CountryContext);
    const Navigate = useNavigate();
    const Dispatch = useDispatch();
    const [GetIsCountrySelectOpen, SetIsCountrySelectOpen] = useState(false);
    const GetSelectedCountry = useSelector((State) => State.Country.SelectedCountry);
    const CountrySelectReference = useRef(null);
    const Countries = useSelector((State) => State.Country.Countries);
    const SelectedCity = useSelector((State) => State.City.SelectedCity);
    const SelectedLine = useSelector((State) => State.Line.SelectedLine);
    const { CountrySlug, CitySlug, LineSlug } = useParams();

    const NavigateToSelectedCountry = (Country) => {
        HandleCountrySelection(Country.Slug);
        Dispatch(CountrySlice.SetSelectedCountry(Country));
        Navigate(`/workspace/country/${Country.Slug}/module/cities/`, { replace: true });
    };

    useEffect(() => {
        if(!CountrySelectReference.current || !GetIsCountrySelectOpen)
            return;
        const HandleClick = document.addEventListener('click', (Event) => {
            if(!CountrySelectReference.current?.contains(Event.target))
                SetIsCountrySelectOpen(false);
        });
        document.addEventListener('click', HandleClick);
        return () => {
            document.removeEventListener('click', HandleClick);
        };
    }, [GetIsCountrySelectOpen, CountrySelectReference]);

    useEffect(() => {
        if(GetSelectedCountry.Name === 'N/A'){
            Dispatch(CountrySlice.SetSluggedCountry(CountrySlug));
        }
        if(!SelectedCity?.Name?.length && CitySlug){
            Dispatch(CitySlice.SetSluggedCity(CitySlug));
        }
        if(!SelectedLine?.Stops?.length && LineSlug){
            Dispatch(LineSlice.SetSluggedLine(LineSlug));
        }
        return () => {
            SetIsCountrySelectOpen(false);
        };
    }, []);

    return (
        <main className={'Binary-View-Container'.concat(' ' + Name)}>
            <section className='Knowledge-Container'>
                <article className='Knowledge-Header-Container'>
                    <KnowledgeComponent />
                </article>
                <article className='Knowledge-Body-Container'>
                    <KnowledgeBodyComponent />
                </article>
                <article className='Knowledge-Footer-Container'>
                    <Fade clear duration={500} delay={150}>
                        <Button 
                            ButtonProps={{ 
                                className: 'Text Icon-Start Binary-View-Go-Back-Button',
                                onClick: () => Navigate(-1)
                            }} 
                            Title='Volver' 
                            Icon={GoArrowLeft} />
                    </Fade>
                    <div className='Country-Select-Container' ref={CountrySelectReference}>
                        {(GetIsCountrySelectOpen) && (
                            <ul className='Country-List-Container'>
                                {(Countries).map((Country, Index) => (
                                    <Fade clear duration={500} delay={100 * Index} key={Index}>
                                        <li 
                                            onClick={() => NavigateToSelectedCountry(Country)}
                                            className={'Country-List-Item ' + ((Country.Name === GetSelectedCountry.Name) ? 'Selected' : (''))}>
                                            <span>{Country.Name}</span>
                                        </li>
                                    </Fade>
                                ))}
                            </ul>
                        )}
                        <Fade clear duration={500} delay={300}>
                            <Button 
                                Icon={(GetIsCountrySelectOpen) ? (AiOutlineClose) : (CgArrowsExchangeAltV)}
                                Title={GetSelectedCountry.Name}
                                ButtonProps={{
                                    className: 'Outlined Location-Container Icon-End',
                                    onClick: () => SetIsCountrySelectOpen(!GetIsCountrySelectOpen)
                                }} />
                        </Fade>
                    </div>
                </article>
            </section>
            <section className='Interaction-Container'>
                <article className='Interaction-Body-Container'>
                    <InteractionComponent />
                </article>
            </section>
        </main>
    );
};

export default BinaryView;