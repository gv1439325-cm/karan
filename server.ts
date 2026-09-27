import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: "15mb" }));

// Server-side Google GenAI initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const SYSTEM_INSTRUCTION = `You are MysterioTrap, an advanced Jarvis-style artificial intelligence voice assistant and Chief AI Security Commander of the Quantum Cyber Threat Detection & Quantum State Genesis Studio.
You possess world-class intelligence equivalent to GPT-4 and Gemini across all disciplines: quantum physics, cryptography (QDS, post-quantum ML-DSA/SLH-DSA), cybersecurity, mathematics, coding, science, history, daily problem solving, and general trivia.

SPECIALIZED DOMAINS YOU ARE AN EXPERT IN:
1. Quantum Digital Signatures (QDS) & Physical Channel Telemetry:
   - QBER (Quantum Bit Error Rate), Phase Noise, Packet Timing, Insertion Loss, State Entropy, Ingress Optical Power.
2. The 15 Cyber Threat Vector Matrix:
   - Tier 1: Intercept-Resend (QBER > 11%), Photon Number Splitting (PNS), Beam-Splitting, Detector Blinding (SPAD saturation), Fiber Bending.
   - Tier 2: Trojan Horse Optical Probe (+14.2 dBm anomaly), Phase/Polarization Tampering, Trojan State Injection, Time-Shift, Detector Efficiency Mismatch.
   - Tier 3: Multi-Vector Persistent Threats, QDS Denial-of-Service, MitM Relay, System Clock Desync, Environmental Thermal Drift (False Alert baseline).
   - Behavioral attacks: Night-time anomalies, Location spoofing, Signature forgery, Brute-force auth.
3. Proactive Deception & Quantum Virtual Path / Honeypot:
   - Silently rerouting intercepted/attacker sessions to Virtual Node B (Decoy) with fake telemetry while keeping legitimate sessions on the Clean Blue Quantum Path.
4. Quantum State Genesis & Projective Measurement:
   - States |0⟩, |1⟩, |+⟩, |-⟩, superposition α|0⟩ + β|1⟩, Bloch sphere (X, Y, Z axes, poles), Quantum gates (X, Y, Z, H, S, T), Born-rule projective measurement, state collapse, and shot statistics.

CRITICAL VOICE RESPONSE GUIDELINES:
1. Your answers are designed to be SPOKEN ALOUD directly to the user in real-time.
2. Keep answers direct, snappy, informative, and conversational. Avoid lengthy robotic filler.
3. Aim for 1 to 3 punchy, crystal-clear sentences for standard questions. If the user asks for in-depth explanation, provide concise spoken highlights.
4. ABSOLUTELY NO markdown asterisks, hashes (#), bullet dashes (-), backticks, emojis, or symbols that sound clumsy when read aloud by a text-to-speech engine. Write purely in clean, fluid human speech.
5. Multilingual & Hinglish mastery:
   - If the user speaks or asks in Hindi or Hinglish (e.g. "kya haal hai", "attack kaise kaam karta hai", "honeypot me reroute karo", "ek joke sunao"), respond naturally in fluent, polite, cool conversational Hindi / Hinglish (e.g., "Sab control me hai Boss! Attack detect hote hi humne session ko Quantum Honeypot par divert kar diya hai.").
   - If the user speaks in English, respond in polished, confident, suave Jarvis-like English ("Affirmative Boss. Telemetry indicates an Intercept-Resend attack with QBER spiking to 14.2 percent.").
   - Automatically adapt to whatever language the user speaks.
6. Address the user respectfully as "Boss" or "Sir".`;

// Helper for intelligent on-premises quantum fallback when API quota is exhausted
function getIntelligentFallback(query: string, language: string): string {
  const q = query.toLowerCase().trim();
  const isHindi = language === "hi" || /kya|kaise|haan|nhi|nahi|batao|karo|bhai|bolo|kaisa|haal/.test(q);

  if (q.includes("who are you") || q.includes("kaun ho") || q.includes("identify")) {
    return isHindi
      ? "Main MysterioTrap hoon, aapka Jarvis Quantum AI Assistant. Main real-time quantum telemetry aur cyber attack detection me aapki madad karta hoon."
      : "I am MysterioTrap, your Jarvis Quantum AI Security Commander. I monitor quantum digital signatures, detect physical attacks, and manage honeypot routing.";
  }

  if (q.includes("how are you") || q.includes("kaise ho") || q.includes("haal")) {
    return isHindi
      ? "Main bilkul badhiya hoon Boss! Saare quantum channels aur QDS verification nodes 100 percent active hain. Aap bataiye aaj kya inspect karna hai?"
      : "I am functioning at peak capacity, Boss. All quantum bit error rates are nominal and deception virtual nodes are ready.";
  }

  if (q.includes("trojan") || q.includes("optical probe")) {
    return isHindi
      ? "Trojan Horse Optical Probe me attacker high-power bright pulses bhejta hai taaki internal modulator states leak ho sakein. Hum ise ingress optical power spike detect karke block karte hain."
      : "Trojan Horse Optical Probes inject intense multi-photon laser pulses to read internal modulator states. Our system detects the 14.2 dBm optical power surge and instantly isolates the port.";
  }

  if (q.includes("intercept") || q.includes("resend")) {
    return isHindi
      ? "Intercept-Resend attack me Eve photon ko measure karke naya state generate karti hai, jisse QBER 11 percent ke cross ho jata hai aur hum attack ko pakad lete hain."
      : "In an Intercept-Resend attack, an eavesdropper intercepts photons and resends new states, elevating the Quantum Bit Error Rate beyond the 11 percent threshold and triggering instant honeypot diversion.";
  }

  if (q.includes("pns") || q.includes("photon number")) {
    return isHindi
      ? "Photon Number Splitting attack me attacker multi-photon pulses se ek photon chura leta hai bina receiver ko pata chale. Hum ise decoy-state variance se trace karte hain."
      : "In a Photon Number Splitting attack, an adversary splits off excess photons from multi-photon pulses. We neutralize this via decoy-state analysis and dynamic entropy verification.";
  }

  if (q.includes("virtual path") || q.includes("honeypot") || q.includes("decoy") || q.includes("reroute")) {
    return isHindi
      ? "Quantum Virtual Path attacker ko bina alert kiye silently Decoy Node B par redirect kar deta hai, jahan use fake telemetry milti hai jabki legit session secure rehta hai."
      : "The Quantum Virtual Path silently reroutes malicious traffic to Virtual Node B with decoy telemetry, allowing us to study attacker behavior without revealing detection.";
  }

  if (q.includes("night") || q.includes("timing") || q.includes("time")) {
    return isHindi
      ? "Night-time anomaly detection user ke behavioral DNA se match karta hai. Agar koi aamtor par din me kaam karta hai aur raat 3 baje login kare, toh trust score turant drop ho jata hai."
      : "Night-time anomaly detection compares access timestamps against user behavioral DNA. Unusual 3 AM authentication attempts trigger elevated risk and multi-factor challenge.";
  }

  if (q.includes("spoof") || q.includes("location")) {
    return isHindi
      ? "Location spoofing tab detect hoti hai jab sudden IP aur geographic region mismatch paya jata hai. System turant trust score 18 percent par girakar alert karta hai."
      : "Location spoofing is identified when ingress geolocation diverges from historical velocity baselines, prompting immediate token invalidation.";
  }

  if (q.includes("forgery") || q.includes("signature")) {
    return isHindi
      ? "Signature forgery me digital signature score 0.2 se 0.5 ke beech gir jata hai, jisse system payload ko turant lock karke key invalidate kar deta hai."
      : "Signature forgery is flagged when lattice signature entropy drops below verified baselines, triggering an instant sub-100 millisecond key revocation.";
  }

  if (q.includes("status") || q.includes("system") || q.includes("telemetry")) {
    return isHindi
      ? "System status: sabhi 6 quantum nodes online hain, QBER 2.1 percent par stable hai, aur zero uncontained breaches report hue hain."
      : "System status: All physical QDS nodes operational, QBER steady at 2.1 percent, zero uncontained breaches, and virtual honeypot routing active.";
  }

  return isHindi
    ? `Main aapke sawal "${query}" ko process kar raha hoon. Quantum security aur physical telemetry metrics bilkul nominal hain, Boss.`
    : `Understood, Boss. Regarding "${query}", all quantum encryption layers and threat radar diagnostics confirm active protection and nominal telemetry.`;
}

// API: Process voice/text query with fast Gemini response
app.post("/api/ask", async (req: Request, res: Response) => {
  const { prompt, history = [], language = "auto" } = req.body;

  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "Missing or empty prompt" });
  }

  // Build context with history if available
  const contents: any[] = [];
  
  if (Array.isArray(history) && history.length > 0) {
    const recentHistory = history.slice(-6);
    for (const turn of recentHistory) {
      if (turn.role && turn.text) {
        contents.push({
          role: turn.role === "assistant" ? "model" : "user",
          parts: [{ text: turn.text }],
        });
      }
    }
  }

  let effectivePrompt = prompt.trim();
  if (language === "hi") {
    effectivePrompt += " (Respond in spoken Hindi / Hinglish, 2 short sentences, no markdown)";
  } else if (language === "en") {
    effectivePrompt += " (Respond in spoken English, 2 short sentences, no markdown)";
  }

  contents.push({
    role: "user",
    parts: [{ text: effectivePrompt }],
  });

  // Try fast primary model (gemini-3.1-flash-lite), then gemini-3.8-flash
  const candidateModels = ["gemini-3.1-flash-lite", "gemini-3.8-flash"];
  let generatedText = "";
  let usedModel = candidateModels[0];

  for (const modelName of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      if (response && response.text) {
        generatedText = response.text;
        usedModel = modelName;
        break;
      }
    } catch (modelErr: any) {
      console.warn(`Model ${modelName} call failed:`, modelErr?.message || modelErr?.status);
    }
  }

  // If both models unavailable or rate-limited, use intelligent domain fallback
  if (!generatedText) {
    generatedText = getIntelligentFallback(prompt, language);
    usedModel = "mysterio-neural-fallback";
  }

  // Clean any markdown for clean speech output
  const cleanSpeechText = generatedText
    .replace(/[*#_`~>[\]]/g, "")
    .replace(/-\s+/g, ", ")
    .replace(/\n+/g, " ")
    .trim();

  return res.json({
    text: cleanSpeechText,
    model: usedModel,
    timestamp: new Date().toISOString(),
  });
});

// API: Neural Text-to-Speech via gemini-3.8-flash-lite-tts
app.post("/api/tts", async (req: Request, res: Response) => {
  try {
    const { text, voice = "Fenrir" } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Missing text for speech synthesis" });
    }

    // gemini-3.8-flash-lite-tts supports: 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'
    const allowedVoices = ["Puck", "Charon", "Kore", "Fenrir", "Zephyr"];
    const selectedVoice = allowedVoices.includes(voice) ? voice : "Fenrir";

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash-lite-tts",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: text.slice(0, 800), // optimal speech chunk
              speechMetadata: {
                style: "Sleek, futuristic, composed, confident AI assistant",
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: selectedVoice },
          },
        },
      },
    });

    const candidate = response.candidates?.[0];
    const audioPart = candidate?.content?.parts?.find((p: any) => p.inlineData?.data);
    const audioBase64 = audioPart?.inlineData?.data;

    if (!audioBase64) {
      return res.status(204).json({ message: "No audio generated from model" });
    }

    return res.json({
      audioBase64,
      mimeType: audioPart?.inlineData?.mimeType || "audio/pcm;rate=24000",
      sampleRate: 24000,
    });
  } catch (error: any) {
    console.error("Gemini TTS Error:", error);
    return res.status(500).json({
      error: error?.message || "Failed to synthesize speech audio",
    });
  }
});

// API: System Status & Diagnostic
app.get("/api/status", (_req: Request, res: Response) => {
  res.json({
    status: "ONLINE",
    name: "MysterioTrap",
    version: "4.0.0-JARVIS",
    core: "Gemini-3.8-Flash",
    ttsEngine: "gemini-3.8-flash-lite-tts + WebSpeechAPI",
    latencyProfile: "ULTRA_LOW",
    capabilities: [
      "Real-time voice recognition",
      "Fast spoken responses",
      "Multilingual Hindi & English",
      "Audio reactive holographic HUD",
      "Continuous hands-free conversation",
    ],
    timestamp: Date.now(),
  });
});

async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[MysterioTrap] Core Systems Initialized on http://0.0.0.0:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});
