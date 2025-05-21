import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { taskType } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [
        {
          role: "system",
          content: "You are a task creation assistant. Break down the provided task into multiple step-by-step tasks. Each task should be clear and actionable. You must respond in the same language as the input task. For example, if the input is in Portuguese, respond in Portuguese. If it's in English, respond in English. Return a JSON array of objects with 'title' and 'content' properties."
        },
        {
          role: "user",
          content: `Break down this task into multiple step-by-step tasks: ${taskType}. Return a JSON array of objects, where each object has 'title' and 'content' properties. The title should be a short description of the step, and the content should contain detailed instructions for that step. Make sure to respond in the same language as the input task.`
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0].message.content;
    console.log('OpenAI response:', content);

    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    const response = JSON.parse(content);
    
    if (!Array.isArray(response.tasks)) {
      console.error('Invalid response format:', response);
      throw new Error('Invalid response format from OpenAI');
    }

    return NextResponse.json(response.tasks);
  } catch (error) {
    console.error('Error generating tasks:', error);
    return NextResponse.json(
      { error: 'Failed to generate tasks. Please try again later.', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 