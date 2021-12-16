import React from "react";
import './App.css';
import AQIList from "./routes/aqi-list";
import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";
class App extends React.Component  {
  
  ws = new WebSocket('ws://city-ws.herokuapp.com/');

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data)
      this.setState({dataFromServer: message})
      console.log(message)
    }
  }

  
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/list" element={<AQIList />} />
        </Routes>    
      </Router>);
  }
}
export default App;