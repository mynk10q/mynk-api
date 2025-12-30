export default async function handler(req, res) {
  const { key, term } = req.query;

  // 🔐 API Key Check
  if (key !== 'apimynk') {
    return res.status(401).json({
      success: false,
      message: "Invalid API Key",
      credit: "@mynk_mynk_mynk"
    });
  }

  // 🔍 Required Input
  if (!term) {
    return res.status(400).json({
      success: false,
      message: "term parameter required",
      credit: "@mynk_mynk_mynk"
    });
  }

  try {
    // ✅ Fixed upstream API
    const upstream =
      `https://codexvortex.vercel.app/api?key=Ravan&type=id_number&term=${encodeURIComponent(term)}`;

    const response = await fetch(upstream);
    const result = await response.json();

    // ❌ Remove upstream credit
    if (result.credit) delete result.credit;

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
