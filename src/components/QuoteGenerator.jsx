import React, { Component } from "react";
import API from "../API";

class QuoteGenerator extends Component {
  state = {
    quoteData: [],
    characterData: "",
    // { _id: "5cd99d4bde30eff6ebccfc38", name: "Bilbo Baggins" },
    isLoaded: false,
    randomNum: 0
  };

  render() {
    const { quoteData } = this.state;
    const { characterData } = this.state;
    console.log(this.state.randomNum);

    return (
      <>
        {!this.state.isLoaded ? null : (
          <>
            <section className="quoteSection">
              <h2 className="quote">
                {quoteData[this.randomiseQuote()].dialog}
              </h2>
              <p className="quotedBy">-- {this.fetchCharacterById()}</p>
            </section>
            <button className="randomise-btn">Randomise</button>
          </>
        )}
      </>
    );
  }

  componentDidMount() {
    this.fetchQuoteDataOnMount();
  }

  fetchQuoteDataOnMount = () => {
    API.get("/quote")
      .then(({ data: { docs } }) => {
        this.setState({ quoteData: docs });
      })
      .then(() => {
        this.setState(currentState => {
          const randomNum = Math.floor(
            Math.random() * currentState.quoteData.length - 1
          );
          return { randomNum, isLoaded: true };
        });
      });
  };

  fetchCharacterById = () => {
    const { quoteData, randomNum } = this.state;
    API.get(`/character/${quoteData[randomNum].character}`).then(
      ({ data: { name } }) => {
        this.setState({ characterData: name });
      }
    );
  };

  randomiseQuote = () => {
    const { quoteData } = this.state;
    const randomNum = Math.floor(Math.random() * quoteData.length - 1);
    // this.fetchCharacterById(quoteData[randomNum].character);
    //set state with randomNum?
    return randomNum;
  };
  // }
}

export default QuoteGenerator;
