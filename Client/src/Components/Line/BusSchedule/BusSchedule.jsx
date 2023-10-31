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
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton } from '@mui/material';
import UseWindowSize from '@Hooks/UseWindowSize';
import Fade from 'react-reveal/Fade';
import './BusSchedule.css';

const BusSchedule = () => {
    const { Width } = UseWindowSize();
    const SelectedLine = useSelector((State) => State.Line.SelectedLine);
    const IsLoading = useSelector((State) => State.Line.IsLoading);

    const Days = {
        Monday: 'Lunes',
        Tuesday: 'Martes',
        Wednesday: 'Miércoles',
        Thursday: 'Jueves',
        Friday: 'Viernes',
        Saturday: 'Sábado',
        Sunday: 'Domingo'
    };

    return (
        <div id='Bus-Schedule-Container'>
            <TableContainer style={{ maxHeight: (Width <= 768) ? (220) : (400) }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {['Día', (Width >= 768) ? 'Horarios de Operación' : ('Horarios Op.'), 'Frecuencia'].map((Item, Index) => (
                                <TableCell key={Index} style={{ minWidth: 100 }}>
                                    <Fade clear duration={500} delay={100 * Index}>
                                        {Item}
                                    </Fade>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(IsLoading) ? (
                            (Array.from(Array(7))).map((_, RowIndex) => (
                                <TableRow key={RowIndex}>
                                    {Array.from(Array(3)).map((_, CellIndex) => (
                                        <TableCell key={CellIndex}>
                                            <Fade clear duration={500} delay={100 * CellIndex}>
                                                <Skeleton variant='rectangular' width={100} height={30} />
                                            </Fade>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            SelectedLine.Schedules.map((Item, Index) => (
                                <TableRow key={Index}>
                                    <TableCell component='th' scope='row'>
                                        <Fade clear duration={500} delay={100 * Index}>
                                            {Days[Item.Day]}
                                        </Fade>
                                    </TableCell>
                                    <TableCell>
                                        <Fade clear duration={500} delay={100 * Index}>
                                            {`${Item.StartOperationHour} - ${Item.EndOperationHour}`}
                                        </Fade>
                                    </TableCell>
                                    <TableCell>
                                        <Fade clear duration={500} delay={100 * Index}>
                                            {`${Item.FrequencyInMins} min`}
                                        </Fade>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default React.memo(BusSchedule);