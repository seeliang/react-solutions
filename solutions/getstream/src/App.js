import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios"
import { apiKey } from './credentials'
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


const user = {
  id: '7186',
  name: 'Dave Matthews',
};

// type => Channel Types in dashboard, $in => user id
const filters = { type: 'auto', members: { $in: [user.id] } };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };




function App() {
  const [client, setClient] = useState(null);
  useEffect(() => {
    const newClient = new StreamChat(apiKey);
    const handleConnectionChange = ({ online = false }) => {
      if (!online) return console.log('connection lost');
      setClient(newClient);
    };

    newClient.on('connection.changed', handleConnectionChange);
    axios.post('http://localhost:1234/name', { user: user.id }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(function (response) {
        const { token } = response.data
        newClient.connectUser(
          user,
          token,
        );

      })
      .catch(function (error) {

        console.log(error);
      })
      .finally(function () {

      });

    return () => {
      if (!client) {
        return
      }
      client.off('connection.changed', handleConnectionChange);
      client.disconnectUser().then(() => console.log('connection closed'));
    };


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
