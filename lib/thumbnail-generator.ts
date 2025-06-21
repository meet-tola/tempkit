import puppeteer from "puppeteer"

export async function generateThumbnail(content: any, templateName: string): Promise<string> {
  try {
    const html = await convertTiptapToHTML(content)

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })

    const page = await browser.newPage()

    await page.setViewport({ width: 400, height: 300, deviceScaleFactor: 2 })

    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${templateName}</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.4;
              color: #1e293b;
              margin: 20px;
              font-size: 12px;
              background: white;
            }
            h1 { font-size: 16px; color: #7c3aed; margin: 0 0 8px 0; }
            h2 { font-size: 14px; color: #7c3aed; margin: 8px 0 4px 0; }
            h3 { font-size: 12px; color: #7c3aed; margin: 6px 0 3px 0; }
            p { margin: 0 0 6px 0; }
            ul, ol { margin: 4px 0; padding-left: 16px; }
            li { margin: 2px 0; }
            strong { color: #1e293b; }
            .header { border-bottom: 2px solid #7c3aed; padding-bottom: 8px; margin-bottom: 12px; }
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `)

    const screenshot = await page.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width: 400, height: 300 },
    })

    await browser.close()

    // Convert to base64 data URL
    const base64 = Buffer.from(screenshot).toString("base64")
    return `data:image/png;base64,${base64}`
  } catch (error) {
    console.error("Thumbnail generation error:", error)
    return "/placeholder-thumbnail.png"
  }
}

async function convertTiptapToHTML(content: any): Promise<string> {
  if (!content || !content.content) {
    return "<p>No content available</p>"
  }

  let html = ""

  for (const node of content.content) {
    html += await nodeToHTML(node)
  }

  return html
}

async function nodeToHTML(node: any): Promise<string> {
  switch (node.type) {
    case "paragraph":
      const pContent = node.content ? await Promise.all(node.content.map(nodeToHTML)) : []
      return `<p>${pContent.join("")}</p>`

    case "heading":
      const level = node.attrs?.level || 1
      const hContent = node.content ? await Promise.all(node.content.map(nodeToHTML)) : []
      return `<h${level}>${hContent.join("")}</h${level}>`

    case "text":
      let text = node.text || ""
      if (node.marks) {
        for (const mark of node.marks) {
          switch (mark.type) {
            case "bold":
              text = `<strong>${text}</strong>`
              break
            case "italic":
              text = `<em>${text}</em>`
              break
            case "underline":
              text = `<u>${text}</u>`
              break
          }
        }
      }
      return text

    case "bulletList":
      const ulContent = node.content ? await Promise.all(node.content.map(nodeToHTML)) : []
      return `<ul>${ulContent.join("")}</ul>`

    case "orderedList":
      const olContent = node.content ? await Promise.all(node.content.map(nodeToHTML)) : []
      return `<ol>${olContent.join("")}</ol>`

    case "listItem":
      const liContent = node.content ? await Promise.all(node.content.map(nodeToHTML)) : []
      return `<li>${liContent.join("")}</li>`

    default:
      return ""
  }
}
