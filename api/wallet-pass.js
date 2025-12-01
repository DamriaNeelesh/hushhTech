export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const forward = await fetch("https://hushh-wallet.vercel.app/api/passes/universal/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body || {}),
    });

    if (!forward.ok) {
      const text = await forward.text();
      return res.status(forward.status).json({ error: "Wallet pass generation failed", detail: text });
    }

    const buffer = Buffer.from(await forward.arrayBuffer());
    res.setHeader("Content-Type", "application/vnd.apple.pkpass");
    res.setHeader("Content-Disposition", 'attachment; filename="hushh-profile.pkpass"');
    res.status(200).send(buffer);
  } catch (error) {
    console.error("wallet-pass proxy error:", error);
    res.status(500).json({ error: "Proxy failed", detail: error?.message });
  }
}
