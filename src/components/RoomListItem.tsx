import React from 'react'
import { Room, RoomData } from '../services/roomsService'
import { useDispatch } from 'react-redux'
import { RootState } from '../reducers/store'
import { useSelector } from 'react-redux'
import Error from './Error'
import Loader from './Loader'

function RoomListItem(props:{room:RoomData,onClick:()=>void}) {
    return (
    <div className="room-list-item">
        <h3 className="room-name">{props.room.name}</h3>
        <p className="question-time">Time Per Question: {props.room.timeToAnswer}</p>
        <p className="time-per-question">Number Of Questions: {props.room.numberOfQuestions}</p>
        <button className="join-room-btn" onClick={e=>{e.preventDefault();props.onClick();}}>Join Room</button>
    </div>
  )
}
function RoomButton(params:Room) {
  const error = useSelector((state:RootState)=>state.room.error)
  const status = useSelector((state:RootState)=>state.room.status)
  const dispatch = useDispatch()
  const onClick = ()=>{
    console.log(`this is the join room call`);
    
  }
  switch(status){
    case 'error': return Error({errorMsg:error!})
    case 'not started': return RoomListItem({room:params.data,onClick})
    case 'completed':return RoomListItem({room:params.data,onClick})
    case 'loading':return Loader()
    default: return Error({errorMsg:'err in website wtf did u do????'})
  }
}
export default RoomListItem