const express = require('express');
const { Rcon } = require('rcon-client');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/rcon', async (req, res) => {
    const { command } = req.body;
    
    try {
        const rcon = await Rcon.connect({
            host: "brotsmp1.minekeep.gg",
            port: 25575, // Standard RCON-Port (oder den Port deines Hosters eintragen)
            password: "1944096b2fbc940d796a1f77"
        });

        const response = await rcon.send(command);
        await rcon.end();

        res.json({ success: true, response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => console.log('RCON Proxy läuft auf Port 3000'));
