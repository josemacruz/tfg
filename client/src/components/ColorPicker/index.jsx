import React from 'react';
import { GithubPicker } from 'react-color';
import { colorsPicker } from '../../configuration/colors';
import './styles.scss';

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      colorState: props.color,
    };
  }

  componentDidUpdate(prevProps) {
    const { color } = this.props;
    if (prevProps.color !== color) {
      this.updateState(color);
    }
  }

  updateState = (color) => {
    this.setState({ colorState: color });
  }

  handleClick = () => {
    const { displayColorPicker } = this.state;
    this.setState({ displayColorPicker: !displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    const { onChangeComplete, name } = this.props;
    this.setState({ colorState: color.hex, displayColorPicker: false });
    onChangeComplete(color, name);
  };

  render() {
    const { name, footer } = this.props;
    const { colorState, displayColorPicker } = this.state;

    return (
      <div className="wrapper">
        <div
          className="swatch"
          onClick={this.handleClick}
          role="presentation"
        >
          <div className="color" style={{ background: colorState }} />
          <i className="uil uil-angle-down i" />
        </div>
        {displayColorPicker ? (
          <div style={{ position: 'absolute', zIndex: 2 }}>
            <div
              className="cover"
              onClick={this.handleClose}
              role="presentation"
            />
            <GithubPicker
              name={name}
              color={colorState}
              onChange={this.handleChange}
              colors={colorsPicker}
            />
            {footer}
          </div>
        ) : null}

      </div>
    );
  }
}

ColorPicker.defaultProps = {
  color: '',
  footer: '',
  onChangeComplete: () => {},
  name: '',
};

export default ColorPicker;
