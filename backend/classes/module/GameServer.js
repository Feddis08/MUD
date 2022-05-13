const Player = require("../entities/Player.js");
const chat_messages = require("../module/res/chat_messages.js");
const IO = require("./IO.js");
const Map = require("./maps/map.js");
GameServer = {
    online_clients: [],
    map: null,
    tick_speed: 100,
    start() {
        this.map = new Map("test");
        setInterval(() => {
            this.game_loop();
        }, this.tickSpeed);
    },
    game_loop() {

    },
    add_player_by_socketID(id, name) {
        let name_is_already_taken = false;
        this.online_clients.forEach((client, index) => {
            if (client.player_name == name) {
                name_is_already_taken = true;
            }
        })
        if (name_is_already_taken) {
            IO.send("join", "1", id)
        } else {
            let player = new Player(id, name);
            this.online_clients.push(player);
            IO.send("join", "0", id);
            IO.send("chat", chat_messages.onJoin + "  " + name, id);
        }
    },
    find_player_by_id(id) {
        let result = false;
        this.online_clients.forEach((client, index) => {
            if (client.id == id) {
                result = client;
            }
        })
        return result;
    }
}
module.exports = GameServer;