import React, { Component } from "react";
import API from "../API";

class QuoteGenerator extends Component {
  state = {
    quoteData: [],
    characterData: { _id: "5cd99d4bde30eff6ebccfc38", name: "Bilbo Baggins" },
    isLoaded: false
  };

  render() {
    const { quoteData } = this.state;
    const { characterData } = this.state;

    return (
      <>
        {!this.state.isLoaded ? null : (
          <>
            <section className="quoteSection">
              <h2 className="quote">
                {quoteData[this.randomiseQuote()].dialog}
              </h2>
              <p className="quotedBy">-- {characterData.name}</p>
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
    API.get("/quote").then(({ data: { docs } }) => {
      this.setState({ quoteData: docs, isLoaded: true });
    });
  };

  fetchCharacterById = id => {
    API.get(`/character/${id}`).then(({ data }) => {
      console.log(data);
      this.setState({ isLoaded: true });
    });
  };

  randomiseQuote = () => {
    const { quoteData } = this.state;
    const randomNum = Math.floor(Math.random() * quoteData.length - 1);
    console.log(quoteData);
    this.fetchCharacterById(quoteData[randomNum]._id);
    return randomNum;
  };
}

export default QuoteGenerator;
