const IO = {
    socketIO: null,
    send(name, message, to, send_as_answer) {
        this.socketIO.to(to).emit(name, { message: message, from_server: send_as_answer });
    },
}

module.exports = IO;