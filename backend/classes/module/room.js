class Room {
    id = null;
    discribtion = null;
    players = null;
    name = null;
    ways = [];
    constructor(id, discribtion, name, ways,) {
        this.id = id;
        this.discribtion = discribtion;
        this.name = name;
        this.ways = ways;
    }
}
module.exports = Room;