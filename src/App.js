import React from 'react';
import './App.css';
import Body from './pokemons/Body'
import Form from './Form/Form';

class App extends React.Component {
  //Как указать state в функциональной компоненте?
  constructor(){
    super()
  }
  render(){
    return <div className="App">
      {/*<Body />*/}
      <Form />
    </div>
  }
}

export default App;
