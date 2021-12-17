import React from "react";
import './App.css';
import { connect } from 'react-redux';
import AQIList from "./routes/aqi-list";
import City from "./routes/city";
import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { updateAqiData } from './actions/aqi.actions';
import storeManager from "./helpers/storeLimitController";
import Header from "./components/Header";
class App extends React.Component  {
  
  ws = new WebSocket('ws://city-ws.herokuapp.com');

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      // listen to data sent from the websocket server
      const incomingData = JSON.parse(evt.data)
      const getStoreData = storeManager(incomingData, this.props.aqiData)
      this.props.updateAqiData(getStoreData)
    }
  }

  render() {
    return (
      <div className="w-100">
          <Router>
            <div className="w-100">
              <Header />
            </div>
            <div className="w-100 pt-2">
              <Routes>
                <Route exact path="/"  element={<AQIList />} />
                <Route path="/city" element={<City />} />
              </Routes>    
            </div>
          </Router>
      </div>);
  }
}

const mapStateToProps = ({ aqiReducer }) => {
  const { aqiData } = aqiReducer
  return { aqiData }
 }

export default connect(mapStateToProps, {updateAqiData})(App);