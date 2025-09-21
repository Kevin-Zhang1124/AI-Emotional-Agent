/*
Core Backend Files: the heart of my backend

This is my API endpoint that :
  1. Receives messages from frontend
  2. Calls Replicate's AI model
  3. Returns AI responses

What it does:
  - Validates incoming data
  - Formats prompts for the AI
  - Calls Replicate API
  - Returns structured responses
  - Handles errors gracefully
*/

import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';
import { formatPrompt } from '../../../lib/prompt';

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = "" } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Format the prompt with conversation context
    const prompt = formatPrompt(message, conversationHistory);

    // Call Replicate API with Llama model
    const output = await replicate.run(
      "meta/meta-llama-3-8b-instruct",
      {
        input: {
          prompt: prompt,
          max_new_tokens: 200,
          temperature: 0.7,
          top_p: 0.9,
          repetition_penalty: 1.1,
        }
      }
    );

    // Extract the response text
    const response = Array.isArray(output) ? output.join('') : String(output);

    return NextResponse.json({
      response: response.trim(),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error calling Replicate API:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to get response from AI coach',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
