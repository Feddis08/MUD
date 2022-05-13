class Player {
    socketID;
    id;
    age;
    player_name;
    room_id = 1;
    constructor(socketID, player_name) {
        this.socketID = socketID;
        this.player_name = player_name;
        this.id = socketID;
    }
}
module.exports = Player;