import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { taskType } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a task creation assistant. Create a concise title and detailed content for the task based on the provided description. Respond in the same language as the input."
        },
        {
          role: "user",
          content: `Create a detailed task for: ${taskType}. Return only a JSON object with 'title' and 'content' properties.`
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    const response = JSON.parse(content);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error generating task:', error);
    return NextResponse.json(
      { error: 'Failed to generate task' },
      { status: 500 }
    );
  }
} 