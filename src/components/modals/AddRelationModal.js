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
    useEffect(() => {
        setAddArray(props.userDB.relations)
        setRelationId(props.relation.id)
        console.log(addArray)
    })
  //console.log(props.userDB.relations)
  const nameRef = useRef('nameRef')

  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const [ relationId,setRelationId] = useState(null)


  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  const [addArray, setAddArray] = useState([])
  const [addRelation, setAddRelation] = useState([])
  const [tempWho, setTempWho] = useState([])
  const [tempDescr,setTempDescr] = useState(null)
  const [tempPercent, setTempPercent] = useState(null)
  
  
  const tempArray = (who,percent, descr, currentValue) => {
      let array = props.relation.actions ?  props.relation.actions : []
          array.push({
            "id" : `action-${Date.now()}`,
            "who" : who,
            "percent": percent,
            "descr" : descr,
            "oldValue" : currentValue
            })  
      
      /* "name" : props.relation.name,
      "id" : props.relation.id,
      "currentValue" : props.relation.currentValue,
      "type":props.relation.type,
      "actions" : [
                    {
                    "id" : `action-${Date.now()}`,
                    "who" : who,
                    "percent": percent
                    }
      ]  */
    //setAddArray([props.relation])
    let finalArray = props.relation
            
    //console.log(finalArray)
    //console.log(addArray)
    //setAddArray(prevState => ({ ...prevState, 'actions' : array}))

    //setAddArray(prevState =>({ ...prevState, array}))
    //console.log(addArray)
    //setAddArray(finalArray)
    //let target = `/Users/${props.user.uid}/relations/${props.relations.indexOf('id', props.relation.id)}`
    //firebase.database().ref(target).set(addArray)
        //console.log(props.relations)
        return array
        
        
  }
  const handleChange = (value, type) => {   
    setRelationId(props.userDB.id)
    //console.log(relationId)
    //type === 'name' && 
    type === 'who' && setTempWho('who')   
    type === 'percent' &&  setTempPercent(value)
    type === 'descr' &&  setTempDescr(value)
    //console.log(addArray)
    //let array = props.relation
    
    
    
  }

  const handleAdd = (name) => {
    let actions = tempArray(tempWho,tempPercent, tempDescr,props.relation.currentValue)
    let target = `/Users/${props.user.uid}/relations/0/actions`
          //console.log(addArray)
            
          firebase.database().ref(target).set(actions)  
   /*  let adArray = addArray 
    setAddArray(prevState => ({ ...prevState, 'actions' : actions}))
    console.log('actions is ',actions)
    console.log('adaray is ',addArray) */
    
    /* props.userDB.relations.map((check,index) => (
       
        check.id.indexOf(relationId) >-1 && console.log('found at ' + index)
        
        //firebase.database().ref(target).set(addArray)
    
        
      )) */
      
     /*  const addAction = (id) => {
          console.log('found at ' + id)
          //let relation = tempArray(tempWho,tempPercent)
          //console.log(relation)
          //let target = `/Users/${props.user.uid}/relations/0/`
          //console.log(addArray)
            
          //firebase.database().ref(target).set(addArray)  

      } */
      
      //console.log(props.userDB.relations.indexOf('relation test',0))
   //console.log(addArray)
       

    
        
        
        
        //firebase.database().ref(target).push([addArray])
        //firebase.database().ref(target).set(array)
        handleClose()
  }

 



    
  

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <DialogTitle id="simple-dialog-title"><center>Add an action</center></DialogTitle>
      <Box className='addRelationContainer'>
        <form onSubmit={(e) => {handleAdd(nameRef); e.preventDefault();}} className="addForm">
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name of action"
            name="name"
            autoComplete="name"
            autoFocus
            ref={nameRef}  
            onChange={ (e) => handleChange(e.target.value, 'name')}
            />
         <FormControl fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Who ?</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className='addSelect'
          value={ addArray ? addArray.type : 1}
          onChange={ (e) => handleChange(e.target.value, 'who')}
          required
          fullWidth
        >
          <MenuItem value={'me'}>Me</MenuItem>
            <MenuItem value={props.relation.name}>{props.relation.name}</MenuItem>          
        </Select>
      </FormControl>
         <FormControl fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Estimated importance</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className='addSelect'
          value={ addArray ? addArray.type : 1}
          onChange={ (e) => handleChange(e.target.value, 'percent')}
          required
          fullWidth
        >
          
          <MenuItem value={5}>5</MenuItem> 
          <MenuItem value={10}>10</MenuItem> 
          <MenuItem value={15}>15</MenuItem> 
          <MenuItem value={20}>20</MenuItem> 
          <MenuItem value={25}>25</MenuItem> 
          <MenuItem value={30}>30</MenuItem> 
          <MenuItem value={35}>35</MenuItem> 
          <MenuItem value={40}>40</MenuItem> 
          <MenuItem value={45}>45</MenuItem> 
          <MenuItem value={50}>50</MenuItem> 
          <MenuItem value={55}>55</MenuItem> 
          <MenuItem value={60}>60</MenuItem> 
          <MenuItem value={65}>65</MenuItem> 
          <MenuItem value={70}>70</MenuItem> 
          <MenuItem value={75}>75</MenuItem> 
          <MenuItem value={80}>80</MenuItem> 
          <MenuItem value={85}>85</MenuItem> 
          <MenuItem value={90}>90</MenuItem> 
          <MenuItem value={95}>95</MenuItem> 
          <MenuItem value={100}>100</MenuItem> 
                     
        </Select>
      </FormControl>
      <TextField 
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="descr"
            label="Short description"
            name="name"
            
            autoFocus
            ref={nameRef}  
            onChange={ (e) => handleChange(e.target.value, 'descr')}
            />
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
  //console.log(props.relation.name)
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
      <SimpleDialog relation={props.relation} userDB={props.userDB} user={props.user} open={props.open} onClose={handleClose} />
    </div>
  );
}
