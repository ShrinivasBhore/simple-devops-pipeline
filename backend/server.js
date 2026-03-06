const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        version: '2.0.2',
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
});
