/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import BasicTable from '../../components/BasicTable';
import styled from 'styled-components';
import { BsThreeDotsVertical } from 'react-icons/bs';
import './styles.scss';

const Card = styled.div`
  height: 50vh;
  background-color: white;
  display: flex;
  justify-contents: center;
  border-radius: 7px;
  box-shadow: 0px 0px 15px 2px #a5a1aa;
	margin: 15px;
`;

function Widget(props) {
  const {
		title,
		handleAdd,
		addButton,
		handleProfile,
		rowsData,
		columnsDef,
	} = props;
	console.log(handleAdd)
  return (
    <Card>
			<div className="container">
				<div className="title">
					<span className="text">{title}</span>
					<div className="buttonContainer" >
						{handleAdd && (<button
							className="button"
							onClick={handleAdd}
							>
						{addButton}
						</button>)}
						{handleProfile && (
							<BsThreeDotsVertical
								onClick={handleProfile}
							/>
						)}
					</div>
				</div>
				<div className="tableContainer">
					<BasicTable />
				</div>
			</div>
    </Card>
  );
}

export default Widget;
