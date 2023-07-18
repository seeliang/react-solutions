import './App.css';
import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
} from 'stream-chat-react';
import credentials from './credentials';

const { apiKey } = credentials

function App() {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const newClient = new StreamChat(apiKey);


    setClient(newClient);


  }, []);

  if (!client) return null;
  return (
    <Chat client={client}>

    </Chat>
  );
}

export default App;
