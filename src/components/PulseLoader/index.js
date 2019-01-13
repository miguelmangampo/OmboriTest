import React from 'react';
import { View, Animated } from 'react-native';
import Pulse from './Pulse';
import PropTypes from 'prop-types';

export default class PulseLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circles: []
    };
    this.counter = 1;
    this.setInterval = null;
    this.anim = new Animated.Value(1);
  }

  componentDidMount() {
    this.setCircleInterval(2000);
    this.setCircleInterval(3000);
  }

  setCircleInterval(interval) {
    this.setInterval = setInterval(this.addCircle.bind(this), interval || this.props.interval);
    this.addCircle();
  }

  addCircle() {
    this.setState({ circles: [...this.state.circles, this.counter] });
    // eslint-disable-next-line no-plusplus
    this.counter++;
  }

  render() {
    const { size, dotBackgroundColor, opacity } = this.props;

    return (
      <View style={{
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        opacity
      }}
      >
        {this.state.circles.map(circle => (
          <Pulse
            key={circle}
            {...this.props}
          />
         ))}

        <View style={{
         width: size,
         height: size,
         borderRadius: size / 2,
         backgroundColor: dotBackgroundColor
        }}
        />
      </View>
    );
  }
}

PulseLoader.propTypes = {
  interval: PropTypes.number,
  size: PropTypes.number,
  pulseMaxSize: PropTypes.number,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  dotBackgroundColor: PropTypes.string,
  getStyle: PropTypes.func,
  opacity: PropTypes.number
};

PulseLoader.defaultProps = {
  interval: 2000,
  size: 100,
  pulseMaxSize: 250,
  opacity: 1,
  borderColor: '#D8335B',
  backgroundColor: '#ED225B55',
  dotBackgroundColor: '#C70039',
  getStyle: undefined
};
