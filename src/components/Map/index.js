import React, { Component } from 'react';
import { Map, Markers } from 'react-amap';
import {inject, observer} from "mobx-react";


@inject('rootStore')
@observer
export default class HouseMap extends Component {
  constructor(props) {
    super(props);
    const _this = this;
    this.state = {
      markers: [],
      // center: randomPosition(),
    };
    this.mapEvents = {
      created(map) {
        _this.map = map;
        AMap.plugin('AMap.Geocoder', () => {
          _this.geocoder = new AMap.Geocoder({
            city: '010', // 城市，默认：“全国”
          });
        });
        const {houses} = _this.props.rootStore.HouseStore;
        const geos = Array.from(new Set(houses.map((value) => value.address)));
        geos.map((value => {
          _this.geocoder.getLocation(value, (status, result) => {
            _this.setState({
              markers : [
                {position: result.geocodes[0].location},
                ..._this.state.markers
              ]
            })
          })
        }));
        _this.geocoder.getLocation()
      },
    };
    this.randomMarkers = this.randomMarkers.bind(this);
  }

  randomMarkers() {
    this.setState({
      markers: [
        {
          position: {
            longitude: 116.477661,
            latitude: 39.991132,
          },
        }],
    });
  }

  render() {
    const { markers } = this.state;
    return (
      <div style={{ width: '100%', height: 600 }}>
        <Map amapkey={process.env.REACT_APP_MAP_KEY} plugins={['ToolBar']} zoom={4} events={this.mapEvents}>
          {/* <Test /> */}
          <Markers
            markers={markers}
          />
        </Map>
      </div>
    );
  }
}
