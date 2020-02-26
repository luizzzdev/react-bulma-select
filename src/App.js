import React, { useState } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import Select from './components/Select';
import starWarsNames from 'starwars-names';
import { useEffect } from 'react';
import { fetchPeople } from './resources/swapi';
import { useCallback } from 'react';

function App() {
  const [name, setName] = useState('');
  const [options, setOptions] = useState([])

  const onSelectNameHandler = name => {
    setName(name)
  };

  const onInputChangeHandler = name => {
    setName(name)
    fetchOptions(name)
  }

  const fetchOptions = useCallback(async (name) =>  {
    const { results } = await fetchPeople(name)

    const options = results.map(person => {
      return ({ value: person.name, label: person.name });
    })

    setOptions(options)
  },[]) 

  useEffect(() => {
    fetchOptions()
  }, [fetchOptions])

  return (
    <div className="App container">
      <h1>Select</h1>
      <Select options={options} onChange={onSelectNameHandler} value={name} onInputChange={onInputChangeHandler} />
    </div>
  );
}

export default App;
