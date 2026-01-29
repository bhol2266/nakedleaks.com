export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "Image URL is required" });
    }

    const imageResponse = await fetch(url);

    if (!imageResponse.ok) {
      return res.status(400).json({ error: "Failed to fetch image" });
    }

    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ RAW base64 (actual image data)
    const base64Image = buffer.toString("base64");

    res.status(200).json({
      base64: base64Image,
    });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
