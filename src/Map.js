import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
import { InfoWindow } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/withScriptjs";

class MapContainer extends Component {
  render() {
    const { markers, showInfow, markerCenter, infowIndex } = this.props;
    const MapContainer = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          // defaultOptions={{ styles: style }}
          defaultCenter={markerCenter}
          defaultZoom={12}
        >
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
                    window.google.maps.Animation.null;
                  }}
                >
                  {infowIndex === index && (
                    <InfoWindow>
                      <div>
                        <ul className="infow-window">
                          <li>
                            <span>
                              Restaurant:
                              {mark.name}
                            </span>
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

    return (
      <div role="application" aria-label="neighborhood application">
        <MapContainer
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC0P0jEmEbq3nLpHQA0w2WHQVQzXbzNeUg&v3&libraries=places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div className="map" />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default MapContainer;
