export default async function handler(req, res) {
  const { key, type, term } = req.query;

  // 🔐 Key Validation
  if (key !== 'apimynk') {
    return res.status(401).json({
      success: false,
      message: "Invalid API Key",
      credit: "@mynk_mynk_mynk"
    });
  }

  // 🔍 Required Inputs Check
  if (!type || !term) {
    return res.status(400).json({
      success: false,
      message: "type and term parameter required",
      credit: "@mynk_mynk_mynk"
    });
  }

  try {
    const upstream = `https://umeshkumar-network.vercel.app/api?key=DarkTrace_Network&type=${encodeURIComponent(type)}&term=${encodeURIComponent(term)}`;

    const response = await fetch(upstream);
    const text = await response.text();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }

    return res.status(200).json({
      success: true,
      credit: "@mynk_mynk_mynk",
      your_api_key: "apimynk",
      source: "umeshkumar-network.vercel.app",
      data: parsed
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Upstream API error",
      error: err.message,
      credit: "@mynk_mynk_mynk"
    });
  }
}
