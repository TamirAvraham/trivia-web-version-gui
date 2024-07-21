const ServerUrl = "http://localhost:8080/api"

export interface RoomData {
    adminId: number,
    isActive: boolean,
    name: string,
    numberOfQuestions: number
    timeToAnswer: number
}
export interface Room{
    users:number[]
    id:number
    data:RoomData
}
export const deserializeRoomDataFromJson = (json: any) => {
    return { adminId: json['adminId'], isActive: json['isActive'], name: json['name'], numberOfQuestions: json['numberOfQuestions'], timeToAnswer: json['timeToAnswer'] } as RoomData
}
export const deserializeRoomFromJson = (json:any) => {
    return {id:json['id'],users:json['users'],data:deserializeRoomDataFromJson(json['roomData'])} as Room;
}
export const getRoomsFromServer = async () => {
    const json = await fetch(`${ServerUrl}/rooms`).then((res) => res.json())
    const roomsAsJsonArray = json["rooms"] as unknown as Array<any>
    return roomsAsJsonArray.map(roomJson => deserializeRoomFromJson(roomJson))
}

export const createRoom = async (params: { name: string, numberOfQuestions: number, timeToAnswer: number }) => {
    const status = await fetch(`${ServerUrl}/create_room`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(params) }).then(res => res.status)
    if (status != 201) {
        throw new Error("Cant Create Room");

    }
}

