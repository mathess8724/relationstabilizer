import React from 'react';
import './Home.scss';
import { Avatar, Container, Box, Button } from '@material-ui/core';
import logoutIco from '../img/logout-ico.svg';
import { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import MenuAppBar from '../header/MenuAppBar';
import AddModal from '../../components/modals/AddModal';
import RelationBox from '../boxContainers/RelationBox';
import AddRelationModal from '../modals/AddRelationModal'

const Home = (props) => {
    const handleOpen = () => setOpen(!open)
    const [isLogout, setIsLogout] = useState(false)
    const [relationsArray, setRelationsArray] = useState('relationarray')
    const [open, setOpen] = useState(false)
 

    const defaultProps = {
        bgcolor: 'rgb(240, 240, 240)',
        m: 1,
        border: 1,
    };

    useEffect(() => {
        setRelationsArray(props.userDB)
    }, [props.userDB])
    

    const handleLogout = () => {
        firebase.auth().signOut()
        props.setUser([])
    }
    

    return (
        <div className='homeBody'>
            <MenuAppBar
                user={props.user}
                logout={handleLogout}
                color='secondary' />
            <Container>
                <div>
                    <center >
                        {
                            props.userDB &&
                            !props.userDB.relations && 
                            <Button  style={{ marginTop: '20%' }} onClick={() => handleOpen()}       variant="contained" >+ add relation </Button>
                        }
                    </center>
                </div>
                {
                    props.userDB.relations &&
                    <Box className="relationsConainer">
                        <center>
                            {
                                props.userDB.relations &&
                                props.userDB.relations.map((relation, index) => (
                                    <div>
                                        <RelationBox
                                        key={index}
                                        relation={relation}                                        
                                        setOpen={setOpen}
                                        userDB={props.userDB}
                                        user={props.user} 
                                        testProps={'testProps'}
                                        />                                        
                                    </div>
                                ))
                            }
                        </center>
                    </Box>
                }
                <AddModal
                    open={open}
                    setOpen={setOpen}
                    userDB={props.userDB}
                    user={props.user}
                     />
            </Container>
        </div>
    );
};

export default Home;