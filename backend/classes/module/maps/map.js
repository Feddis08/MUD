const Room = require("../room.js");
class Map {
    rooms = [];
    name = null;
    constructor(name) {
        this.name = name;
        this.create_map();
    }
    create_map() {
        this.rooms.push(new Room(this.rooms.length + 1, "test", "name1 2 3", ["2", 2, "3", 3]));
        this.rooms.push(new Room(this.rooms.length + 1, "test", "name2 3 2", ["3", 3, "1", 1]));
        this.rooms.push(new Room(this.rooms.length + 1, "test", "name3 1 2", ["1", 1, "2", 2]));
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