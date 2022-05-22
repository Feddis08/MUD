const Room = require("../room.js");
const Door = require("../res/door.js");
class Map {
    rooms = [];
    all_items = [];
    name = null;
    constructor(name) {
        this.name = name;
        this.create_map();
    }
    create_map() {
        let room;
        room = new Room("Spawn");
        room.items.push(new Door(true, "test", ["Spawn", "Spawn"]))
        room.id = 1;
        this.rooms.push(room);
        room = new Room("test");
        this.rooms.push(room);
    }
    get_rooms_by_name(name) {
        let result = [];
        this.rooms.forEach((room, index) => {
            if (room.name === name) {
                result.push(room);
            }
        })
        return result;
    }
    get_room_by_id(id) {
        let result;
        this.rooms.forEach((room, index) => {
            if (room.id === id) {
                result = room;
            }
        })
        return result;
    }
}
module.exports = Map;