import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, loadUsers } from '../redux/action';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  const useStyles = makeStyles({
    table: {
        marginTop: 100,
        minWidth: 900,
    },
  });

  const useButtonStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  
const Home = () => {
    const classes = useStyles();
    const buttons = useButtonStyles();

    let dispatch = useDispatch();
    const { users } = useSelector(state => state.data)

    useEffect(() => {
        dispatch(loadUsers());
    }, [])

    const handleDelete = (id) => {
      if(window.confirm("Are you sure you wanted to delete the user ?")) {
        dispatch(deleteUser(id));
      }
    }

  return (
    <div>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">Contact</StyledTableCell>
                    <StyledTableCell align="center">Address</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {users.map((user) => (
                    <StyledTableRow key={user.id}>
                    <StyledTableCell component="th" scope="user">
                        {user.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">{user.email}</StyledTableCell>
                    <StyledTableCell align="center">{user.contact}</StyledTableCell>
                    <StyledTableCell align="center">{user.address}</StyledTableCell>
                    <StyledTableCell align="center">
                    <div className={buttons.root}>
                      <ButtonGroup  aria-label="outlined primary button group">
                        <Button color="secondary" onClick={()=> handleDelete(user.id)}>Delete</Button>
                        <Button color="primary">Edit</Button>
                      </ButtonGroup>
                    </div>
                    </StyledTableCell>
                    </StyledTableRow>
                ))}
                 
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}

export default Home
