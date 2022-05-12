const IO = {
    socketIO: null,
    send(name, message, to) {
        this.socketIO.to(to).emit(name, message);
    },
}

module.exports = IO;