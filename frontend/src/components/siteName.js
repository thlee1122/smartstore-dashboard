import React, { useState, useEffect }       from 'react';
import TextField 														from '@material-ui/core/TextField';
import MenuItem 														from '@material-ui/core/MenuItem';

const SiteName = (props) => {
	const siteNames = ["Nike", "Adidas", "Goat"];
	const [siteName, setSiteName] = useState('Nike');

	const handleSiteNameChange = (event) => {
		props.setProductInfo("Site Name", event.target.value);
		setSiteName(event.target.value);
	}

	return (
		<TextField
      select
      label="Site Name"
      variant="outlined"
      value={siteName}
      onChange={handleSiteNameChange}
      helperText="Please select name of the site"
    >
    	{siteNames.map((siteName) => (
        <MenuItem 
        	key={siteName} 
        	value={siteName}
        >
          {siteName}
        </MenuItem>
      ))}
    </TextField>
	);
}

export default SiteName;