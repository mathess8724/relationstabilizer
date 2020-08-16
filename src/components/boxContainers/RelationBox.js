import React, { useEffect } from 'react';
import { Box, Slider } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import './RelationBox.scss';
import { useState } from 'react'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Line } from 'react-chartjs-2';
import IconButton from '@material-ui/core/IconButton';
import Settings from '@material-ui/icons/Settings';
import AddCircleOutline from '@material-ui/icons/Add';
import AddRelationModal from '../modals/AddRelationModal';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


const RelationBox = (props) => {

    const [colorValue, setColorValue] = useState('primary')
    

    //console.log(props.relation)
    useEffect(() => {
        setValue(props.relation.currentValue)
        
    }, [props.relation])

    const defaultProps = {
        bgcolor: 'rgb(240, 240, 240)',
        m: 1,
        border: 1,
    };
    const useStyles = makeStyles({
        root: {
            height: 200,
            color: 'primary'

        },

        settingButton: {
            flexGrow: 1
        }
    });
    const muiTheme = createMuiTheme({
        overrides: {
            MuiSlider: {
                thumb: {
                    color: colorValue
                },
                track: {
                    color: colorValue
                },
                rail: {
                    color: colorValue
                }
            }
        }
    });
    const marks = [
        {
            value: 0,
            label: '0%'

        },
        {
            value: 50,
            label: '50%',
        },
        {
            value: 100,
            label: '100%',
        },
    ];
    const [effortData, seteffortData] = useState()


    const chart = () => {
        seteffortData({
            labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            datasets: [
                {
                    label: 'Your efforts',
                    data: [50, 25, 30, 60, 70, 80, 40,],
                    borderColor: "#4791db",
                    borderDash: [5, 5],
                    backgroundColor: [
                        'transparent'
                    ]

                },
                {
                    label: `${props.relation.name} efforts`,
                    data: [100 - 50, 100 - 25, 100 - 30, 100 - 60, 100 - 70, 100 - 80, 100 - 40,],
                    borderColor: "#e33371",
                    borderDash: [5, 5],
                    backgroundColor: [
                        'transparent'
                    ]
                }
            ]
        })
    }
    useEffect(() => {
        chart()
    }, [])

    const classes = useStyles();

    const handleColor = (theme) => {


        if (value <= 40 || value >= 70) {
            //setColorValue({color: theme.palette.error.main})
        } else {
            //setColorValue({color: theme.palette.error.main})

        }


    }
    const handleChange = (e, values) => {
        setValue(values)

    }
    const [value, setValue] = useState(50)
    const CustomSlider = withStyles(theme => ({
        disabled: value <= 40 || value >= 60 ? { color: theme.palette.error.main } : { color: theme.palette.success.main },
        thumb: value <= 40 || value >= 60 ? { color: theme.palette.error.main } : { color: theme.palette.success.main },
        rail: value <= 40 || value >= 60 ? { color: theme.palette.error.main } : { color: theme.palette.success.main },
        track: value <= 40 || value >= 60 ? { color: theme.palette.error.main } : { color: theme.palette.success.main }
    }))(Slider);

    //let ctx = document.getElementById('myChart').getContext('2d');

    const [open, setOpen] = useState(false)



    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuAdd = () => {
        setOpen(!open)
        handleClose()
    }



    return (
        <Box className='relationBoxBody' borderRadius={4} borderColor="grey.500" {...defaultProps} >
            <div className={classes.settingButton}>


                <Box className='settingButtonContainer'>


                    <div>
                        <IconButton onClick={handleClick} aria-label="delete">
                            <Settings />

                        </IconButton>

                        <Menu
                            
                            id="simple-menu"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                              keepMounted
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleMenuAdd}><AddCircleOutline /> Add an action</MenuItem>
                            
                        </Menu>
                    </div>
                </Box>
            </div>
            <h2><center>{props.relation.name}</center></h2>
            <Box color='palette.primary.light' display='flex' justifyContent='space-around' alignItems='center' className='relationContainer'>

                <Box className='youSliderContainer'>
                    <div style={{ marginBottom: '25px' }}>
                        your efforts
                    </div>
                    <div className={classes.root}>
                        <ThemeProvider theme={muiTheme}>

                            <CustomSlider
                                orientation="vertical"
                                aria-label="test"
                                defaultValue={value}
                                aria-labelledby="vertical-slider"
                                marks={marks}
                                disabled={true}
                                color={handleColor()}
                                onChange={handleChange}
                                valueLabelDisplay="on"

                            />
                        </ThemeProvider>
                    </div>
                </Box>
                <Box className='chartContainer'>
                    <Line
                        data={effortData}
                        options={{
                            responsive: true,
                            fill: false,

                            scales: {
                                yAxes: [
                                    {
                                        gridLines: {
                                            display: false
                                        }
                                    }
                                ],
                                xAxes: [
                                    {
                                        gridLines: {
                                            display: false
                                        }
                                    }
                                ]
                            }
                        }}
                    />
                </Box>
                <Box className='relationSliderContainer'>
                    <div style={{ marginBottom: '25px' }}>
                        {props.relation.name} efforts
                    </div>
                    <div className={classes.root}>
                        <ThemeProvider theme={muiTheme}>

                            <CustomSlider
                                orientation="vertical"
                                aria-label="test"
                                defaultValue={100 - value}
                                aria-labelledby="vertical-slider"
                                marks={marks}
                                disabled={true}
                                color={handleColor()}
                                onChange={handleChange}
                                valueLabelDisplay="on"

                            />
                        </ThemeProvider>
                    </div>
                </Box>

            </Box>
            <Box className='SettingsContainer'>

            </Box>
            <AddRelationModal 
                relation={props.relation}
                open={open}
                user={props.user}
                setOpen={setOpen}
                userDB={props.userDB}
            />
        </Box>
    )

};

export default RelationBox;