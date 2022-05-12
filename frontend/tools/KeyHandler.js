document.addEventListener("keydown", (evt) => {
    let chat_input = document.querySelector("#chat_input");
    if (evt.code == "Enter") {
        if (chat_input === document.activeElement) {
            if (chat_input.value !== "") {
                IO.chat_send(chat_input.value);
                chat_input.value = "";
            }
        }
    }
})