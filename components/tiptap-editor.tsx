"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import Document from "@tiptap/extension-document"
import Paragraph from "@tiptap/extension-paragraph"
import Text from "@tiptap/extension-text"
import Bold from "@tiptap/extension-bold"
import Italic from "@tiptap/extension-italic"
import Underline from "@tiptap/extension-underline"
import Heading from "@tiptap/extension-heading"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ListItem from "@tiptap/extension-list-item"
import Link from "@tiptap/extension-link"
import { Button } from "@/components/ui/button"
import { BoldIcon, ItalicIcon, UnderlineIcon, List, ListOrdered, Heading1, Heading2, Heading3 } from "lucide-react"

interface TiptapEditorProps {
  content: any
  onChange: (content: any) => void
  editable?: boolean
  theme?: any
}

export function TiptapEditor({ content, onChange, editable = true, theme }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList,
      OrderedList,
      ListItem,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON())
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="w-full">
      {editable && (
        <div className="border-b border-slate-200 pb-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={editor.isActive("bold") ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <BoldIcon className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive("italic") ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <ItalicIcon className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive("underline") ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon className="w-4 h-4" />
            </Button>
            <div className="w-px h-6 bg-slate-300 mx-1"></div>
            <Button
              variant={editor.isActive("heading", { level: 1 }) ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
              <Heading1 className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive("heading", { level: 2 }) ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
              <Heading2 className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive("heading", { level: 3 }) ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
              <Heading3 className="w-4 h-4" />
            </Button>
            <div className="w-px h-6 bg-slate-300 mx-1"></div>
            <Button
              variant={editor.isActive("bulletList") ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={editor.isActive("orderedList") ? "default" : "outline"}
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <div className={`prose max-w-none ${theme ? `prose-headings:${theme.text}` : "prose-headings:text-violet-600"}`}>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
