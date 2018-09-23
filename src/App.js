import React from "react";
import MapContainer from "./Map";
import Header from "./Header";
import Footer from "./Footer";
import ListOfPlaces from "./ListOfPlaces";
import LocationsAPI, { getAll } from "./LocationsAPI";
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

  showInfow = (index,latlng) => {
    this.setState({ infowIndex: index ,
    markerCenter:latlng});
    };

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

  
    this.state.newlocations = restaurantsList;
    const filteredMarkers = [];
    for (let marker of this.state.newlocations) {
      filteredMarkers.push(marker);
    }
    this.state.newMarkers = filteredMarkers;
  };

  componentDidMount() {
    getAll().then(res => {
      if (res) {
        let getlocations = res.map(marker => marker.location);
        let getAddress = getlocations.map(add => add.address);
        let getId = res.map(marker => marker.id);
        //get catigories array and then map through it to get
        let getCatigories = res.map(marker => marker.categories[0]);
        let getIcon = getCatigories.map(i => i.icon.prefix);
        let getCatigoryName = res.map(
          marker => marker.categories[0] && marker.categories[0].name
        );
        let getlocationsName = res.map(marker => marker.name);
        var markersArray = getlocations.map(latlng => ({
          lat: latlng.lat,
          lng: latlng.lng
        }));
        let listLocationName = [];
        for (var i = 0; i < getlocationsName.length; i++) {
          let locationName = {
            id: getId[i],
            name: getlocationsName[i],
            latlng: markersArray[i],
            icon: getIcon,
            address: getAddress[i]
          };

          listLocationName.push(locationName);
        }

        this.setState({
          markers: markersArray,
          locations: getlocations,
          locationsCategoryName: getCatigoryName,
          locationsName: listLocationName
        });
      } else if (!res.ok) {
        alert("Error has occured,couldn't load the data correctly");
      }
    });
  }

  render() {
    const {
     
      newlocations,
      locationsName,
      query,
      markerCenter
    } = this.state;
    let fMarkers = this.state.newMarkers.length
      ? this.state.newMarkers
      : locationsName;
    let flocation = newlocations.length
      ? newlocations
      : this.state.locationsName;
    flocation.sort(sortBy("name"));

    return <div className="App">
        <Header />
        {navigator.onLine && <MapContainer showInfow={this.showInfow} markers={fMarkers} markerClickEvent={this.markerClickEvent} infowIndex={this.state.infowIndex} markerCenter={markerCenter} />}
      {(!navigator.onLine) &&
        (<div>
        <h3>No internet</h3>

        </div>)

      }
        <ListOfPlaces showInfow={this.showInfow} query={query} infowIndex={this.state.infowIndex} locationsName={flocation} filter={this.filter} />
        <Footer />
      </div>;
  }
}

export default App;
