function getMessageText(msg) {
    return (
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        msg.message?.buttonsResponseMessage?.selectedButtonId ||
        msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId ||
        msg.message?.templateButtonReplyMessage?.selectedId ||
        ''
    )
}

function isGroup(jid) {
    return jid.endsWith('@g.us')
}

function isPrivate(jid) {
    return jid.endsWith('@s.whatsapp.net')
}

function isBusiness(jid) {
    return jid.endsWith('@s.whatsapp.net')
}

function getSender(msg) {
    return msg.key.participant || msg.key.remoteJid
}

function isFromMe(msg) {
    return msg.key.fromMe
}

module.exports = {
    getMessageText,
    isGroup,
    isPrivate,
    isBusiness,
    getSender,
    isFromMe
}
