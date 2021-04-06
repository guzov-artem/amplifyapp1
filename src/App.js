import React, { useState, useEffect } from 'react';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const initialFormState = { first: '', second: '' }
const apiName = 'APIDB';
const path = '/api'; 
const myInit = { // OPTIONAL
    headers: {}, // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {  // OPTIONAL
        name: 'param',
    },
};

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    API.get(apiName, path, myInit).then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error.response);
 });

  }

  async function createNote() {
	  var first = document.getElementById('inputName').value;
	  var second = document.getElementById('inputDescription').value;
	  const params = {
    body: {
        first: first,
        second: second
    },
};
    API.put(apiName, path, params)
  .catch(error => {
    console.log(error.response);
  });
  }
  
  async function deleteNote() {
	  var val = document.getElementById('inputName').value;
    API.del(apiName, path + '/object/' + val , {})
  .catch(error => {
    console.log(error.response);
  });
  }


  return (
   <div className="App">
              <button onClick={fetchNotes}>fetchNotes</button>
			<input id ="inputName"
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Note name"
        value={formData.name}
      />
      <input id = "inputDescription"
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Note description"
        value={formData.description}
      />
	   <button onClick={createNote}>Create Note</button>
	   <button onClick={deleteNote}>deleteNote</button>
	  </div>
  );
}

export default withAuthenticator(App);