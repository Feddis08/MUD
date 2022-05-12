const IO = {
    socketIO: null,
    id: null,
    server_address: null,

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
        chatOutput1.innerHTML = chatOutput1.innerHTML + "<p style='font-size: 32px'>" + message + "</p>";
    }
}