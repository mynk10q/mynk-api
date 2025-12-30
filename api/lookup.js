export default async function handler(req, res) {
  const { key, type, term } = req.query;

  // 🔐 API Key Check
  if (key !== 'mynk') {
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
    // 👇 Updated Upstream API
    const upstream = `https://mynk-api-185x.vercel.app/api?key=Ravan&type=${encodeURIComponent(type)}&term=${encodeURIComponent(term)}`;

    const response = await fetch(upstream);
    const result = await response.json();

    // ❌ Remove upstream credit if exists
    if (result.credit) {
      delete result.credit;
    }

    // ✅ Add your credit
    result.credit = "@mynk_mynk_mynk";

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Upstream API error",
      error: err.message,
      credit: "@mynk_mynk_mynk"
    });
  }
}
