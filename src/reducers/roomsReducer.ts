import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../services/consts";
import { createRoom, getRoomsFromServer, Room, RoomData } from "../services/roomsService";

interface RoomState{
    rooms?:Room[],
    error?:string
    status:RequestStatus
}
export const getRoomsAsync=createAsyncThunk('room/getRoomsAsync',
    async () => {
        return await getRoomsFromServer()
    }
)
export const createRoomsAsync=createAsyncThunk('room/createRoomsAsync',
    async (params:{ name: string, numberOfQuestions: number, timeToAnswer: number }) => {
        return await createRoom(params)
    }
)

const initialState:RoomState={
    rooms:undefined,
    error:undefined,
    status:'not started'
}

const roomSlice=createSlice({
    name:'room',
    initialState,
    reducers: {
        reset:(state)=>{
            if (state.status === 'completed')
                state.status ='not started'
        }
    },
    extraReducers(builder) {
       builder.addCase(getRoomsAsync.fulfilled,(state,action)=>{
        state.rooms=action.payload
        state.status='completed'
       });
       builder.addCase(getRoomsAsync.rejected,(state,action)=>{
        state.rooms=undefined
        state.error=action.error.message
        state.status='error'
       })
       builder.addCase(getRoomsAsync.pending,(state)=>{state.status='loading'})
        builder.addCase(createRoomsAsync.pending,(state)=>{state.status='loading'})
        builder.addCase(createRoomsAsync.fulfilled,(state)=>{state.status='completed'})
        builder.addCase(createRoomsAsync.rejected,(state,action)=>{
            state.status='error'
            state.error=action.error.message
        })

    },
})

export default roomSlice.reducer