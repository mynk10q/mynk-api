export default async function handler(req, res) {
  const { key, type, term } = req.query;

  // 🔐 API Key Check
  if (key !== 'apimynk') {
    return res.status(401).json({
      success: false,
      message: "Invalid API Key",
      credit: "@mynk_mynk_mynk"
    });
  }

  // 🔍 Required Inputs
  if (!type || !term) {
    return res.status(400).json({
      success: false,
      message: "type and term parameter required",
      credit: "@mynk_mynk_mynk"
    });
  }

  try {
    const upstream =
      `https://mynk-api-185x.vercel.app/api?key=Ravan&type=${encodeURIComponent(type)}&term=${encodeURIComponent(term)}`;

    const response = await fetch(upstream);
    const text = await response.text(); // 👈 IMPORTANT

    let result;
    try {
      result = JSON.parse(text); // try JSON
    } catch {
      return res.status(502).json({
        success: false,
        message: "Upstream did not return JSON",
        upstream_preview: text.slice(0, 120), // debug help
        credit: "@mynk_mynk_mynk"
      });
    }

    // ❌ Remove upstream credit
    if (result.credit) delete result.credit;

    // ✅ Add your credit
    result.credit = "@mynk_mynk_mynk";

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Upstream API fetch failed",
      error: err.message,
      credit: "@mynk_mynk_mynk"
    });
  }
}
