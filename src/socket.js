const {
    default: makeWASocketOriginal,
    fetchLatestBaileysVersion,
    DisconnectReason
} = require('@whiskeysockets/baileys')
const P = require('pino')

async function makeWASocket(options = {}) {
    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocketOriginal({
        version,
        logger: P({ level: 'silent' }),
        printQRInTerminal: false,
        connectTimeoutMs: 60000,
        keepAliveIntervalMs: 10000,
        retryRequestDelayMs: 2000,
        browser: ['Kenn', 'Chrome', '20.0.0'],
        ...options,
    })

    // Auto Reconnect - No Connection Close
    sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
        if (connection === 'open') {
            console.log('✅ Connected!')
        }
        if (connection === 'close') {
            const code = lastDisconnect?.error?.output?.statusCode
            if (code !== DisconnectReason.loggedOut) {
                console.log('🔄 Auto Reconnecting...')
                makeWASocket(options)
            } else {
                console.log('❌ Logged out!')
            }
        }
    })

    return sock
}

module.exports = { makeWASocket }
