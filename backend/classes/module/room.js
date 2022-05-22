const Door = require("./res/door.js")
class Room {
    id = null;
    discribtion = null;
    players = null;
    name = null;
    items = [];
    constructor(name) {
        this.name = name;
        this.get_id();
    }
    get_id() {
        this.id = Math.floor(Math.random());
    }
    create_door(is_open) {
        let door = new Door(is_open);
        this.items.push(door);
    }
    commands(player, command) {
        this.items.forEach((item, index) => {
            item.commands(player, command);
        })
    }
}
module.exports = Room;