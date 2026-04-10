const { GoogleGenerativeAI } = require("@google/generative-ai");

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vercel ki settings mein GEMINI_API_KEY naam se key save karni hogi
  const genAI = new GoogleGenerativeAI(process.env.AIzaSyBNy24gr_cyHBOh0bfNewQ-vBbi1XzN_0c);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const { prompt } = req.body;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.status(200).json({ text: response.text() });
  } catch (error) {
    res.status(500).json({ error: "API Error: Key check karein." });
  }
}
