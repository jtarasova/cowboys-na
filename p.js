socket.onopen = function (e) {
  socket.send(
    JSON.stringify({
      type: 'CHAT_CONNECT',
    })
  );
};


// in switch in script
    case 'CHAT_CONNECT':
      const newUser = document.createElement('p');
      newUser.innerText = parsed.payload;
      $whoIsHere.append(newUser);
      break;
// in server case 
 case 'CHAT_CONNECT':
        map.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: parsed.type,
                payload: userName,
              })
            );
          }
        });
        break;




