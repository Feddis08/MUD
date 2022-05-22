
const map = require("../maps/map.js");
const IO = require("../IO.js");
class Door {
    id;
    name;
    is_open = false;
    link_points = [];
    activate_commands = [];
    constructor(is_open, name, link_points, activate_commands) {
        this.get_id();
        this.is_open = is_open;
        this.link_points = link_points;
        this.name = name;
        this.activate_commands = activate_commands;
    }
    get_id() {
        this.id = Math.floor(Math.random());
    }
    door_open() {
        this.is_open = true;
    }
    move(player, command) {
        let room = GameServer.map.get_room_by_id(player.room_id);
        let room_name;
        let is_link = false;
        this.link_points.forEach((_, index) => {
            if (is_link) {
                is_link = false;
                if (command[1] == this.link_points[index - 1]) {
                    room_name = this.link_points[index];
                }
            } else {
                is_link = true;
            }
        })
        player.room_id = GameServer.map.get_rooms_by_name(room_name)[0].id;
    }
    commands(player, command) {
        if (command[0] == "move") {
            this.move(player, command);
        }
    }
}
module.exports = Door;