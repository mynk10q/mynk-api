export default async function handler(req, res) {
  const { mobile, key } = req.query;

  // 🔐 Key check
  if (key !== 'apimynk') {
    return res.status(401).json({ error: 'Invalid API key', api: 'by mynk' });
  }

  if (!mobile) {
    return res.status(400).json({ error: 'Mobile number missing', api: 'by mynk' });
  }

  try {
    const upstream = `https://demon.taitanx.workers.dev/?mobile=${encodeURIComponent(mobile)}`;
    const response = await fetch(upstream);
    const text = await response.text();

    let parsed;
    try { parsed = JSON.parse(text); } catch { parsed = text; }

    res.status(200).json({
      api: "by mynk",
      key: "apimynk",
      source: "demon.taitanx.workers.dev",
      data: parsed
    });
  } catch (err) {
    res.status(500).json({
      error: "Upstream error",
      message: err.message,
      api: "by mynk"
    });
  }
}
