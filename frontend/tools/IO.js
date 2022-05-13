const IO = {
    socketIO: null,
    id: null,
    server_address: null,
    chat_text_color: null,
    chat_text_color_server: null,
    chat_text_size: null,
    send(name, message) {
        this.socketIO.emit(name, message);
    },
    connect(server_address) {
        this.socketIO = io.connect(server_address);
        this.id = this.socketIO.id;
        this.server_address = server_address;
        this.socketIO.on("join", (data) => {
            console.log(data);
        })
    },
    chat1_write(message) {
        let chatOutput1 = document.querySelector("#chatOutput1");
        let style;
        if (message.from_server) {
            style = "style='font-size: " + this.chat_text_size + "; color: " + this.chat_text_color_server + "'";
        } else {
            style = "style='font-size: " + this.chat_text_size + "; color: " + this.chat_text_color + "'";
        }
        chatOutput1.innerHTML = chatOutput1.innerHTML + "<p " + style + " >" + message.message + "</p>";
        autoScroll();
    },
    chat_send(message) {
        this.send("chat", message);
        console.log(message);
    }
}