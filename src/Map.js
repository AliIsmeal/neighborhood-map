import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
import { InfoWindow } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/withScriptjs";

class MapContainer extends Component {
  render() {
    const style = [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#ebe3cd"
          }
        ]
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#523735"
          }
        ]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#f5f1e6"
          }
        ]
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#c9b2a6"
          }
        ]
      },
      {
        featureType: "administrative.land_parcel",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#dcd2be"
          }
        ]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#ae9e90"
          }
        ]
      },
      {
        featureType: "administrative.neighborhood",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [
          {
            color: "#dfd2ae"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#dfd2ae"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.text",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#93817c"
          }
        ]
      },
      {
        featureType: "poi.business",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#a5b076"
          }
        ]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#447530"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#f5f1e6"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#fdfcf8"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#f8c967"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#e9bc62"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [
          {
            color: "#e98d58"
          }
        ]
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#db8555"
          }
        ]
      },
      {
        featureType: "road.local",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#806b63"
          }
        ]
      },
      {
        featureType: "transit",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [
          {
            color: "#dfd2ae"
          }
        ]
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#8f7d77"
          }
        ]
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#ebe3cd"
          }
        ]
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
          {
            color: "#dfd2ae"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#b9d3c2"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels.text",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#92998d"
          }
        ]
      }
    ];
    const { markers, showInfow, markerCenter, infowIndex } = this.props;

    const MapContainer = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
            defaultOptions={{ styles: style }}
            defaultCenter={markerCenter}
            defaultZoom={12}
        >
          {markers &&
            markers.map((mark, index)=>(
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
