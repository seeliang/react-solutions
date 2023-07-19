import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios"
import {
  Chat,
} from 'stream-chat-react';




function App() {
  const [client, setClient] = useState(null);


  useEffect(() => {

    axios.post('http://localhost:1234/name', { user: 'dan' }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

    // const newClient = new StreamChat(apiKey);


    // setClient(newClient);


  }, []);

  if (!client) return null;
  return (
    <Chat client={client}>

    </Chat>
  );
}

export default App;
