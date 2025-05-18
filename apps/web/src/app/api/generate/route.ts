import { NextRequest, NextResponse } from 'next/server';
import { topicsConfig } from '@/lib/topics-config';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // Make sure to secure your API key
  });

async function callOpenAI(prompt: string): Promise<string | null> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini", // Or another model
      messages: [{ role: "user", content: prompt }],
    });
  
    console.log('OpenAI response:', completion);

    if (completion.choices && completion.choices.length > 0 && completion.choices[0] && completion.choices[0].message) {
      return completion.choices[0].message.content;
    } else {
      console.warn('No content found in OpenAI response.');
      return null;
    }
  } catch (error: any) {
    console.error('Error calling OpenAI:', error.message);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { topicId, params } = await req.json();
    console.log('Received request:', { topicId, params });
    const topic = topicsConfig.find((t) => t.id === topicId);
    if (!topic) {
      return NextResponse.json({ error: 'Invalid topicId' }, { status: 400 });
    }
    // Fill the prompt template
    let prompt = topic.promptTemplate;
    for (const param of topic.inputParams) {
      const value = params[param.id] ?? '';
      prompt = prompt.replaceAll(`{${param.id}}`, String(value));
    }
    console.log('Generated prompt:', prompt);
    // Call OpenAI (placeholder)
    const result = await callOpenAI(prompt);
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
} 