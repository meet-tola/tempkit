import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function generateWithGemini(prompt: string, systemPrompt?: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

  const fullPrompt = systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt

  const result = await model.generateContent(fullPrompt)
  const response = await result.response
  return response.text()
}

export async function generateStructuredContent(prompt: string, schema: any) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
      responseMimeType: "application/json",
    },
  })

  const systemPrompt = `You are an expert document creator for creative professionals. Generate professional documents in Tiptap JSON format.

Create structured, professional documents with:
- Clear headings and sections
- Professional language appropriate for business
- Placeholder text in brackets like [Client Name], [Project Name], [Date]
- Proper formatting with paragraphs, lists, and emphasis
- Industry-standard content for the document type

Return valid Tiptap JSON structure with proper node types:
- Use "paragraph" for text blocks
- Use "heading" with level attribute for headings
- Use "text" nodes with optional marks for formatting
- Use "bulletList" and "listItem" for lists
- Include "hardBreak" for line breaks where needed

Return JSON in this exact format:
{
  "title": "Document Title",
  "content": {
    "type": "doc",
    "content": [
      // Tiptap document nodes here
    ]
  },
  "category": "PROPOSAL|CONTRACT|INVOICE|BRIEF|NDA|LEGAL"
}`

  const result = await model.generateContent(`${systemPrompt}\n\n${prompt}`)
  const response = await result.response
  return JSON.parse(response.text())
}
