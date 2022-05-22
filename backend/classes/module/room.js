const Door = require("./res/door.js")
const IO = require("./IO.js")
class Room {
    id = null
    discribtion = "";
    player_join_text = "";
    players = [];
    name = "";
    items = [];
    constructor(name) {
        this.name = name;
        this.get_id();
    }
    remove_player_by_id(id) {
        this.players.forEach((client, index) => {
            if (id == client.id) {
                this.players.splice(index, 1);
            }
        })
    }
    add_player(player) {
        this.players.push(player);
        this.commands(player, ["player_join"]);
        IO.send("chat", this.player_join_text, player.socketID, true);
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