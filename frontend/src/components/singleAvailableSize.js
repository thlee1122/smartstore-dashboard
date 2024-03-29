import React, { useState, useEffect }       from 'react';
import Button 															from '@material-ui/core/Button';

const SingleAvailableSize = (props) => {
	const {size} = props;
	const [buttonClicked, setButtonClick] = useState(false);

	const handleButtonClick = () => {
		setButtonClick(!buttonClicked);
		props.collectAvailableSizes(props.size);
	}

	let backgroundColor = buttonClicked === false ? 'white' : '#e0e0e0';

	return (
		<Button 
			disabled={props.disabled}
			variant="contained"
			onClick={handleButtonClick}
			style={{
				border: '1px solid black',
				marginRight: '10px',
				marginTop: '10px',
				backgroundColor: backgroundColor
			}}
		>
			{size}
		</Button>
	);
}

export default SingleAvailableSize;