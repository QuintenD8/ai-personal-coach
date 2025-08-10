import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newChat = [...chat, { role: 'user', content: message }];
    setChat(newChat);
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context: newChat }),
      });

      const data = await res.json();
      setChat([...newChat, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>AI Personal Coach</h1>
      <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '300px' }}>
        {chat.map((msg, i) => (
          <p key={i}><strong>{msg.role}:</strong> {msg.content}</p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: '80%', padding: '8px' }}
        placeholder="Typ je bericht..."
      />
      <button onClick={sendMessage} style={{ padding: '8px 12px' }}>Stuur</button>
    </div>
  );
}

export default App;
