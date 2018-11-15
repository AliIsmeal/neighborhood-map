import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
import { InfoWindow } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/withScriptjs";

class MapContainer extends Component {
  state={display:false}
  
  getBagdeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;}
    render() {
    
    const divStyle = {
      margin: '40px',
      border: '5px solid pink'
    }
    const { markers, showInfow, markerCenter, infowIndex } = this.props;
    const MapContainer = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          // defaultOptions={{ styles: style }}
          defaultCenter={markerCenter}
          defaultZoom={10}
        >
          {markers &&
            markers.map((mark, index) => (
              <div key={mark.id}>
                <Marker
                  position={mark.latlng}
                  key={index}
                  title={mark.name}
                  onClick={() => {
                    //onClick showInfow will be called in App.js
                    showInfow(index, mark.latlng);
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
