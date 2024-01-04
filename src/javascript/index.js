import '../styles/styles.css';

import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { createBubbleMenu, showBubbleMenu, hideBubbleMenu } from './bubbleMenu.js';

const handleSlashCommand = (editor) => {
  const slashCommand = '/1';
  const { selection, doc } = editor.state
  console.log('selection', selection.$cursor)

  if (!selection.empty) {
    return; // Ignore if text is selected
  }

  const { $cursor } = selection;
  const cursorPosition = $cursor.pos;
  const textBeforeCursor = doc.textBetween(0, cursorPosition)
  console.log('textBeforeCursor', textBeforeCursor)

  if (textBeforeCursor.endsWith(slashCommand)) {
    console.log('slashCommand', slashCommand)
  }

};

document.addEventListener('DOMContentLoaded', function () {
  const editor = new Editor({
    element: document.querySelector('.element'),
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            const level = node.attrs.level;
            return `Heading ${level}`;
          }

          return 'Type / for blocks, @ to link docs or people'
        },
      }),
    ],
    onUpdate({ editor }) {
      // console.log('jdsjkdskjdsjk')
      handleSlashCommand(editor)
    }
  });
  createBubbleMenu(editor);
});
