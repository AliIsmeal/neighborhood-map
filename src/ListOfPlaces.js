import React, { Component } from "react";

class ListOfPlaces extends Component {
  render() {
    const { locationsName, filter, query, showInfow } = this.props;

    return (
      <div className="list-restaurant">
          <div className="input-group my-1 mr- -3">
            <input
              type="text"
              tabIndex={0}
              className="form-control"
              placeholder="Search Restaurants"
              aria-label="enter restaurant name "
              value={query} //when the user enter a restaurant name filter method will be called in  App componant
              onChange={event => filter(event.target.value)}
              role="textbox"
            />
          </div>
        <ul className="list">
          {locationsName &&
            locationsName.map((marker, index) => (
              <li
                arial-label={marker.name}
                tabIndex={index}
                key={marker.id}
                onClick={() => {
                  showInfow(index, marker.latlng);
                }}
              >
                <div>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{marker.name}</h5>
                      <p className="card-text">{marker.address}</p>
                    </div>
                  </div>
                  <div className="rest-name">
                    <p />
                    {/* <img src="https://picsum.photos/20/30"/> */}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default ListOfPlaces;
