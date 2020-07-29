import React, { Component } from "react";
import { Link } from "react-router-dom";
class Sortfield extends Component {
  render() {
    const alphabetSort = () => {
      this.props.Data.sort((a, b) =>
        a.recipe.label.localeCompare(b.recipe.label)
      );
    };
    const caloriesSort = () => {
      this.props.Data.sort(
        (a, b) => parseFloat(a.recipe.calories) - parseFloat(b.recipe.calories)
      );
    };
    return (
      <div className="sortField">
        <ul className="sortList">
          <Link to={`${window.location.pathname}?sorted_by:alphabet`}>
            <li onClick={alphabetSort}> Alphabet </li>{" "}
          </Link>
          <Link to={`${window.location.pathname}?sorted_by:calories`}>
            <li onClick={caloriesSort}> Calories </li>{" "}
          </Link>
          <li> Popular </li>{" "}
        </ul>{" "}
      </div>
    );
  }
}

export default Sortfield;
