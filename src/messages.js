async function sendMessage(sock, jid, content) {
    return await sock.sendMessage(jid, content)
}

async function sendText(sock, jid, text) {
    return await sock.sendMessage(jid, { text })
}

async function sendButtons(sock, jid, text, buttons) {
    return await sock.sendMessage(jid, {
        text,
        buttons: buttons.map((b, i) => ({
            buttonId: b.id || `btn_${i}`,
            buttonText: { displayText: b.label }
        })),
        headerType: 1
    })
}

async function sendImage(sock, jid, buffer, caption = '') {
    return await sock.sendMessage(jid, {
        image: buffer,
        caption
    })
}

async function sendVideo(sock, jid, buffer, caption = '') {
    return await sock.sendMessage(jid, {
        video: buffer,
        caption
    })
}

async function sendAudio(sock, jid, buffer) {
    return await sock.sendMessage(jid, {
        audio: buffer,
        mimetype: 'audio/mp4'
    })
}

module.exports = {
    sendMessage,
    sendText,
    sendButtons,
    sendImage,
    sendVideo,
    sendAudio
}
