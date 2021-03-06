
function loadPage(href) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", href, false);
    xmlhttp.send();

    return xmlhttp.responseText;
}
sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

visit_me = () => {
    location.href = "https://github.com/Feddis08/MUD";
}
async function connect() {
    let server_address = document.querySelector("#server_address");
    let player_name = document.querySelector("#player_name");
    let text_size = document.querySelector("#text_size");
    let text_color = document.querySelector("#text_color");
    let text_color_server = document.querySelector("#text_color_server");
    let status = document.querySelector("#status");
    status.textContent = "CONNECTING TO SERVER ...";
    IO.connect(server_address.value);
    await sleep(500);
    if (IO.socketIO.connected) {
        status.textContent = "BUILD A CONNECTION ...";
        IO.chat_text_color = text_color.value;
        IO.chat_text_color_server = text_color_server.value;
        IO.chat_text_size = text_size.value;
        IO.send("join", { player_name: player_name.value });
        IO.socketIO.on("join", (data) => {
            if (data.message == "0") {
                status.textContent = "START THE MAIN GAME ...";
                document.body.innerHTML = loadPage("html/game.html")
            }
            if (data.message == "1") {
                console.log("ERROR: Couldn't join server: player_name is already taken!");
                status.textContent = "ERROR: COULD NOT JOIN SERVER: PLAYER_NAME IS ALREADY TAKEN!";
            }
        });
        IO.socketIO.on("chat", (data) => {
            IO.chat1_write(data);
        })
    } else {
        console.log(IO.socketIO.connected)
        document.body.innerHTML = loadPage("html/connection_error.html");
    }
}
play = () => {
    document.body.innerHTML = loadPage("html/join.html")
    let server_address = document.querySelector("#server_address");
    server_address.value = location.hostname + ":" + location.port;
}
autoScroll = () => {
    let chatOutput1 = document.querySelector("#chatOutput1");
    chatOutput1.scrollTop = chatOutput1.scrollHeight;
}
