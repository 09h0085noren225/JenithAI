import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function POST(req: Request) {
  try {
    const { prompt, language } = await req.json();

    const formattedPrompt = `You are JenithAI, a helpful student AI tutor. 
    Explain the following topic clearly for a student in ${language} language.
    
    Topic: ${prompt}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedPrompt,
    });

    return NextResponse.json({ result: response.text });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
