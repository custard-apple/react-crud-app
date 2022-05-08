import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser, updateUser } from '../redux/action';


const useStyles = makeStyles((theme) => ({
  root: {
      marginTop: 100,
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
    },
  },
}));


const EditUser = () => {
    const classes = useStyles();
    const [ state, setState ] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
    });

    const [error, setError ] = useState("");

    const { name, email, contact, address } = state;

    let history = useNavigate();
    let dispatch = useDispatch();


    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState( { ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !address || !email || !contact ) {
            setError("Please enter values to the fields");
        } else {
            dispatch(updateUser(state, id));
            history("/");
            setError("");
        }
    }

    let {id} = useParams();

    useEffect(() => {
        dispatch(getSingleUser(id))
    }, []);

    const { user } = useSelector( (state) => state.data );

    useEffect(() => {
        if(user) {
            setState({...user});
        }
    }, [ user ]);

  return (
    <div>
        <Button 
            style={{width:"100px", marginTop: "20px"}}
            variant="contained" 
            color="secondary" 
            type="submit"
            onClick={() => history("/")}
            >
            Go Back
        </Button>
      <h2>Update User</h2>
      {error && <h3 style={{color: "red"}}>{error}</h3>}
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField id="standard-basic" name="name" label="name" onChange={handleInputChange} value={name || ""} type="text" /><br/>
        <TextField id="standard-basic" name="email" label="email" onChange={handleInputChange} value={email || ""} type="email" /><br/>
        <TextField id="standard-basic" name="contact" label="contact" onChange={handleInputChange} value={contact || ""} type="number" /><br/>
        <TextField id="standard-basic" name="address" label="address" onChange={handleInputChange} value={address || ""} type="text" /><br/>
        <Button 
            style={{width:"100px"}}
            variant="contained" 
            color="primary" 
            type="submit"
            >
            Submit
        </Button>
    </form>
    </div>
  )
}

export default EditUser
