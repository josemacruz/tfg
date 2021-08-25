import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { CgPlayListAdd } from 'react-icons/cg'
export function Step1(props) {

	return (
		<div className="stepContainer">
			<h1 className="title">Añade información de la incidencia</h1>
			<div className="skeletonContainer">
			</div>
		</div>
	); 
}
