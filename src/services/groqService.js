const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function sendMessageToGroq(message, conversationHistory = []) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('Groq API key is not configured. Please add VITE_GROQ_API_KEY to your .env file.');
  }

  // Build messages array with conversation history
  const messages = [
    {
      role: 'system',
      content: 'You are Tafita AI, a helpful, friendly, and knowledgeable assistant. Provide clear, accurate, and helpful responses.'
    },
    ...conversationHistory.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    })),
    {
      role: 'user',
      content: message
    }
  ];

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Fast and powerful model
        messages: messages,
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 1,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('Groq API Error:', error);
    throw error;
  }
}
