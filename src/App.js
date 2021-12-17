import React from "react";
import './App.css';
import { connect } from 'react-redux';
import AQIList from "./routes/aqi-list";
import City from "./routes/city";
import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { updateAqiData } from './actions/aqi.actions';
import storeManager from "./helpers/storeLimitController";
import Header from "./components/Header";
import { scoketUrl } from "./app.config";
class App extends React.Component  {
  state = {
    connectionFailed: false
  }
  ws = new WebSocket(scoketUrl);

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      this.setState({
        connectionFailed: false
      })
    }

    this.ws.onmessage = evt => {
      // listen to data sent from the websocket server
      const incomingData = JSON.parse(evt.data)
      const getStoreData = storeManager(incomingData, this.props.aqiData)
      this.props.updateAqiData(getStoreData)
    }

    this.ws.onerror = () => {
      this.setState({
        connectionFailed: true
      })
    }
  }

  render() {
    return (
      <div className="w-100">
          <Router>
            <div className="w-100">
              <Header />
            </div>
            <div className="w-100 p-2">
              {this.state.connectionFailed && 
              <div class="alert alert-danger" role="alert">
                Sorry, Our server is temporarily down. Please try again later.
              </div>}
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