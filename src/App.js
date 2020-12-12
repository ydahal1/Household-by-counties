import React, { Component } from "react";
import validator from "validator";
import _ from "lodash";
import axios from "axios";

import "./App.css";
import Search from "./components/search/Search";
import Chart from "./components/charts/Chart";
class App extends Component {
  //component states
  state = {
    stateName: "",
    allStates: "",
    houseHoldInfo: "",
    displayState: "",
    loadChart: false
  };

  //Lifecycles
  //component on load
  componentDidMount() {
    // Making test api call
    axios
      .get("https://api.census.gov/data/2010/dec/sf1?get=NAME&for=state:*")
      .then(response => {
        // handle success
        response.status === 200
          ? this.setState({ allStates: response.data })
          : this.setState({ error: "Incorrect state. check spelling" });
      })
      .catch(err => {
        // handle error
        // console.log("Here" + err);
        this.setState({ error: "Service Unavailable" });
      })
      .then(function() {
        // always executed
      });
  }

  getStateCodes = () => {};
  //functions
  //Handle change
  onChange = e => {
    this.setState({ stateName: e.target.value });
  };

  // Api call to fetch househodl info
  fetchHouseHoldInfo = stateCode => {
    // const apiKey = process.env.REACT_APP_US_CENSUS;
    axios
      .get(
        `https://api.census.gov/data/2019/acs/acs1/profile?get=NAME,DP02_0001E&for=county:*&in=state:${stateCode}&key=${process.env.REACT_APP_US_CENSUS}`
      )
      .then(response => {
        // handle success
        response.status === 200
          ? this.setState({ houseHoldInfo: response.data, loadChart: true })
          : this.setState({ houseHoldInfo: null });
      })
      .catch(err => {
        // handle error
        this.setState({ error: "Service is not available" });
      });
  };

  //Handle submit - fixes case issue
  hadndleSubmit = event => {
    event.preventDefault();
    validator.isEmpty(this.state.stateName)
      ? this.setState({ error: "Please provide state" })
      : this.setState({ error: null });

    if (validator.isEmpty(this.state.stateName)) {
      this.setState({ error: "Please provide state" });
    } else {
      this.setState({ error: null });
      let stateName = _.startCase(_.toLower(this.state.stateName));
      // stateName = _.upperFirst(stateName);
      console.log(stateName, "*******");
      let stateCode;
      const state = this.state.allStates.filter(state => state[0] == stateName);
      if (state.length === 0) {
        this.setState({ error: "Invalid  state", displayState: null });
      } else {
        this.setState({ displayState: stateName });
        stateCode = state[0][1];
        this.fetchHouseHoldInfo(stateCode);
      }
    }
  };

  render() {
    return (
      <div className="App">
        <Search
          hadndleSubmit={this.hadndleSubmit}
          onChange={this.onChange}
          state={this.state}
        />
        {this.state.loadChart ? (
          <Chart houseHoldInfo={this.state.houseHoldInfo} />
        ) : null}
      </div>
    );
  }
}

export default App;
