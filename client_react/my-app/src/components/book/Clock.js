import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {VictoryPie} from 'victory'
import BookStore from '../../stores/BookStore'
import {observer} from 'mobx-react'
import ClockStore from '../../stores/ClockStore';
const useStyles = makeStyles((theme) => ({
    root: {
      clockWrapper:{
        "@media (min-device-width: 481px)": { // PC
          width:'20vw'
        },
      "@media (min-device-width: 320px) and (max-device-width: 480px)": { // Mobile
          width:'80vh'
       }
      }
    }
    // clockWrapper:{
    //   "@media (min-device-width: 481px)": { // PC
    //     width:'40vw'
    //   },
    // "@media (min-device-width: 320px) and (max-device-width: 480px)": { // Mobile
    //     width:'50vh'
    //  }
    // }
}));




const Clock = observer( (props) =>{
    const classes = useStyles()
    const bookStore = React.useContext(BookStore.context)
    const clockStore = React.useContext(ClockStore.context)
    // ["Y","Y","Y","Y","N","N","Y","Y","N","N","N","Y","Y","Y","Y","N","N","N","Y","Y","Y","Y","Y","Y"].
    const selectedColor = "green"
    const bookedColor = "tomato"
    const notBookedColor = "cyan"
    const setStart = props.setStart
    const setEnd = props.setEnd
    const start = props.start
    const end = props.end
    var time = []
    React.useEffect(()=>{
      console.log("reload")
      clockStore.bookedColorScale = []
        for(var i = 0 ; i < bookStore.today_book.length ; i++){
            if(bookStore.today_book[i] == "Y"){
              clockStore.bookedColorScale.push(bookedColor)
                // setBookedColorScale( b=> [...b,bookedColor])
            }
            else{
              clockStore.bookedColorScale.push(notBookedColor)
                // setBookedColorScale(b=> [...b,notBookedColor])
            }
        }
    },[bookStore.today_book, props.state])
    return(
        <div className={classes.root}>
            <div className={classes.clockWrapper}>
                <VictoryPie
                  colorScale={clockStore.bookedColorScale}
                  labelPosition="startAngle"
                    events={[{
                        target: "data",
                        eventHandlers: {
                          onClick: (e) => {
                              console.log(e.target)
                            return [
                              {
                                target: "data",
                                mutation: ({ style }) => {
                                  console.log(style)
                                  if (style.fill === selectedColor)
                                    return null
                                  else if(style.fill !== bookedColor)
                                    return { style: { fill: selectedColor}}
                                }
                              }, {
                                target: "labels",
                                mutation: (props) => {
                                  setEnd(Math.max(end, parseInt(props.text)+1))
                                  setStart(Math.min(start, parseInt(props.text)))
                                  console.log(end)
                                  console.log(start)
                                }
                              }
                            ];
                          }
                        }
                      }
                      ]}
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
})

export default Clock
