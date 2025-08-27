import React, { useState, useRef, useEffect } from 'react';
import { Phone, Send, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
// Bot logo - replace with your own
const botLogoUrl = '/tayer.png';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

const WhatsAppChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('https://your-webhook-url.com/webhook/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messagebody: messageText,
          phone_Number: 'your-phone-number',
          user_id: 'your-user-id',
          sessionId: sessionId
        })
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        let agentReply = 'Thank you for your message. How can I assist you today?';
        
        try {
          if (contentType && contentType.includes('application/json')) {
            // Response is JSON
            let data = await response.json();
            console.log('Webhook JSON response:', data);
            
            // Handle case where response is a stringified JSON
            if (typeof data === 'string') {
              try {
                data = JSON.parse(data);
              } catch (parseError) {
                console.error('Failed to parse stringified JSON:', parseError);
                agentReply = data; // Use the string as-is
              }
            }
            
            // Extract the message from the response array
            if (Array.isArray(data) && data.length > 0 && data[0].output) {
              agentReply = data[0].output;
            } else if (data.output) {
              agentReply = data.output;
            } else if (data.response) {
              agentReply = data.response;
            } else if (typeof data === 'string') {
              agentReply = data;
            }
          } else {
            // Response is plain text
            agentReply = await response.text();
            console.log('Webhook text response:', agentReply);
          }
        } catch (parseError) {
          console.error('Error parsing response:', parseError);
          // Fallback to text response
          try {
            agentReply = await response.text();
          } catch (textError) {
            console.error('Error reading text response:', textError);
          }
        }
        
        // Add agent response
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: agentReply,
          sender: 'agent',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, agentMessage]);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleCallClick = () => {
    // Create and show ElevenLabs widget
    const widgetElement = document.createElement('elevenlabs-convai');
    widgetElement.setAttribute('agent-id', 'agent_######');
    
    const widgetScript = document.createElement('script');
    widgetScript.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    widgetScript.type = 'text/javascript';
    widgetScript.async = true;
    
    document.body.appendChild(widgetElement);
    document.head.appendChild(widgetScript);
    
    toast({
      title: 'Voice Call Started',
      description: 'Connecting you to AI voice assistant...'
    });
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-[#e5ddd5]" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40z'/%3E%3C/g%3E%3C/svg%3E")`
    }}>
      {/* Header */}
      <div className="flex items-center px-4 py-3 bg-[#075e54] shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 mr-2 p-0 h-auto"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex items-center space-x-3 flex-1">
          <img 
            src={botLogoUrl} 
            alt="AI Assistant" 
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <h1 className="font-medium text-white text-[17px] leading-tight">AI Assistant</h1>
            <p className="text-sm text-white/80 leading-tight">online</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 p-0 h-auto mr-2"
          onClick={handleCallClick}
        >
          <Phone className="h-6 w-6" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-1`}
          >
            <div
              className={`max-w-[85%] sm:max-w-sm relative ${
                message.sender === 'user'
                  ? 'bg-[#dcf8c6] rounded-lg rounded-br-none shadow-sm'
                  : 'bg-white rounded-lg rounded-bl-none shadow-sm'
              }`}
            >
              <div className="px-3 py-2">
                <p className="text-[15px] text-gray-900 whitespace-pre-wrap leading-5 break-words">
                  {message.text}
                </p>
                <div className={`flex items-center justify-end mt-1 gap-1 ${
                  message.sender === 'user' ? 'text-gray-600' : 'text-gray-500'
                }`}>
                  <span className="text-[11px] leading-none">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {message.sender === 'user' && (
                    <div className="flex">
                      <Check className="h-3 w-3 text-gray-500" />
                      <Check className="h-3 w-3 text-gray-500 -ml-1" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-1">
            <div className="bg-white rounded-lg rounded-bl-none shadow-sm px-3 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-[#f0f0f0] px-4 py-2">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message"
              className="w-full bg-white border-none rounded-full px-4 py-3 text-[15px] focus:ring-0 focus:outline-none shadow-sm"
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            size="icon"
            className="bg-[#25d366] hover:bg-[#128c7e] text-white rounded-full h-12 w-12 shadow-lg"
            disabled={!inputValue.trim() || isLoading}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default WhatsAppChat;