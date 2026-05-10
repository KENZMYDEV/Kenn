const readline = require('readline')

async function requestPairingCode(sock, number) {
    if (sock.authState.creds.registered) return null

    await new Promise(r => setTimeout(r, 3000))

    if (number) {
        number = number.replace(/[^0-9]/g, '')
        const code = await sock.requestPairingCode(number)
        const formatted = code.match(/.{1,4}/g).join('-')
        console.log(`🔑 Pairing Code: ${formatted}`)
        return formatted
    }

    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        rl.question('📱 Nomor HP (628xxxxxxxx): ', async (num) => {
            num = num.replace(/[^0-9]/g, '')
            try {
                const code = await sock.requestPairingCode(num)
                const formatted = code.match(/.{1,4}/g).join('-')
                console.log(`🔑 Pairing Code: ${formatted}`)
                console.log('Masukkan di WhatsApp > Perangkat Tertaut')
                resolve(formatted)
            } catch (e) {
                console.log('❌ Error:', e.message)
                resolve(null)
            }
            rl.close()
        })
    })
}

module.exports = { requestPairingCode }
