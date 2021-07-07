import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import MapComponent from "./components/MapComponent";
import Button from "./components/common/Button";
import HistoryItemList from "./components/HistoryItemList";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001",
      latitude: 0,
      longitude: 0,
      zoom: 13,
      data: {},
      stations: [],
      history: [],
    };

    this.getHistory = this.getHistory.bind(this);
    this.activateHistoryMode = this.activateHistoryMode.bind(this);
    this.deactivateHistoryMode = this.deactivateHistoryMode.bind(this);
    this.saveHistory = this.saveHistory.bind(this);
    this.socket = socketIOClient(this.state.endpoint);
  }
  componentDidMount() {
    this.deactivateHistoryMode();
    this.socket.on("city-data", (data) => {
      this.setState({
        ...this.state,
        data: data,
        latitude: data.location.latitude,
        longitude: data.location.longitude,
        stations: data.stations,
      });
    });

    this.socket.on("history", (history) => {
      this.setState({ history });
    });
  }

  activateHistoryMode() {
    this.socket.emit("active-history", true);
    if (this.state.history.length <= 0) {
      this.socket.emit("view-history");
    }
  }

  deactivateHistoryMode() {
    this.setState({ history: [] });
    this.socket.emit("active-history", false);
  }

  getHistory(index) {
    this.activateHistoryMode();
    const data = this.state.history[index];
    this.setState({
      ...this.state,
      latitude: data.location.latitude,
      longitude: data.location.longitude,
      stations: data.stations,
    });
  }

  saveHistory() {
    this.socket.emit("save-history", this.state.data);
  }

  render() {
    //const { response } = this.state;
    const position = [this.state.latitude, this.state.longitude];

    const stations = this.state.stations;
    const history = this.state.history;

    return (
      <div>
        <h1 className="title"> City Bikes in Miami </h1>
        <div className="btn-center">
          {history.length > 0 ? (
            <Button
              onClick={this.deactivateHistoryMode}
              message="Real-time mode"
            />
          ) : (
            <Button onClick={this.activateHistoryMode} message="History mode" />
          )}
          <Button onClick={this.saveHistory} message="Save history" />
        </div>

        <MapComponent
          position={position}
          zoom={this.state.zoom}
          stations={stations}
        />
        <div className="history-list">
          {history.length > 0 && <h3>History of changes</h3>}
          <HistoryItemList history={history} onClick={this.getHistory} />
        </div>
      </div>
    );
  }
}
export default App;
