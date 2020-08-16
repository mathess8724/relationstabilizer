import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import {Box, TextField} from '@material-ui/core';
import { useEffect } from 'react';
import './AddModal.scss';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useState } from 'react';
import * as firebase from 'firebase';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});


function SimpleDialog(props) {
  //console.log(props.userDB)
  
  const nameRef = useRef('nameRef')

  const classes = useStyles();
  const { onClose, selectedValue, open } = props;


  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  const [addArray, setAddArray] = useState({'currentValue' : 0})
  const [addRelation, setAddRelation] = useState([])
  const handleChange = (value) => {
    //setAddArray(prevState =>({ ...prevState, 'name' : value, 'id': 'rel-' + Date.now()}))
    setAddArray(prevState =>({ ...prevState, 'name' : value, 'id': 'rel-' + Date.now()}))
  }

  const handleAdd = (name) => {
    //console.log(addArray)
    let array = props.userDB.relations ? props.userDB.relations : []
        array.push(addArray)
    //console.log(array)
        let target = `/Users/${props.user.uid}/relations/`
        
        //firebase.database().ref(target).push([addArray])
        firebase.database().ref(target).set(array)
        handleClose()
  }
 
  

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <DialogTitle id="simple-dialog-title"><center>Add a relation</center></DialogTitle>
      <Box className='addRelationContainer'>
        <form onSubmit={(e) => {handleAdd(nameRef); e.preventDefault();}} className="addForm">
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            ref={nameRef}  
            onChange={ (e) => handleChange(e.target.value)}
            />
         <FormControl fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Type of relation</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className='addSelect'
          value={ addArray ? addArray.type : 1}
          onChange={ (e) => setAddArray(prevState =>({ ...prevState, 'type' : e.target.value}))}
          required
          fullWidth
        >
          <MenuItem value={1}>Contact</MenuItem>
          <MenuItem value={2}>Friend</MenuItem>
          <MenuItem value={3}>Crush</MenuItem>
          <MenuItem value={4}>Girlfriend or Boyfriend</MenuItem>
          <MenuItem value={5}>Coleague</MenuItem>
        </Select>
      </FormControl>
      <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className='addSubmit'            
            
            
          >Submit</Button>

        </form>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default function SimpleDialogDemo(props) {
  //console.log(props.userDB)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = (value) => {
    props.setOpen(false);
    
  };

  return (
    <div>      
      <br />      
      <SimpleDialog userDB={props.userDB} user={props.user} open={props.open} onClose={handleClose} />
    </div>
  );
}
