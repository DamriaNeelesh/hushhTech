import { PreferenceSeedInput, UserPreferenceProfile } from "../../types/preferences";

interface EnrichPreferencesResponse {
  preferences: UserPreferenceProfile;
}

const schema: any = {
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
              min: { type: ["number", "null"], minimum: 0 },
              max: { type: ["number", "null"], minimum: 0 },
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

const systemPrompt = `
You are an onboarding preference estimator. Produce realistic defaults for FOOD, DRINK, HOTEL, COFFEE, BRAND using only the provided user information plus broad age/country trends.
Rules:
- Output must follow the JSON schema exactly.
- Never return null. If unsure, use "unknown" or ["unknown"] with minItems:1.
- Keep budgets plausible for the provided currency. Prefer reasonable min/max nightly hotel budgets.
- Avoid inferring sensitive attributes. Be conservative and avoid stereotypes.
- Set lastEnrichedAt to current UTC ISO timestamp.
`.trim();

export default async function enrichPreferences(
  seed: PreferenceSeedInput
): Promise<UserPreferenceProfile> {
  // If a serverless endpoint is available, prefer it.
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    const response = await fetch("/api/enrich-preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(seed),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to enrich preferences (${response.status}): ${errorText || "Unknown error"}`
      );
    }

    const data = (await response.json()) as EnrichPreferencesResponse;
    if (!data?.preferences) {
      throw new Error("Invalid response from enrichment service");
    }

    return data.preferences;
  }

  // Direct call to OpenAI when VITE_OPENAI_API_KEY is present (dev fallback).
  const completionResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.4,
      response_format: { type: "json_schema", json_schema: schema },
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: JSON.stringify({
            user_profile_seed: {
              name: seed.name,
              email: seed.email,
              age: seed.age,
              phone_country_code: seed.phone_country_code,
              phone_number: seed.phone_number,
              organisation: seed.organisation,
            },
          }),
        },
      ],
    }),
  });

  if (!completionResponse.ok) {
    const errorText = await completionResponse.text();
    throw new Error(
      `Failed to enrich preferences via OpenAI (${completionResponse.status}): ${
        errorText || "Unknown error"
      }`
    );
  }

  const data = await completionResponse.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from OpenAI");
  }

  try {
    return JSON.parse(content) as UserPreferenceProfile;
  } catch (error) {
    throw new Error("Failed to parse OpenAI response JSON");
  }
}
