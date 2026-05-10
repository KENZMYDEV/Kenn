const {
    useMultiFileAuthState: originalAuth
} = require('@whiskeysockets/baileys')

async function useMultiFileAuthState(folder = 'auth_info') {
    const { state, saveCreds } = await originalAuth(folder)
    return { state, saveCreds }
}

module.exports = { useMultiFileAuthState }
