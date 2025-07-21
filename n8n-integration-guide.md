# n8n Integration Guide for Fore Coffee Chatbot

This guide explains how to set up n8n to work with the Fore Coffee chatbot.

## Prerequisites

1. An n8n instance running (either cloud or self-hosted)
2. Basic knowledge of n8n workflows

## Setup Steps

### 1. Create a Webhook Node in n8n

First, you need to create a webhook endpoint in n8n that our chatbot can send messages to:

1. Create a new workflow in n8n
2. Add a "Webhook" node as the trigger
3. Configure the webhook:
   - Method: POST
   - Path: /fore-coffee-chatbot (or any path you prefer)
   - Authentication: Optional (you can add Basic Auth for security)
4. Save the webhook - note the generated webhook URL (it will look something like `https://your-n8n-instance.com/webhook/fore-coffee-chatbot`)

### 2. Process the Message

After the webhook, add nodes to process the incoming message:

1. Add a "Function" node to parse the incoming message:
   ```javascript
   // Example function to process the incoming message
   const incomingMessage = items[0].json.message;
   const userId = items[0].json.userId;
   
   return {
     json: {
       userId,
       incomingMessage,
       timestamp: new Date().toISOString()
     }
   };
   ```

2. Add nodes for your chatbot logic. This could include:
   - "Switch" nodes to handle different types of queries
   - "HTTP Request" nodes to fetch data from your systems
   - "AI" nodes if you want to use AI for natural language processing

### 3. Generate a Response

Create a response to send back to the chatbot:

1. Add a "Function" node to create your response:
   ```javascript
   // Example function to generate a response
   const incomingMessage = items[0].json.incomingMessage.toLowerCase();
   let response;
   
   if (incomingMessage.includes('menu')) {
     response = "We offer a variety of coffee drinks. Our bestsellers include Aren Latte, Fore Melted Chocolate, and Kopi Susu.";
   } else if (incomingMessage.includes('location') || incomingMessage.includes('store')) {
     response = "We have multiple locations throughout Indonesia. You can find our stores in major malls and business districts.";
   } else if (incomingMessage.includes('hours')) {
     response = "Most of our stores are open from 7 AM to 9 PM daily.";
   } else {
     response = "Thank you for contacting Fore Coffee. How can I help you today?";
   }
   
   return {
     json: {
       response,
       userId: items[0].json.userId,
       timestamp: new Date().toISOString()
     }
   };
   ```

2. Connect this to a "Respond to Webhook" node to send the response back

### 4. Activate the Workflow

1. Toggle the "Active" switch in the top-right corner of n8n to activate your workflow
2. Test the webhook by sending a test request

## Integration with the Fore Coffee Website

Once your n8n workflow is set up, you'll need to update the `handleN8nResponse` function in the `ChatbotInterface.jsx` file with your webhook URL. The code is already prepared with a typing indicator and error handling:

```javascript
// Update this function in ChatbotInterface.jsx
const handleN8nResponse = async (userMessage) => {
  // Show typing indicator
  const typingIndicatorId = messages.length + 2;
  setMessages(prevMessages => [
    ...prevMessages,
    { id: typingIndicatorId, text: "...", sender: "bot", isTyping: true }
  ]);
  
  try {
    // Replace 'YOUR_N8N_WEBHOOK_URL' with your actual n8n webhook URL
    const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        userId: 'user-' + Math.random().toString(36).substr(2, 9), // Generate a random user ID
      }),
    });
    
    const data = await response.json();
    const botResponse = data.response;
    
    // Remove typing indicator and add actual response
    setMessages(prevMessages =>
      prevMessages
        .filter(msg => msg.id !== typingIndicatorId)
        .concat({
          id: messages.length + 3,
          text: botResponse,
          sender: "bot"
        })
    );
  } catch (error) {
    console.error('Error communicating with n8n:', error);
    
    // Remove typing indicator and add error message
    setMessages(prevMessages =>
      prevMessages
        .filter(msg => msg.id !== typingIndicatorId)
        .concat({
          id: messages.length + 3,
          text: "Sorry, I'm having trouble connecting to my brain right now. Please try again later.",
          sender: "bot"
        })
    );
  }
};
```

The implementation includes:
- A typing indicator that shows while waiting for the n8n response
- Proper error handling with user-friendly error messages
- Smooth animations for message appearance

## Advanced Features (Optional)

You can enhance your chatbot with these additional n8n features:

1. **Database Integration**: Connect to a database to store conversation history
2. **AI Integration**: Use OpenAI or other AI nodes for more sophisticated responses
3. **CRM Integration**: Connect to your CRM to fetch customer data
4. **Multi-language Support**: Add translation nodes to support multiple languages
5. **Typing Delay Simulation**: Add a delay node in n8n to make responses feel more natural
6. **Context Awareness**: Store previous messages to maintain conversation context
7. **Rich Responses**: Return HTML or structured data for rich message formatting

## Testing Your Integration Locally

Before deploying to production, you can test your n8n integration locally:

1. **Run n8n locally**:
   ```
   npx n8n start
   ```

2. **Use ngrok for local testing**:
   If you're running n8n locally, you can use [ngrok](https://ngrok.com/) to expose your local webhook to the internet:
   ```
   ngrok http 5678
   ```
   This will give you a public URL (like `https://abc123.ngrok.io`) that you can use in your chatbot.

3. **Test with simulated responses**:
   The chatbot is already configured to work with simulated responses if no n8n webhook is provided. This allows you to test the UI before connecting to n8n.

4. **Monitor n8n execution**:
   Use the n8n execution log to monitor incoming requests and debug any issues.

## Troubleshooting

- If the webhook isn't receiving data, check your CORS settings and network connectivity
- If responses are slow, consider optimizing your n8n workflow
- For security, consider adding authentication to your webhook
- If the typing indicator gets stuck, check for unhandled exceptions in your n8n workflow

## Deployment Considerations

When deploying your chatbot with n8n integration to production, consider the following:

1. **Environment Variables**:
   - Store your n8n webhook URL as an environment variable rather than hardcoding it
   - Use a different webhook URL for development and production environments

2. **Performance Optimization**:
   - Optimize your n8n workflow for performance to ensure quick response times
   - Consider caching common responses to reduce load on your n8n instance

3. **Security**:
   - Add authentication to your webhook to prevent unauthorized access
   - Use HTTPS for all communication between your website and n8n
   - Consider rate limiting to prevent abuse

4. **Monitoring**:
   - Set up monitoring for your n8n instance to track usage and errors
   - Implement logging in both your frontend and n8n workflow for debugging

5. **Scalability**:
   - For high-traffic websites, consider using a queue system to handle message processing
   - Deploy n8n on a scalable infrastructure that can handle your expected load

## Need Help?

If you need assistance with your n8n setup, refer to the [n8n documentation](https://docs.n8n.io/) or contact your developer for support.

---

*Last updated: July 2025*