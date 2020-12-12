import React, { Component } from "react";
import "./search.css";

class Search extends Component {
  render() {
    const { state, onChange, hadndleSubmit } = this.props;
    console.log(state.houseHoldInfo);
    let totalPopulation = [];
    if (state.houseHoldInfo.length > 0) {
      state.houseHoldInfo.map((house, i) => {
        if (i !== 0) {
          totalPopulation.push(parseInt(house[1]));
        }
      });
    }

    totalPopulation = totalPopulation.reduce((a, b) => a + b, 0);

    return (
      <div className="search-form ">
        <form className="row" onSubmit={hadndleSubmit}>
          <div className="col-auto">
            <input
              type="text"
              className={
                state.error ? "form-control is-invalid" : " form-control"
              }
              placeholder="Type your state"
              onChange={onChange}
            />
            <div
              id="validationServer05Feedback"
              className="invalid-feedback text-left"
            >
              {state.error}
            </div>
          </div>

          <div className="col-auto">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <div className="col-md-8">
            <div className="text-right boldtext">2017 US Census</div>
            <div className="text-right">
              {state.displayState ? (
                <h6>
                  <span className="boldertext">{state.displayState}</span>
                  {state.houseHoldInfo.length > 0
                    ? " - " + totalPopulation + " Households"
                    : null}
                </h6>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Search;

//To dos
//Form validation
//handle incorrect user input by displaying error in UI
//Handle err from response for both functions
//store household info in state
// store recent state in local storage and make it a default state - try if you can get geocode and do this instead
//refactor code and make it moduler by breaking it into different files
//use chart js to display data in UI
//2 letter states not working
//clear input after search
//Error handling when no internet or other issue - handle it such user cannot enter serach when such issueexist
