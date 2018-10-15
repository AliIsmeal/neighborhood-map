import React from "react";
import MapContainer from "./Map";
import Header from "./Header";
import Footer from "./Footer";
import ListOfPlaces from "./ListOfPlaces";
import LocationsAPI, { getAll,getPhoto} from "./LocationsAPI";

import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
import "./index.css";
import "./App.css";

class App extends React.Component {
  state = {
    locationsName: [],
    markers: [],
    query: "",
    newlocations: [],
    newMarkers: [],
    infowIndex: -1,
    markerCenter: {
      lat: 33.609633546669116,
      lng: -112.13530481621811
    }
  };

  //this meathod receives index and latlng object from ListOfPlaces component when marker is clicked
  //to open information window about the restaurant and change the center of the map to clicked marker
  showInfow = (index, latlng) => {
    this.setState({
      infowIndex: index,
      markerCenter: latlng
    });
  };

  //filtering the list of restaurants based on the query from ListOfPlaces component
  //when the user enter the restaurant name in the search input
  filter = query => {
    let restaurantsList;
    this.setState({ query: query });
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      restaurantsList = this.state.locationsName.filter(location =>
        match.test(location.name)
      );
    } else {
      this.setState({ infowIndex: -1 });
      restaurantsList = this.state.locationsName;
    }
    this.setState({ newlocations : restaurantsList});
   
    const filteredMarkers = [];
    for (let marker of this.state.newlocations) {
      filteredMarkers.push(marker);
    }
    this.setState({ newMarkers: filteredMarkers });
    
  };

  componentDidMount() {
  
    getAll().then(res => {
      //if the response is ok
      if (res === undefined) {
        //if Failed to fetch third party ,error message on map screen will be displayed
        document.getElementById("LoadError").innerHTML =
        "<h2>Error:Failed to fetch</h2>";
      } else if (res) {
        document.getElementById("LoadError").style.display = "none";
        //from the response exclude id,restaurant name, address,latlng to make markers array
        // list listLocationName array
        
        let getlocations = res.map(marker => marker.location);
        let getAddress = getlocations.map(add => add.formattedAddress);
        let getId = res.map(marker => marker.id);
        let getlocationsName = res.map(marker => marker.name);
        let markersArray = getlocations.map(latlng => ({
          lat: latlng.lat,
          lng: latlng.lng
        }));
        let listLocationName = [];
        for (var i = 0; i < getlocationsName.length; i++) {
          let locationName = {
            id: getId[i],
            name: getlocationsName[i],
            latlng: markersArray[i],
            address: getAddress[i]
          };
          listLocationName.push(locationName);
        }
        //set state to the new arrays formed above
        this.setState({
          markers: markersArray,
          locationsName: listLocationName
        });
      }
    });
  }
    selectLocation(locationsName, newlocations) {
    let fMarkers = this.state.newMarkers.length
      ? this.state.newMarkers
      : locationsName;
    let flocation = newlocations.length
      ? newlocations
      : this.state.locationsName;
    // sort locations name
    flocation.sort(sortBy("name"));
    return { fMarkers, flocation };
  }
  render() {
    const { newlocations, locationsName, query, markerCenter } = this.state;
    let { fMarkers, flocation } = this.selectLocation(locationsName, newlocations);

    return (
      <div className="App">
        <Header />
        {navigator.onLine && (
          <MapContainer
            showInfow={this.showInfow}
            markers={fMarkers}
            markerClickEvent={this.markerClickEvent}
            infowIndex={this.state.infowIndex}
            markerCenter={markerCenter}
          />
        )}
        {!navigator.onLine && (
          <div>
            <h3>No internet</h3>
          </div>
        )}
        <ListOfPlaces
          showInfow={this.showInfow}
          query={query}
          infowIndex={this.state.infowIndex}
          locationsName={flocation}
          filter={this.filter}
        />
        <Footer />
      </div>
    );
  }

  
}

export default App;
