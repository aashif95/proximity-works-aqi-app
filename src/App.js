import React from "react";
import './App.css';
import { connect } from 'react-redux';
import AQIList from "./routes/aqi-list";
import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { updateAqiData } from './actions/aqi.actions';
import storeManager from "./helpers/storeLimitController";
class App extends React.Component  {
  
  ws = new WebSocket('ws://city-ws.herokuapp.com');

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data)
      const getStoreData = storeManager(message, this.props.aqiData)
      console.log(getStoreData)
      this.props.updateAqiData(getStoreData)
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.aqiData !== prevProps.aqiData) {
      console.log('getStoreData', this.props.aqiData)
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

const mapStateToProps = ({ aqiReducer }) => {
  const { aqiData } = aqiReducer
  return { aqiData }
 }

export default connect(mapStateToProps, {updateAqiData})(App);