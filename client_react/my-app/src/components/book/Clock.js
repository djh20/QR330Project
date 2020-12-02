import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {VictoryPie} from 'victory'
const useStyles = makeStyles((theme) => ({
    root: {
    },
    clockWrapper:{
        width:'40vw'
    }
}));




export default function Clock(props){
    const classes = useStyles()
    const booked = ["Y","Y","Y","Y","N","N","Y","Y","N","N","N","Y","Y","Y","Y","N","N","N","Y","Y","Y","Y","Y","Y"]
    const selectedColor = "green"
    const bookedColor = "tomato"
    const notBookedColor = "cyan"
    const [bookedColorScale,setBookedColorScale] = React.useState([ ])
    var time = []
    React.useEffect(()=>{
        for(var i = 0 ; i < booked.length ; i++){
            if(booked[i] == "Y"){
                setBookedColorScale( b=> [...b,bookedColor])
            }
            else{
                setBookedColorScale(b=> [...b,notBookedColor])
            }
        }
    },[])
    return(
        <div className={classes.root}>
            <div className={classes.clockWrapper}>
                <VictoryPie
                  colorScale={bookedColorScale}
                  labelPosition="startAngle"
                    events={[{
                        target: "data",
                        eventHandlers: {
                          onClick: (e) => {
                              console.log(e)
                            return [
                              {
                                target: "data",
                                mutation: ({ style }) => {
                                  if (style.fill === selectedColor)
                                    return null
                                  else if(style.fill !== bookedColor)
                                    return { style: { fill: selectedColor}}
                                }
                              }
                            ];
                          }
                        }
                      }]}
                      style={{
                        data: {
                          fillOpacity: 0.9, stroke: "#FFFFFF", strokeWidth: 4
                        },
                      }}
                data={[
                    { x: 0, y: 1 },
                    { x: 1, y: 1 },
                    { x: 2, y: 1 },
                    { x: 3, y: 1 },
                    { x: 4, y: 1 },
                    { x: 5, y: 1 },
                    { x: 6, y: 1 },
                    { x: 7, y: 1 },
                    { x: 8, y: 1 },
                    { x: 9, y: 1 },
                    { x: 10, y: 1 },
                    { x: 11, y: 1 },
                    { x: 12, y: 1 },
                    { x: 13, y: 1 },
                    { x: 14, y: 1 },
                    { x: 15, y: 1 },
                    { x: 16, y: 1 },
                    { x: 17, y: 1 },
                    { x: 18, y: 1 },
                    { x: 19, y: 1 },
                    { x: 20, y: 1 },
                    { x: 21, y: 1 },
                    { x: 22, y: 1 },
                    { x: 23, y: 1 }
                ]}
                />
            </div>
        </div>
    )
}
