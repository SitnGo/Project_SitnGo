import React, {useState} from 'react';
import {classes} from "./style";
import {
    TextField,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableFooter,
    TablePagination,
    Paper,
    Button
} from '@material-ui/core';

const GetRout = () => {

    let [mapId, setMapId] = useState(1);
    const handleClick = (id) => {
        setMapId(id);
    }
    console.log(mapId);

    let d = new Date();
    let day = d.getDate();
    let month;
    if (d.getMonth()<9){
        month = `0${d.getMonth()+1}`;
    }else{
        month = d.getMonth()+1;
    }
    let year = d.getFullYear();
    let date = `${year}-${month}-${day}T23:59`;
    ////////////
    const [page, setPage] = React.useState(0);

    const [info, setInfo] = useState(
        {
            '1': {name: 'Name Surname', car: 'BMW', plate: '777OO77', count: 4},
            '2': {name: 'Name Surname', car: 'BMW', plate: '777OO77', count: 4},
            '3': {name: 'Name Surname', car: 'BMW', plate: '777OO77', count: 4},
            '4': {name: 'Name Surname', car: 'BMW', plate: '777OO77', count: 4},
            '5': {name: 'Name Surname', car: 'BMW', plate: '777OO77', count: 4},
            '6': {name: 'Name Surname', car: 'BMW', plate: '777OO77', count: 4},
            '7': {name: 'Name Surname', car: 'BMW', plate: '777OO77', count: 4},
            '8': {name: 'Name Surname', car: 'BMW', plate: '777OO77', count: 4},
            '9': {name: 'Name Surname', car: 'BMW', plate: '777OO77', count: 4},
            '10': {name: 'Name Surname', car: 'BMW', plate: '777OO77', count: 4},
            '11': {name: 'Name Surname', car: 'BMW', plate: '777OO77', count: 4},
            '12': {name: 'Name Surname', car: 'BMW', plate: '777OO77', count: 4},
            '13': {name: 'Name Surname', car: 'BMW', plate: '777OO77', count: 4},
            '14': {name: 'Name Surname', car: 'BMW', plate: '777OO77', count: 4},
            '15': {name: 'Name Surname', car: 'BMW', plate: '777OO77', count: 4},
            '16': {name: 'Name Surname', car: 'BMW', plate: '777OO77', count: 4},
            '17': {name: 'Name Surname', car: 'BMW', plate: '777OO77', count: 4},
            '18': {name: 'Name Surname', car: 'BMW', plate: '777OO77', count: 4},
            '19': {name: 'Name Surname', car: 'BMW', plate: '777OO77', count: 4},
            '20': {name: 'Name Surname', car: 'BMW', plate: '777OO77', count: 4},
            '21': {name: 'Name Surname', car: 'Nissan', plate: '777OO77', count: 4},
        }
    )

    const rows = Object.values(info);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    ///////

    return(
        <section style={classes.section}>
            <div style={classes.routeList}>
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='From'
                    style={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='To'
                    style={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Date'
                    type='datetime-local'
                    defaultValue={`${date}`}
                    style={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Persons'
                    style={classes.routeListItem}
                />
                <Button
                    variant='outlined'
                >Search</Button>
            </div>
            <div style={classes.offersContainer}>
                <div style={classes.offers}>
                    <Paper>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>Driver</TableCell>
                                    <TableCell align='center'>Car Model</TableCell>
                                    <TableCell align='center'>Car plate</TableCell>
                                    <TableCell align='center'>Total Sits</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => {
                                    let tableRow = Object.values(row);
                                    return (
                                        <TableRow hover role="checkbox" key={row.count}>
                                            {
                                                tableRow.map(column => {
                                                    return (
                                                        <TableCell key={column.count}  align='center'>
                                                            {column}
                                                        </TableCell>
                                                    );
                                                })
                                            }
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                            <TableFooter>
                                <TablePagination
                                    count={rows.length}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    rowsPerPageOptions={[]}
                                    onChangePage={handleChangePage}
                                />
                            </TableFooter>
                        </Table>
                    </Paper>
                </div>
                <div style={classes.mapContainer}>
                    Map {mapId}
                </div>
            </div>
        </section>
    );
}

export default GetRout;