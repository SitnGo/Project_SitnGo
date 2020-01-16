import React from 'react';
import {classes} from "./style";
import {TextField, Table, TableRow, TableHead, TableBody, TableCell, TableFooter, TablePagination} from '@material-ui/core';
// import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";

const GetRout = () => {
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
            </div>
            <div style={classes.offers}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Driver</TableCell>
                            <TableCell>Car Model</TableCell>
                            <TableCell>Car plate</TableCell>
                            <TableCell>Total Sits</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                        <TableRow hover={true}>
                            <TableCell>Name Surname</TableCell>
                            <TableCell>BMW</TableCell>
                            <TableCell>777OO77</TableCell>
                            <TableCell>4</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter>
                        {/*Take from firebase the count of suggested rides*/}
                        <TablePagination
                            count={100}
                            onChangePage={1 + 1}
                            page={1}
                            rowsPerPage={6}
                        />
                    </TableFooter>
                </Table>
            </div>
        </section>
    );
}

export default GetRout;