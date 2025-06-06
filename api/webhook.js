export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { key, t, ip, geo, sys, nav } = req.body || {};
  if (key !== "fjZ87cnqr-key") return res.status(403).send("Forbidden");

  const fields = [
    { name: "⏰ Time", value: t, inline: true },
    { name: "🌍 IP", value: ip, inline: true },
    { name: "📍 Location", value: `${geo.city}, ${geo.region}`, inline: true },
    { name: "🌐 ISP", value: geo.isp, inline: true },
    { name: "💻 Browser", value: sys.browser, inline: true },
    { name: "🖥 OS", value: sys.os, inline: true },
    { name: "📺 Resolution", value: sys.screen, inline: true },
    { name: "🌐 Language", value: sys.lang, inline: true },
    { name: "🔗 Page", value: nav.url, inline: false },
    { name: "🔙 Referrer", value: nav.ref, inline: false },
    { name: "🌍 Timezone", value: nav.timezone, inline: true },
    { name: "📱 User Agent", value: sys.ua.slice(0, 240), inline: false }
  ];

  const payload = {
    embeds: [
      {
        title: "🌐 New Visitor Tracked",
        color: 0x00ff00,
        fields,
        footer: { text: "soosy.xyz" },
        timestamp: t
      }
    ]
  };

  try {
    const discordWebhook = "https://discord.com/api/webhooks/1379922193542152243/K19LU85LARF1On44CYFXLh56FAAlUBV_ADyVWVLaEmiGyVrKqIUL_R_-1qplKKx0oAOi"; // Replace with your real one
    await fetch(discordWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return res.status(200).send("Logged");
  } catch {
    return res.status(500).send("Failed to send");
  }
}
