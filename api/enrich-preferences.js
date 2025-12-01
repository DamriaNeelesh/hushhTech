import { parsePhoneNumberFromString } from "libphonenumber-js";

const REQUIRED_FIELDS = [
  "name",
  "email",
  "age",
  "phone_country_code",
  "phone_number",
];

const DEFAULT_COUNTRY = "US";
const DEFAULT_CURRENCY = "USD";

async function deriveGeoHints(phone_country_code, phone_number) {
  try {
    const parsed = parsePhoneNumberFromString(`${phone_country_code}${phone_number}`);
    const iso2 = parsed?.country || DEFAULT_COUNTRY;

    const res = await fetch(`https://restcountries.com/v3.1/alpha/${iso2}`);
    const json = await res.json();
    const currencyCode =
      json && Array.isArray(json) && json[0] && json[0].currencies
        ? Object.keys(json[0].currencies)[0] || DEFAULT_CURRENCY
        : DEFAULT_CURRENCY;
    return { iso2, currencyCode };
  } catch {
    return { iso2: DEFAULT_COUNTRY, currencyCode: DEFAULT_CURRENCY };
  }
}

function buildSchema() {
  return {
    name: "UserPreferenceProfile",
    schema: {
      type: "object",
      additionalProperties: false,
      required: ["food", "drink", "hotel", "coffee", "brand", "lastEnrichedAt"],
      properties: {
        food: {
          type: "object",
          additionalProperties: false,
          required: ["dietType", "spiceLevel", "favoriteCuisines", "budgetLevel", "eatingOutFrequency"],
          properties: {
            dietType: { type: "string", enum: ["veg", "non_veg", "vegan", "mixed", "unknown"] },
            spiceLevel: { type: "string", enum: ["low", "medium", "high", "unknown"] },
            favoriteCuisines: { type: "array", minItems: 1, items: { type: "string" } },
            budgetLevel: { type: "string", enum: ["low", "mid", "high", "unknown"] },
            eatingOutFrequency: {
              type: "string",
              enum: ["rarely", "weekly", "few_times_week", "daily", "unknown"],
            },
          },
        },
        drink: {
          type: "object",
          additionalProperties: false,
          required: [
            "alcoholPreference",
            "favoriteAlcoholTypes",
            "favoriteNonAlcoholicTypes",
            "sugarLevel",
            "caffeineTolerance",
          ],
          properties: {
            alcoholPreference: { type: "string", enum: ["never", "occasionally", "frequently", "unknown"] },
            favoriteAlcoholTypes: { type: "array", minItems: 1, items: { type: "string" } },
            favoriteNonAlcoholicTypes: { type: "array", minItems: 1, items: { type: "string" } },
            sugarLevel: { type: "string", enum: ["low", "medium", "high", "unknown"] },
            caffeineTolerance: { type: "string", enum: ["none", "low", "medium", "high", "unknown"] },
          },
        },
        hotel: {
          type: "object",
          additionalProperties: false,
          required: ["budgetPerNight", "hotelClass", "locationPreference", "roomType", "amenitiesPriority"],
          properties: {
            budgetPerNight: {
              type: "object",
              additionalProperties: false,
              required: ["currency", "min", "max"],
              properties: {
                currency: { type: "string", pattern: "^[A-Z]{3}$" },
                min: { type: "number", minimum: 0 },
                max: { type: "number", minimum: 0 },
              },
            },
            hotelClass: { type: "string", enum: ["hostel", "budget", "3_star", "4_star", "5_star", "unknown"] },
            locationPreference: {
              type: "string",
              enum: ["city_center", "suburbs", "near_airport", "scenic", "unknown"],
            },
            roomType: { type: "string", enum: ["single", "double", "dorm", "suite", "unknown"] },
            amenitiesPriority: { type: "array", minItems: 1, items: { type: "string" } },
          },
        },
        coffee: {
          type: "object",
          additionalProperties: false,
          required: ["coffeeConsumerType", "coffeeStyle", "milkPreference", "sweetnessLevel", "cafeAmbiencePreference"],
          properties: {
            coffeeConsumerType: { type: "string", enum: ["none", "occasional", "daily", "heavy", "unknown"] },
            coffeeStyle: { type: "array", minItems: 1, items: { type: "string" } },
            milkPreference: { type: "string", enum: ["dairy", "oat", "soy", "almond", "none", "unknown"] },
            sweetnessLevel: { type: "string", enum: ["no_sugar", "low", "medium", "high", "unknown"] },
            cafeAmbiencePreference: {
              type: "string",
              enum: ["quiet_work", "casual", "social_loud", "no_preference"],
            },
          },
        },
        brand: {
          type: "object",
          additionalProperties: false,
          required: ["fashionStyle", "techEcosystem", "shoppingChannels", "priceSensitivity", "brandValues"],
          properties: {
            fashionStyle: {
              type: "string",
              enum: ["streetwear", "minimal", "formal", "sporty", "mixed", "unknown"],
            },
            techEcosystem: { type: "string", enum: ["apple", "android", "windows", "mixed", "unknown"] },
            shoppingChannels: { type: "array", minItems: 1, items: { type: "string" } },
            priceSensitivity: {
              type: "string",
              enum: ["very_price_sensitive", "value_for_money", "mid_range", "premium", "unknown"],
            },
            brandValues: { type: "array", minItems: 1, items: { type: "string" } },
          },
        },
        lastEnrichedAt: { type: "string", format: "date-time" },
      },
    },
    strict: true,
  };
}

function validatePayload(payload) {
  const missing = REQUIRED_FIELDS.find((key) => payload[key] === undefined || payload[key] === null || payload[key] === "");
  if (missing) {
    return `Missing required field: ${missing}`;
  }
  if (typeof payload.age !== "number" || Number.isNaN(payload.age)) {
    return "Age must be a number";
  }
  return null;
}

function normalizeBudget(budgetPerNight) {
  if (!budgetPerNight) return budgetPerNight;
  const min = typeof budgetPerNight.min === "number" ? budgetPerNight.min : 0;
  const max = typeof budgetPerNight.max === "number" ? budgetPerNight.max : min;
  return {
    ...budgetPerNight,
    min: Math.min(min, max),
    max: Math.max(min, max),
  };
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
    const validationError = validatePayload(body);
    if (validationError) {
      return response.status(400).json({ error: validationError });
    }

    const { name, email, age, phone_country_code, phone_number, organisation = null } = body;
    const geo = await deriveGeoHints(phone_country_code, phone_number);

    if (!process.env.OPENAI_API_KEY) {
      return response.status(500).json({ error: "OPENAI_API_KEY is not configured" });
    }

    const systemPrompt = `
You are an onboarding preference estimator. Produce realistic defaults for FOOD, DRINK, HOTEL, COFFEE, BRAND using only the provided user information plus broad age/country trends.
Rules:
- Output must follow the JSON schema exactly.
- Never return null. If unsure, use "unknown" or ["unknown"] with minItems:1.
- Keep budgets plausible for the provided currency. Prefer reasonable min/max nightly hotel budgets.
- Avoid inferring sensitive attributes. Be conservative and avoid stereotypes.
- Set lastEnrichedAt to current UTC ISO timestamp.
`.trim();

    const schema = buildSchema();

    const completionPayload = {
      model: "gpt-4o-mini",
      temperature: 0.4,
      response_format: { type: "json_schema", json_schema: schema },
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: JSON.stringify({
            user_profile_seed: {
              name,
              email,
              age,
              phone_country_code,
              phone_number,
              organisation,
              detected_country_iso2: geo.iso2,
              preferred_currency: geo.currencyCode,
            },
          }),
        },
      ],
    };

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(completionPayload),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("OpenAI error:", aiResponse.status, errorText);
      return response
        .status(502)
        .json({ error: "OpenAI request failed", detail: errorText || aiResponse.statusText });
    }

    const data = await aiResponse.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      return response.status(502).json({ error: "OpenAI returned an empty response" });
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
      if (parsed?.hotel?.budgetPerNight) {
        parsed.hotel.budgetPerNight = normalizeBudget(parsed.hotel.budgetPerNight);
      }
      if (!parsed.lastEnrichedAt) {
        parsed.lastEnrichedAt = new Date().toISOString();
      }
    } catch (error) {
      console.error("Failed to parse OpenAI JSON:", error, content);
      return response.status(502).json({ error: "Invalid JSON from OpenAI" });
    }

    return response.status(200).json({ preferences: parsed });
  } catch (error) {
    console.error("Enrichment handler failed:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return response.status(500).json({ error: message });
  }
}
