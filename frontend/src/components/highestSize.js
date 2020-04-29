import React, { useState, useEffect }         from 'react';
import TextField 															from '@material-ui/core/TextField';
import MenuItem 															from '@material-ui/core/MenuItem';

const HighestSize = (props) => {
  const [highestSize, setHighestSize] = useState(15);

  const handleHighestSizeChange = (event) => {
  	props.setProductInfo("Highest Size", event.target.value);

		setHighestSize(event.target.value);
	}

	return (
		<TextField
      select
      label="Highest Size"
      variant="outlined"
      value={highestSize}
      onChange={handleHighestSizeChange}
      helperText="Please select HIGHEST size of your product"
      style={{ width: '170px' }}
    >
    	{props.sizes.map((size) => (
        <MenuItem key={size} value={size}>
          {size}
        </MenuItem>
      ))}
    </TextField>
	);
}

export default HighestSize;