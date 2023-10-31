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
import ChildrenHoverWrapper from '@Components/General/ChildrenHoverWrapper';
import BinaryColoredTitle from '@Components/General/BinaryColoredTitle';
import Stop from '@Components/Line/Stop';
import RectangularSkeleton from '@Components/General/RectangularSkeleton';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

const InteractionComponent = () => {
    const IsStopsLoading = useSelector((State) => State.Line.IsStopsLoading);
    const SelectedLine = useSelector((State) => State.Line.SelectedLine);

    return (
        <React.Fragment>
            <BinaryColoredTitle
                LeftTitle='Recorrido'
                RightTitle={
                    <React.Fragment>
                        {(IsStopsLoading) ? <CircularProgress /> : SelectedLine.Stops.length} paradas registradas
                    </React.Fragment>
                } />
            <ChildrenHoverWrapper CSSClassHandler='Stop-Container-Opacity' id='Line-Stops-Container'>
                {(IsStopsLoading) ? (
                    <RectangularSkeleton 
                        Length={20}
                        Height={80}
                        ContainerProps={{ id: 'Line-Stops-Skeleton-Container' }} />
                ) : (
                    (SelectedLine.Stops).map((LineStop, Index) => (
                        <Stop 
                            Data={LineStop}
                            Delay={Index * 50}
                            id={'Stop-Container-' + Index} 
                            key={Index} />
                    ))
                )}
            </ChildrenHoverWrapper>
        </React.Fragment>
    );
};

export default InteractionComponent;