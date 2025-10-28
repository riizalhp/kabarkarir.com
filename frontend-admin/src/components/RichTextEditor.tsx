import * as React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Heading from '@tiptap/extension-heading';

type RichTextEditorProps = {
  initialContent: string;
  onChange: (content: string) => void;
};

type BtnProps = {
  active?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
};

const Btn: React.FC<BtnProps> = ({ active = false, onClick, title, children }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={`px-3 py-1.5 rounded-md text-sm border shadow-sm mr-2 mb-2 transition flex items-center gap-1.5 ${
      active ? 'bg-slate-200' : 'bg-white hover:bg-slate-100'
    }`}
  >
    {children}
  </button>
);

const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialContent, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Underline,
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor focus:outline-none',
      },
    },
  });

  if (!editor) {
    return <div className="text-sm text-slate-500">Memuat editor…</div>;
  }

  const setLink = () => {
    const prev = editor.getAttributes('link').href || '';
    const url = window.prompt('Masukkan URL untuk link:', prev);
    if (url === null) return; // cancel
    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const clearFormatting = () => {
    editor.chain().focus().unsetAllMarks().clearNodes().run();
  };

  return (
    <div className="border border-slate-300 rounded-md">
      <style>{`
        .tiptap-editor p { margin-bottom: 0.75em; }
        .tiptap-editor h1, .tiptap-editor h2, .tiptap-editor h3, .tiptap-editor h4, .tiptap-editor h5, .tiptap-editor h6 { margin-bottom: 0.5em; line-height: 1.2; font-weight: 600; }
        .tiptap-editor h1 { font-size: 2em; }
        .tiptap-editor h2 { font-size: 1.5em; }
        .tiptap-editor h3 { font-size: 1.25em; }
        .tiptap-editor h4 { font-size: 1em; }
        .tiptap-editor ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 0.75em; }
        .tiptap-editor a { color: #3BADEF; text-decoration: underline; cursor: pointer; }
      `}</style>
      <div className="flex flex-wrap items-center p-2 bg-slate-50 rounded-t-md border-b border-slate-300">
        <Btn title="Paragraph" active={editor.isActive('paragraph')} onClick={() => editor.chain().focus().setParagraph().run()}>
          <i className="fas fa-paragraph" />
        </Btn>
        <Btn title="Heading 1" active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</Btn>
        <Btn title="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</Btn>
        <Btn title="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</Btn>
        <Btn title="Heading 4" active={editor.isActive('heading', { level: 4 })} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>H4</Btn>
        
        <Btn title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
            <i className="fas fa-bold" />
        </Btn>
        <Btn title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
            <i className="fas fa-italic" />
        </Btn>
        <Btn title="Underline" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
            <i className="fas fa-underline" />
        </Btn>
        <Btn title="Bullet List" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <i className="fas fa-list-ul" />
        </Btn>
        <Btn title="Set/Unset Link" active={editor.isActive('link')} onClick={setLink}>
            <i className="fas fa-link" />
        </Btn>

        <button className="ml-auto px-3 py-1.5 rounded-md text-sm border bg-white hover:bg-slate-100 shadow-sm"
                title="Clear formatting" onClick={clearFormatting} type="button">
          Clear
        </button>
      </div>

      <div className="p-4 min-h-[200px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default RichTextEditor;