const express = require('express');
const fetch = require('node-fetch');
const CryptoJS = require('crypto-js');
const app = express();

app.use(express.json());

const secretKey = "deadPenguin37156";

// This is your webhook URL, encrypted with AES
const encryptedWebhook = "U2FsdGVkX18Hn41CN6oi6wzT2+dcKyZ4cO0U+jDXpxKfBXuJbdeE44X68ijSa/OMTV+kCZcR8juoCxBA3J3tiw==";

// Decrypt function
function decryptWebhook(encrypted) {
  const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

const webhookUrl = decryptWebhook(encryptedWebhook);

app.post('/send', async (req, res) => {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    if (!response.ok) return res.status(500).send("Failed to send webhook");
    res.send("Webhook sent");
  } catch (error) {
    console.error("Error sending webhook:", error);
    res.status(500).send("Error");
  }
});

app.listen(3000, () => console.log('Webhook proxy running on http://localhost:3000'));
