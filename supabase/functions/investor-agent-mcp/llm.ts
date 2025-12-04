// Phase 3: LLM Helper - OpenAI Integration
// Handles chat completions with GPT-4o-mini

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')!;

interface LLMCallParams {
  systemPrompt: string;
  userMessage: string;
  history?: Array<{ role: string; content: string }>;
  availableTools?: any[];
  temperature?: number;
  maxTokens?: number;
}

export async function callLLM(params: LLMCallParams): Promise<string> {
  const {
    systemPrompt,
    userMessage,
    history = [],
    availableTools,
    temperature = 0.7,
    maxTokens = 1000
  } = params;

  // Build messages array
  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-6), // Last 6 messages for context
    { role: 'user', content: userMessage }
  ];

  // Build request body
  const requestBody: any = {
    model: 'gpt-4o-mini',
    messages,
    temperature,
    max_tokens: maxTokens
  };

  // Add tools if provided
  if (availableTools && availableTools.length > 0) {
    requestBody.tools = availableTools.map(tool => ({
      type: 'function',
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.inputSchema
      }
    }));
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API Error:', error);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Handle tool calls if present
    if (data.choices[0].message.tool_calls) {
      // For now, just return a message indicating tools were called
      // Full tool execution loop would be implemented here
      const toolCalls = data.choices[0].message.tool_calls;
      return `I can help with that. Tools available: ${toolCalls.map((tc: any) => tc.function.name).join(', ')}`;
    }

    return data.choices[0].message.content;

  } catch (error) {
    console.error('LLM call failed:', error);
    throw new Error(`Failed to generate response: ${error.message}`);
  }
}

// Helper to build context-aware system prompts
export function buildSystemPrompt(params: {
  basePrompt: string;
  profileData?: any;
  mode: 'public' | 'private';
}): string {
  const { basePrompt, profileData, mode } = params;

  let prompt = basePrompt;

  if (profileData) {
    prompt += `\n\n=== INVESTOR PROFILE ===\n`;
    prompt += `Name: ${profileData.name}\n`;
    
    if (profileData.organisation) {
      prompt += `Organisation: ${profileData.organisation}\n`;
    }

    if (profileData.age && mode === 'public') {
      prompt += `Age: ${profileData.age}\n`;
    }

    if (profileData.investor_profile) {
      prompt += `\n=== INVESTMENT PREFERENCES ===\n`;
      prompt += JSON.stringify(profileData.investor_profile, null, 2);
    }

    if (profileData.derived_context) {
      prompt += `\n\n=== CONTEXT ===\n`;
      prompt += JSON.stringify(profileData.derived_context, null, 2);
    }

    // Privacy note for public mode
    if (mode === 'public') {
      prompt += `\n\n=== IMPORTANT ===\n`;
      prompt += `You are in PUBLIC mode. Only share information explicitly stated in the profile above. `;
      prompt += `Do NOT infer, guess, or share any sensitive information like email, phone, or private details.`;
    }
  }

  return prompt;
}
