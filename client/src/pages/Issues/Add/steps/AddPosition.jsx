import Select from 'react-select';
import { TextField } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDevices } from '../../../../services/redux/devices/actions';
import './styles.scss';
import { getServices } from '../../../../services/redux/issues/actions';
import Alert from '@mui/material/Alert';
import ClearIcon from '@mui/icons-material/Clear';
import MapWithMarkers from '../../../../components/Map/MapWithMarkers';

export function AddPosition(props) {
  const {
    handleChangePostion,
    validate,
    previousStep,
    close,
		error,
    position,
  } = props;

  const ref = useRef(null);
  
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
        document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div className="stepContainer" ref={ref}>
     <div className="closeIcon">
      <ClearIcon onClick={close}></ClearIcon>
      </div>
      <h1 className="title">Información general de la incidencia</h1>
      <div className="mapContainer">
        <MapWithMarkers
          setPosition={handleChangePostion}
        />
      </div>
      <div className="positionContainer">
        <div className="latitude"><span className="positionTitle">Latitud:</span><span>{position.latitude ?? ''}</span></div>
        <div className="longitude"><span className="positionTitle">Longitud:</span><span>{position.longitude ?? ''}</span></div>
      </div>
      <div className="buttonsContainer">
        <button type="button" onClick={previousStep} className="previousButton">Back Step</button>
        <button type="button" onClick={validate} className="addButton">Crear Issue</button>
      </div>
      {error && (<div className="alertContainer">
        <Alert severity="error">Error, seleccione todos los campos</Alert>
      </div>)}
  </div>
  );
}
