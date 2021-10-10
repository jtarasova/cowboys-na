// console.log('hello');

// const socket = new WebSocket('ws://localhost:3000');
const socket = new WebSocket(window.location.origin.replace('http', 'ws')); // before deploy

const $chatForm = document.forms.chat;
const $chatik = document.querySelector('.chatik');
const $whoIsHere = document.querySelector('.who-is-here');

const createMessage = (author, text) => {
  const $oneMessage = document.createElement('div');
  $oneMessage.innerHTML = `<strong>${author}</strong>: ${text}`;
  return $oneMessage;
};

socket.onopen = function (e) {
  socket.onmessage = function (message) {
    const parsed = JSON.parse(message.data);
    switch (parsed.type) {
      case 'NEW_MESSAGE':
        // eslint-disable-next-line no-case-declarations
        //   console.log('new message');
        const $newMessage = createMessage(
          parsed.payload.name,
          parsed.payload.message
        );
        $chatik.append($newMessage);
        return console.log('new message', parsed);
      default:
        break;
    }
  };

  $chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = $chatForm.text.value;
    console.log(message);
    if (message) {
      socket.send(
        JSON.stringify({
          type: 'NEW_MESSAGE',
          payload: message,
        })
      );

      $chatForm.reset();
    }
  });
};
