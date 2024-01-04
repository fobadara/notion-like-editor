const buttonsData = [
  { label: 'Heading 1', shortcut: 'bla bla', action: 'toggleHeading', attributes: { level: 1 } },
  { label: 'Heading 2', shortcut: 'bla bla', action: 'toggleHeading', attributes: { level: 2 } },
  { label: 'Normal Text', shortcut: 'bla bla', action: 'setParagraph' },
];

export function createBubbleMenu(editor) {
  const bubbleMenu = document.createElement('section');
  bubbleMenu.classList.add('bubble-menu');

  buttonsData.forEach((button) => {
    const buttonElement = document.createElement('button');
    buttonElement.innerHTML = `
      <div>Image</div>
      <div>
        <div>
          <div>
            ${button.label}
          </div>
          <small>
            ${button.shortcut}
          </small>
        </div>
      </div>
    `;

    buttonElement.addEventListener('click', () => {
      const { action, attributes } = button;
      if (action && attributes) {
        editor.chain().focus()[action](attributes).run();
      } else if (action) {
        editor.chain().focus()[action]().run();
      }

      hideBubbleMenu();
    });

    bubbleMenu.appendChild(buttonElement);
  });

  document.body.appendChild(bubbleMenu);

  return bubbleMenu;
}

export function showBubbleMenu(x, y) {
}

export function hideBubbleMenu() {
}
