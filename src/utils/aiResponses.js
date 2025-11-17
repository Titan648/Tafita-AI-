const responses = {
  greetings: [
    "Hello! I'm Tafita AI, your helpful assistant. How can I help you today?",
    "Hi there! I'm here to assist you with any questions you might have.",
    "Greetings! What would you like to know?"
  ],
  
  default: [
    "That's an interesting question! While I'm a demo AI, I can provide general information and assistance. In a full implementation, I would be connected to a real AI model to give you more detailed answers.",
    "I appreciate your question! As a demonstration AI assistant, I'm here to show how a chat interface works. A production version would use advanced AI models to provide comprehensive responses.",
    "Thank you for asking! This is a demo version of Tafita AI. In a complete implementation, I would leverage powerful AI models to give you detailed and accurate information."
  ],

  capabilities: [
    "I'm Tafita AI, a demonstration chat assistant. In a full version, I would be able to help with a wide range of tasks including answering questions, writing content, coding assistance, analysis, and much more!",
    "As Tafita AI, I'm designed to be a helpful, harmless, and honest assistant. This demo shows the interface - a production version would include advanced AI capabilities for various tasks."
  ]
};

export function generateAIResponse(userMessage) {
  const message = userMessage.toLowerCase();
  
  if (message.match(/^(hi|hello|hey|greetings)/)) {
    return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
  }
  
  if (message.includes('what can you do') || message.includes('capabilities') || message.includes('what are you')) {
    return responses.capabilities[Math.floor(Math.random() * responses.capabilities.length)];
  }

  if (message.includes('artificial intelligence') || message.includes('what is ai')) {
    return "Artificial Intelligence (AI) refers to computer systems designed to perform tasks that typically require human intelligence. This includes learning, reasoning, problem-solving, perception, and language understanding. AI can be categorized into narrow AI (designed for specific tasks) and general AI (theoretical systems with human-like intelligence across all domains).";
  }

  if (message.includes('quantum computing')) {
    return "Quantum computing is a revolutionary approach to computation that leverages quantum mechanical phenomena like superposition and entanglement. Unlike classical computers that use bits (0 or 1), quantum computers use quantum bits or 'qubits' that can exist in multiple states simultaneously. This allows them to solve certain complex problems exponentially faster than classical computers, particularly in areas like cryptography, drug discovery, and optimization.";
  }

  if (message.includes('poem') && message.includes('nature')) {
    return `Here's a poem about nature:

Whispers of the ancient trees,
Dancing gently in the breeze,
Mountains standing tall and proud,
Rivers singing clear and loud.

Flowers blooming in the spring,
Birds that soar on graceful wing,
Sunset paints the sky with gold,
Nature's beauty to behold.

Stars that twinkle in the night,
Moon that bathes the world in light,
Earth's embrace, forever true,
Nature's gift, forever new.`;
  }
  
  return responses.default[Math.floor(Math.random() * responses.default.length)];
}
