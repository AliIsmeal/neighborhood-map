import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { InfoWindow } from "react-google-maps";
import { GoogleMapLoader } from "react-google-maps";
// import { withScriptjs } from "react-google-maps/lib/withScriptjs.js"
import withScriptjs from "react-google-maps/lib/withScriptjs";

class MapContainer extends Component {
  render() {
    const { markers, showInfow, markerCenter, infowIndex } = this.props;

    const MapContainer = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap defaultCenter={markerCenter} defaultZoom={12}>
          {markers &&
            markers.map((mark, index) => (
              <div key={mark.id}>
                <Marker
                  position={mark.latlng}
                  animation={
                    infowIndex === index && window.google.maps.Animation.BOUNCE
                  }
                  key={index}
                  title={mark.name}
                  onClick={() => {
                    //onClick showInfow will be called in App.js
                    showInfow(index, mark.latlng);
                  }}
                >
                  {infowIndex === index && (
                    <InfoWindow onCloseClick={this.handleToggle}>
                      <div>
                        <ul className="infow-window">
                          <li>
                            <span>
                              Restaurant:
                              {mark.name}
                            </span>
                          </li>
                          <li>
                            <img
                              //couldn't load images from four square,I used https://picsum.photos/300/150?image=431 to get an image of restaurnt
                              src="https://igx.4sqi.net/img/general/300x500/5163668_xXFcZo7sU8aa1ZMhiQ2kIP7NllD48m7qsSwr1mJnFj4.jpg"
                              alt={mark.name}
                            />
                          </li>
                          <li>
                            <span>
                              Adress:
                              {mark.address}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              </div>
            ))}
        </GoogleMap>
      ))
    );

    return <div role="application" aria-label="neighborhood application">
        <MapContainer googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC0P0jEmEbq3nLpHQA0w2WHQVQzXbzNeUg&v3&libraries=places" loadingElement={<div style={{ height: `100%` }} />} containerElement={<div className="map" />} mapElement={<div style={{ height: `100%` }} />} />
      </div>;
  }
}

export default MapContainer;
