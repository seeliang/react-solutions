import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios"

import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from 'stream-chat-react';
import '@stream-io/stream-chat-css/dist/css/index.css';

const filters = { type: 'messaging', members: { $in: ["dave-matthews"] } };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };


const user = {
  id: 'dave-matthews',
  name: 'Dave Matthews',
};

function App() {
  const [client, setClient] = useState(null);


  useEffect(() => {

    axios.post('http://localhost:1234/name', { user: user.id }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(function (response) {
        const { apiKey, token } = response.data
        const newClient = new StreamChat(apiKey);

        const handleConnectionChange = ({ online = false }) => {
          if (!online) return console.log('connection lost');
          setClient(newClient);
        };

        newClient.on('connection.changed', handleConnectionChange);

        newClient.connectUser(
          user,
          token,
        );

        return () => {
          newClient.off('connection.changed', handleConnectionChange);
          newClient.disconnectUser().then(() => console.log('connection closed'));
        };
      })
      .catch(function (error) {

        console.log(error);
      })
      .finally(function () {

      });




  }, []);

  if (!client) return null;
  return (
    <Chat client={client}>
      <ChannelList filters={filters} sort={sort} options={options} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
}

export default App;
