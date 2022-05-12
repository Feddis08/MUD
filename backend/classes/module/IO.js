const IO = {
    socketIO: null,
    chat_text_color: null,
    chat_text_size: null,
    send(name, message, to) {
        this.socketIO.to(to).emit(name, message);
    },
}

module.exports = IO;