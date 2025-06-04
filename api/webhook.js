export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Your Discord webhook URL (keep this secret)
    const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1379915456755925033/4FrqygdBNubUyAg-mKp5solzf0WUmNytZnGVToriPzKaRbxYyxOGaZZbgTepAj3vbsI1';

    // Forward the request to Discord
    const response = await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      throw new Error(`Discord API responded with status ${response.status}`);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Failed to send webhook' });
  }
}
