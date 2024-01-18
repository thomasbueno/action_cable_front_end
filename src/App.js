import actionCable from "actioncable";
import { useEffect, useState } from "react";

const App = () => {
  const cableApp = actionCable.createConsumer("ws://localhost:3000/cable");
  // configura conexão com o backend, utilize o host do seu backend

  const [channel, setChannel] = useState(null);
  // cria um estado para guardar a conexão com o canal socket para troca de mensagens

  useEffect(() => {
    if (channel !== null) channel.unsubscribe();
    // desconecta do socket caso ja exista uma conexao, evita que varias conexões iguais sejam criadas
    setChannel(
      cableApp?.subscriptions.create(
        {
          channel: "NotificationsChannel",
          user_id: 1,
          // canal que será criada a conexão
        },
        {
          received: (message) => {
            // função que será executada ao receber uma mensagem via socket

            console.log("mensagem recebida :D");
            console.log(message);
          },
        }
      )
    );
  }, []);
  return <h1>Working...</h1>;
};

export default App;
