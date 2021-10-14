import React, { useState } from 'react';
import { CirclePicker } from 'react-color';
import './styles.scss';

const colorsPicker = [
  '#ACD356',
  '#E12C50',
  '#2B334A',
  '#FC381D',
  '#F1AF00',
  '#00D3A4',
  '#7B144D',
  '#C039D5',
  '#0F51A5',
  '#40DCFF',
  '#E8E8E8',
  '#0A2D53',
];

const ColorPicker = ({config, validateColor}) => { 
  const [colors, setColors] = useState(config.colors);

  const handleChangeHeader = (color) => {
    const newColors = {
      headerColor: "#FFFFFF",
      headerTableBackground: color.hex,
      headerTableColorText: colors.headerTableColorText,
    };
    setColors(newColors)
  }

  const handleChangeText = (color) => {
    const newColors = {
      headerColor: "#FFFFFF",
      headerTableBackground: colors.headerTableBackground,
      headerTableColorText: color.hex,
    };
    setColors(newColors)
  }

  return (
    <>
      <div className="colorsPicker">
        <div className="HeaderPicker">
          <span>Cabecera</span>
          <CirclePicker 
            colors={colorsPicker}
            onChange={handleChangeHeader}
            width="130px"
          />
        </div>
        <div className="TextPicker">
          <span>Texto</span>
          <CirclePicker
            colors={colorsPicker}
            onChange={handleChangeText}
            width="130px"
          />
        </div>
      </div>
      <div className="colorsPickerFooter">
        <button type="button" className="button" onClick={() => validateColor(colors)}>Aplicar Cambios</button>
      </div>
    </>
  );
}

export default ColorPicker;