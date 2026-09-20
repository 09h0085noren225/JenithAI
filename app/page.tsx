'use client';
import React, { useState } from 'react';
import { Sparkles, BookOpen, Heart, Send, Globe } from 'lucide-react';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('English');

  const handleSearch = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse('');
    
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, language })
      });
      const data = await res.json();
      setResponse(data.result || 'No response generated.');
    } catch (err) {
      setResponse('Something went wrong. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 text-slate-800 flex flex-col">
      {/* Header */}
      <header className="bg-sky-400 text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-wide">JenithAI</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-sky-500 px-3 py-1 rounded-full text-sm">
            <Globe className="w-4 h-4" />
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-white outline-none cursor-pointer"
            >
              <option value="English" className="text-black">English</option>
              <option value="Hindi" className="text-black">Hindi</option>
              <option value="Hinglish" className="text-black">Hinglish</option>
            </select>
          </div>
          <button className="flex items-center gap-1 bg-rose-500 hover:bg-rose-600 px-3 py-1 rounded-full text-sm font-semibold transition">
            <Heart className="w-4 h-4 fill-white" />
            <span>Heart Mode</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 flex flex-col gap-6">
        <div className="text-center space-y-2 mt-4">
          <h2 className="text-3xl font-extrabold text-sky-900">Your AI Learning Companion</h2>
          <p className="text-sky-700">Ask questions, generate study notes, and learn interactively!</p>
        </div>

        {/* Input Box */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-sky-200 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything (e.g., Explain Photosynthesis)..."
            className="flex-1 border-none outline-none px-2 text-slate-700"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition disabled:opacity-50"
          >
            {loading ? <Sparkles className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            <span>Ask</span>
          </button>
        </div>

        {/* Output Box */}
        {response && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-sky-200 space-y-4">
            <h3 className="text-lg font-bold text-sky-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-500" />
              Generated Response
            </h3>
            <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
              {response}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
