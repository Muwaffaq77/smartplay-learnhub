
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState("");
  
  // Placeholder messages
  const [messages] = useState([
    { id: 1, text: "مرحباً بك في SmartPlay!", sender: "system", time: "10:00" },
    { id: 2, text: "كيف يمكنني مساعدتك اليوم؟", sender: "system", time: "10:01" },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // In a real app, this would send the message to a backend
    console.log("Sending message:", message);
    
    // Clear the input
    setMessage("");
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 h-[calc(100vh-12rem)]">
        <div className="flex flex-col h-full">
          <div className="bg-primary/10 p-4 rounded-t-lg">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <MessageSquare className="h-6 w-6" />
              الدردشة التعليمية
            </h1>
            <p className="text-muted-foreground">اسأل أي سؤال عن المواد التعليمية</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-900 space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-xs opacity-70 block text-right mt-1">{msg.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <form 
            onSubmit={handleSendMessage}
            className="p-4 bg-background border-t flex gap-2"
          >
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default Chat;
