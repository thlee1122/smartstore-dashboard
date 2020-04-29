import React, { useState, useEffect }         from 'react';
import TextField                              from '@material-ui/core/TextField';
import MenuItem                               from '@material-ui/core/MenuItem';

const LowestSize = (props) => {
  const [lowestSize, setLowestSize] = useState(3);

	const handleLowestSizeChange = (event) => {
    props.setProductInfo("Lowest Size", event.target.value);
    setLowestSize(event.target.value);
  }

	return (
		<TextField
      select
      label="Lowest Size"
      variant="outlined"
      value={lowestSize}
      onChange={handleLowestSizeChange}
      helperText="Please select LOWEST size of your product"
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

export default LowestSize;