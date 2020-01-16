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

    function createData(name, car, plate, count) {
        const density = population / count;
        return { name, car, plate, count, density };
    }

    const rows = [
        createData('Name Surname', 'BMW', '777OO77', 4),
        createData('Name Surname', 'BMW', '777OO77', 4),
        createData('Name Surname', 'BMW', '777OO77', 4),
        createData('Name Surname', 'BMW', '777OO77', 4),
        createData('Name Surname', 'BMW', '777OO77', 4),
        createData('Name Surname', 'BMW', '777OO77', 4),
        createData('Name Surname', 'BMW', '777OO77', 4),
        createData('Name Surname', 'BMW', '777OO77', 4),
        createData('Name Surname', 'BMW', '777OO77', 4),
        createData('Name Surname', 'BMW', '777OO77', 4),
    ];
    const rowsPerPage = 5;

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
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map(column => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {/*{column.format && typeof value === 'number' ? column.format(value) : value}*/}
                                                        aaa
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}

                                <TableRow hover={true} onClick={() => {handleClick(1)}}>
                                    <TableCell align='center'>Name Surname</TableCell>
                                    <TableCell align='center'>BMW</TableCell>
                                    <TableCell align='center'>777OO77</TableCell>
                                    <TableCell align='center'>4</TableCell>
                                </TableRow>
                                <TableRow hover={true} onClick={() => {handleClick(2)}}>
                                    <TableCell align='center'>Name Surname</TableCell>
                                    <TableCell align='center'>Mercedes-Benz</TableCell>
                                    <TableCell align='center'>77GL777</TableCell>
                                    <TableCell align='center'>1</TableCell>
                                </TableRow>
                                <TableRow hover={true} onClick={() => {handleClick(3)}}>
                                    <TableCell align='center'>Name Surname</TableCell>
                                    <TableCell align='center'>Lada Niva</TableCell>
                                    <TableCell align='center'>76LL666</TableCell>
                                    <TableCell align='center'>2</TableCell>
                                </TableRow>
                                <TableRow hover={true} onClick={() => {handleClick(4)}}>
                                    <TableCell align='center'>Name Surname</TableCell>
                                    <TableCell align='center'>Nissan Tida</TableCell>
                                    <TableCell align='center'>34LO457</TableCell>
                                    <TableCell align='center'>3</TableCell>
                                </TableRow>
                                <TableRow hover={true} onClick={() => {handleClick(5)}}>
                                    <TableCell align='center'>Name Surname</TableCell>
                                    <TableCell align='center'>Toyota Camry</TableCell>
                                    <TableCell align='center'>658LL01</TableCell>
                                    <TableCell align='center'>3</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableFooter>
                                {/*Take from firebase the count of suggested rides*/}
                                <TablePagination
                                    count={rows}
                                    onChangePage={1 + 1}
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