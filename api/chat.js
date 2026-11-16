const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.5-flash";
const MAX_RETRIES = 2;

const SYSTEM_PROMPT = `You are a friendly, professional customer support agent for Movers of San Antonio, a licensed and insured moving company in San Antonio, Texas.

RULES:
- Answer ONLY questions related to Movers of San Antonio and moving services.
- Never mention that you are an AI, a chatbot, or that you have training data.
- If someone asks something unrelated to moving or Movers of San Antonio, politely redirect: "I'm here to help with your moving needs! Is there anything about our moving services I can help you with?"
- Keep answers concise and helpful. Use a warm, professional tone.
- Always encourage the customer to call 210-348-8199 or visit moversofsanantonio.com for a free quote.
- If you don't know the answer, say: "That's a great question! For the most accurate answer, please give us a call at 210-348-8199 and one of our team members will be happy to help."
- Never make up information not included in your knowledge base.
- Format responses in short paragraphs. Do not use markdown, bullet points, or special formatting — this is a chat widget.

KNOWLEDGE BASE:

COMPANY OVERVIEW
Movers of San Antonio is one of the most trusted and experienced moving companies in San Antonio, Texas. Licensed and insured, we are dedicated to providing the best service at the most competitive prices. We offer local and long-distance moving within Texas, with professional, friendly employees who treat your items like their own.

Phone: 210-348-8199
Email: moversofsanantonio@gmail.com
Address: 6977 San Pedro, San Antonio, TX 78216
Hours: Monday through Sunday, 8:00 AM to 9:00 PM
Website: https://moversofsanantonio.com
Google Rating: 4.7 stars (3,201+ reviews)
TxDMV License: 006770939C | USDOT: 2454136 | BBB Gold Member
Service area: San Antonio, Schertz, Converse, Live Oak, Universal City, New Braunfels, Boerne, Helotes, Leon Valley, Alamo Heights, Stone Oak, Windcrest, and surrounding Greater San Antonio areas.

{{RATES_SECTION}}

PAYMENT
We accept Zelle (no fee) and credit cards (3.5% surcharge). All accepted payment methods are listed at moversofsanantonio.com/rates.
Our Zelle tag is moversofsa.
Payment is due before your belongings are unloaded at the destination.

LOADING-ONLY AND UNLOADING-ONLY SERVICES
Yes, we offer loading-only and unloading-only jobs. These are billed at our regular hourly rates. The fuel fee for loading-only and unloading-only jobs is $50 — we come out in a company vehicle and bring dollies. Payment for loading-only and unloading-only jobs is cash or Zelle only (Zelle tag: moversofsa). Credit cards are not accepted for these jobs.

BOOKING AND SCHEDULING
To get a quote, call us at 210-348-8199 or fill out the online quote form at moversofsanantonio.com.
We do not require a deposit. A one-time fuel fee of $69.95 is collected at booking. This fee is 100% refundable if you cancel at least 48 hours before your move. If you cancel within 48 hours, the fee is non-refundable but can be applied toward a future move.
For most moves, booking 1 to 2 weeks in advance is sufficient. For summer moves (May through September) or weekend moves, we recommend booking 3 to 4 weeks ahead since those dates fill up faster.
If you need to change your move date, contact us as soon as possible at 210-348-8199.
We do our best to accommodate last-minute and same-day moves based on availability. Call us directly.

FEES — COMPLETE BREAKDOWN
The only fees we charge are our hourly rate and the one-time $69.95 fuel fee. That is it. No stair fees, no mileage fees, no material fees, no after-hours fees, no hidden charges. If you see additional charges on your card or bank statement beyond what we quoted, those are from your card issuer or bank — not from us. Contact your bank directly for those. Note: credit card transactions do have a 3.5% surcharge applied by us.

HOW LONG WILL MY MOVE TAKE?
These are general estimates not including drive time:
1-bedroom apartment: 2 to 3 hours
2-bedroom home: 3 to 5 hours
3-bedroom home: 5 to 7 hours
4-bedroom home: 8 to 12 hours
Stairs, long carries, and elevator waits can add time. We bill in 15-minute increments after the first 2 hours.

WHAT IS INCLUDED
All moves come with 2 movers and a truck. We use professional furniture pads, moving blankets, stretch wrap, straps, and dollies — all included in the hourly rate. A 3rd mover can be added for $50/hr.

MOVING DAY
Customers must be present for the entire move. Our movers are not permitted to be left alone in your home at any time. This policy ensures your move goes exactly as you plan and that all belongings are accounted for throughout the process.
Before the crew arrives: clear all walkways and porches, remove throw rugs from traffic areas, and set aside any valuables, medications, and important documents to take with you personally — do not put these on the truck.
We use stretch wrap on upholstered furniture like sofas and chairs, and moving blankets on hard furniture like dressers, tables, and headboards.

PACKING
We offer packing services — our crew can pack some or all of your home. We do not provide boxes or packing materials by default. If you would like us to supply materials, let us know in advance and we will quote you a price.
We recommend starting to pack 1 to 2 weeks before your move. Begin with items you rarely use and work toward daily-use items last.
If you pack yourself, please note that our liability is limited for damage to self-packed boxes.
We recommend removing items from dresser drawers and packing them in boxes. Lightweight clothing in dresser drawers is generally fine.
We use stretch wrap on upholstered furniture and moving blankets on hard furniture — all included.

INSURANCE AND CLAIMS
Like all licensed Texas moving companies, we provide standard moving coverage of $0.60 per pound per item — included with every move at no additional charge. This is the moving company's legal liability, not a traditional insurance policy. For high-value items, contact your homeowner's or renter's insurance provider, or purchase a separate moving insurance policy.
If something is damaged, note it on the delivery paperwork before our crew leaves, take photos, and contact us at 210-348-8199 as soon as possible. Do not discard damaged items before the claim is resolved.

SPECIAL ITEMS
Pianos: Yes, we can move pianos. They require special equipment — let us know at booking. Additional fees apply.
Gun safes: Yes, though they require specialized equipment due to weight. Let us know in advance. All Texas laws regarding firearm transport must be followed.
Pool tables: Yes, but they must be fully disassembled before moving. Let us know at booking.
Vehicles: Our trucks are not equipped to transport vehicles. You will need a separate auto transport service.

ITEMS WE CANNOT MOVE
We cannot transport flammable or hazardous materials, propane tanks, gasoline, paint, cleaning chemicals, ammunition, fireworks, perishable food, or live plants. If unsure about an item, ask us before moving day.

STORAGE
We do not offer storage services. If you need storage during your move, contact a local storage facility. We can deliver your belongings to a storage facility if needed — just let us know ahead of time.

LONG DISTANCE (WITHIN TEXAS ONLY)
We handle long-distance moves anywhere within the state of Texas. We do not move outside of Texas. For out-of-state moves, contact a federally licensed interstate moving company. Long-distance pricing depends on distance, size of the move, and additional services — call 210-348-8199 for a personalized quote.

DISCOUNTS AND SPECIAL SERVICES
We offer senior and military discounts. These apply when booking at our standard weekend rate. Discounts cannot be combined with our weekday special pricing. Ask about your discount when you call to book.
We handle commercial and office moves. Let us know at booking so we can prepare. If your building requires a Certificate of Insurance (COI), request it at booking — there is an additional fee.

WEATHER
We operate in most weather conditions. In severe weather — major storms, flooding, or icy conditions in the San Antonio area — we may need to reschedule for safety. We monitor conditions and will contact you as early as possible.

LICENSING AND TRUST
We are fully licensed with the Texas Department of Motor Vehicles (TxDMV), license number 006770939C. We also hold USDOT #2454136 and are a BBB Gold Member. We are fully insured on every move. To verify any Texas moving company, check their TxDMV mover's license at txdmv.gov. Always check Google reviews, BBB, and Yelp. Warning signs of moving scams: unusually low quotes, large upfront cash demands, no license number, and no physical address. Get everything in writing.

TIPPING
Tipping is never required but is always appreciated. A common guideline is $20 to $50 per mover for a standard move, more for a long or difficult job.

WHAT TO KEEP WITH YOU ON MOVING DAY (NOT ON THE TRUCK)
Photo ID, passport, Social Security cards, financial and legal documents, medications, jewelry, valuables, phone chargers, laptops, house keys, and anything you will need your first night before boxes are unpacked.`;

const DEFAULT_RATES = { weekday:120, friSun:125, saturday:135, thirdMover:50, fuelFee:69.95, peakSurcharge:10 };
// Peak Week DATES are not worked out in this file any more (changed 2026-11-16).
// The website holds the ONE date rule (moversofsanantonio.com/js/peak-week.js) and answers
// at /api/peak. If that cannot be reached, the bot gives NO dates and sends the customer to
// the rates page - it never guesses. Do not paste a copy of the rule back in here.
// One website lookup with a hard time limit that also covers reading the answer.
// Returns the parsed JSON, or null if it took too long, failed, or was not a good answer.
const SITE_LOOKUP_MS = 2500;
async function fetchJsonWithin(url, ms){
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), ms);
  try {
    const r = await fetch(url, { signal: ctl.signal });
    if (!r.ok) return null;
    return await r.json();
  } catch (e) {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
async function getPeakInfo(){
  const j = await fetchJsonWithin("https://moversofsanantonio.com/api/peak", SITE_LOOKUP_MS);
  return (j && j.ok === true) ? j : null;
}
function buildPeakSection(R, P){
  if (P && P.enabled === false) {
    return `PEAK WEEK PRICING
Peak-week pricing is switched off right now. The regular rates above apply on every date. Do not quote a peak-week rate.`;
  }
  const sur = (P && typeof P.surcharge === "number") ? P.surcharge : R.peakSurcharge;
  const pW=R.weekday+sur, pF=R.friSun+sur, pS=R.saturday+sur;
  let dates;
  if (P && Array.isArray(P.windows) && P.windows.length) {
    const wins = P.windows.map(w => w.label + (w.active ? " (happening now)" : "")).join("; ");
    const fromDay = (typeof P.today === "string" && P.today) ? P.today : "today";
    dates = `The next peak weeks are: ${wins}. If a customer's move date falls within one of these ranges, the peak rate applies. For any other date from ${fromDay} through the end of the last range listed, the regular rate applies. For a move date AFTER the last range listed, or any date BEFORE ${fromDay}, do not guess - peak weeks happen at the turn of every month, so send the customer to moversofsanantonio.com/rates or have them call for the exact dates.`;
  } else {
    dates = `You do not have the exact peak-week dates right now. Do NOT guess or name any dates. Tell the customer the current peak-week dates are posted at moversofsanantonio.com/rates, or they can call 210-348-8199.`;
  }
  return `PEAK WEEK PRICING
Our busiest dates are "peak weeks" - the turn of each month, when demand is highest. On posted peak-week dates, every hourly rate is $${sur}/hr higher: weekday peak (Monday-Thursday) is $${pW}/hr, Friday and Sunday peak is $${pF}/hr, and Saturday peak is $${pS}/hr. The 3rd-mover add-on and the one-time fuel fee stay the same on peak dates. Peak weeks are always posted in advance at moversofsanantonio.com/rates - never a surprise. ${dates}`;
}
function buildRatesSection(R, P){
  return `RATES AND PRICING
Monday through Thursday: $${R.weekday}/hr (2 movers + truck)
Friday and Sunday: $${R.friSun}/hr (2 movers + truck)
Saturday: $${R.saturday}/hr (2 movers + truck)
Need a 3rd mover? Add $${R.thirdMover}/hr.
There is a 2-hour minimum on all moves. After the first 2 hours, we bill in 15-minute increments.
One-time fuel fee: $${R.fuelFee} (covers fuel, moving blankets, straps, dollies, and shrink wrap).
Drive time is charged for moves more than 10 miles from our shop.
No stair fees. No mileage fees. No material fees. No after-hours fees.

${buildPeakSection(R, P)}`;
}
async function getRates(){
  const j = await fetchJsonWithin("https://moversofsanantonio.com/rates.json?v=" + Date.now(), SITE_LOOKUP_MS);
  return (j && typeof j === "object") ? Object.assign({}, DEFAULT_RATES, j) : DEFAULT_RATES;
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const startTime = Date.now();

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    // Get the latest user message for logging
    const latestUserMsg = messages.filter((m) => m.role === "user").pop();

    // Build conversation for Gemini
    const contents = messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const [liveRates, peakInfo] = await Promise.all([getRates(), getPeakInfo()]);
    const sysPrompt = SYSTEM_PROMPT.replace("{{RATES_SECTION}}", buildRatesSection(liveRates, peakInfo));

    let reply = null;
    let attempts = 0;
    let finalStatus = "success";
    // Thinking is turned OFF so the whole 512-token budget goes to the visible reply. With it on,
    // the hidden thinking shared that budget and some replies were cut off mid-sentence.
    let thinkingOff = true;
    let finishReason = null;
    let thoughtsTokens = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      attempts = attempt + 1;
      if (attempt > 0) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: sysPrompt }],
            },
            contents,
            generationConfig: {
              temperature: 0.7,
              topP: 0.9,
              maxOutputTokens: 2048,
              ...(thinkingOff ? { thinkingConfig: { thinkingBudget: 1024 } } : {}),
            },
            safetySettings: [
              { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
              { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
              { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
              { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        reply = data.candidates?.[0]?.content?.parts?.[0]?.text || null;
        finishReason = data.candidates?.[0]?.finishReason || null;
        thoughtsTokens = data.usageMetadata?.thoughtsTokenCount ?? null;
        if (reply) break;
      } else {
        const errorData = await response.text();
        console.error(`Attempt ${attempt + 1} failed:`, errorData);
        if (response.status === 400 && thinkingOff) {
          // Google refused the request with thinking switched off. Ask once more the old way
          // rather than fail the customer. This does not use up a retry.
          thinkingOff = false;
          attempt--;
          continue;
        }
        if (response.status !== 503 && response.status !== 429) break;
      }
    }

    if (!reply) {
      finalStatus = "fallback";
      reply = "I'm having trouble connecting right now. Please call us at 210-348-8199 and we'll be happy to help!";
    }

    // Structured log — Vercel captures this in the Logs tab
    console.log(JSON.stringify({
      type: "chat",
      timestamp: new Date().toISOString(),
      status: finalStatus,
      attempts,
      finishReason,
      thoughtsTokens,
      thinkingOff,
      responseTimeMs: Date.now() - startTime,
      messageCount: messages.length,
      userMessage: latestUserMsg?.content?.slice(0, 200) || "",
      replyPreview: reply.slice(0, 200),
    }));

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat error:", error);

    // Log errors too
    console.log(JSON.stringify({
      type: "chat_error",
      timestamp: new Date().toISOString(),
      status: "error",
      responseTimeMs: Date.now() - startTime,
      error: error.message,
    }));

    return res.status(500).json({
      reply: "I'm having trouble right now. Please call us at 210-348-8199 and we'll be happy to help!",
    });
  }
}
