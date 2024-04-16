const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const pipedriveApiKey = '567fa757fee2c93b70340d35a571d78255149585';
const pipedriveApiUrl = 'https://ad.pipedrive.com/api/v1';

app.post('/create-job', (req, res) => {
    if (!req.body.firstName || !req.body.lastName) {
        return res.status(400).json({ status: 'error', message: 'First name and last name are required.' });
    }

    const dealData = {
        title: `New Job from ${req.body.firstName} ${req.body.lastName}`,
        value: req.body.value || 0,
        currency: 'USD'
    };

    axios.post(`${pipedriveApiUrl}/deals?api_token=${pipedriveApiKey}`, dealData)
        .then(response => {
            if (response.data.success) {
                res.json({ status: 'success', message: 'Job created and added to Pipedrive' });
            } else {
                res.status(500).json({ status: 'error', message: 'Failed to create job in Pipedrive' });
            }
        })
        .catch(error => {
            res.status(500).json({ status: 'error', message: 'Failed to create job in Pipedrive', error: error.message });
        });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
