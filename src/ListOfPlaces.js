import React, { Component } from "react";

class ListOfPlaces extends Component {
  //Reminder need to change it to statelesss function

  render() {
    const { locationsName, filter, query, showInfow } = this.props;

    return (
      <div className="list-restaurant">
        <div className="search" tabIndex={0}>
          <input
            className="search-locations"
            type="text"
            placeholder="Search Restaurants"
            role="textbox"
            aria-label="enter restaurant name "
            value={query}
            onChange={event => filter(event.target.value)}
          />
        </div>
        <ul className="list">
          {locationsName &&
            locationsName.map((marker, index) => (
              <li
                arial-label={marker.name}
                key={marker.id}
                onClick={() => {
                  showInfow(index, marker.latlng);
                }}
              >
                <div className="rest-name">
                  <p>{marker.name}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default ListOfPlaces;
