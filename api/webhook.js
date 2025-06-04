export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { key, t, ip, geo, sys, nav } = req.body || {};

  if (key !== process.env.SECRET_KEY) return res.status(403).send("Forbidden");

  const payload = {
    embeds: [
      {
        title: "🌐 New Visitor Tracked",
        color: 0x00ff00,
        fields: [
          { name: "⏰ Time", value: t || "Unknown", inline: true },
          { name: "🌍 IP", value: ip || "Unknown", inline: true },
          { name: "📍 Location", value: `${geo?.city || "?"}, ${geo?.region || "?"}`, inline: true },
          { name: "🌐 ISP", value: geo?.isp || "Unknown", inline: true },
          { name: "💻 Browser", value: sys?.browser || "Unknown", inline: true },
          { name: "🖥 OS", value: sys?.os || "Unknown", inline: true },
          { name: "📺 Resolution", value: sys?.screen || "Unknown", inline: true },
          { name: "🔗 Page", value: nav?.url || "Unknown", inline: false },
          { name: "🔙 Referrer", value: nav?.ref || "Direct", inline: false },
          { name: "🌐 Language", value: sys?.lang || "Unknown", inline: true },
          { name: "📱 User Agent", value: (sys?.ua || "Unknown").slice(0, 200), inline: false }
        ],
        footer: { text: "soosy.xyz" },
        timestamp: t || new Date().toISOString()
      }
    ]
  };

  try {
    const webhook = process.env.DISCORD_WEBHOOK_URL;
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    return res.status(200).send("Logged");
  } catch (e) {
    console.error("Error sending to Discord:", e);
    return res.status(500).send("Failed to send");
  }
}
