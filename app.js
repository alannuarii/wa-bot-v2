const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client({
    puppeteer: {
        args: ['--no-sandbox'],
    }
});

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    console.log(session);
});


client.initialize();
client.on("qr", qr => {
    qrcode.generate(qr, { small: true });
})

client.on('ready', () => {
    console.log("ready to message")
});

client.on('message', message => {
    console.log(`Pesan baru dari: ${message.from}`);

    if (message.body === 'Hi') {
        const groupId = message.from.replace(/@c\.us$/, '@g.us');
        // Mengirim pesan teks sebagai tanggapan
        client.sendMessage(groupId, 'Apa njir!');
    }
});

