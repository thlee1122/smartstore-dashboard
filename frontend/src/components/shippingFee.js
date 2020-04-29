import React, { useState, useEffect }         from 'react';
import TextField                              from '@material-ui/core/TextField';
import NumberFormat                           from 'react-number-format';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$ "
      allowNegative={false}
    />
  );
}

const ShippingFee = (props) => {
  const [values, setValues] = useState({ numberformat: '6.5' });

  const handleChange = (event) => {
    props.setProductInfo("Shipping Fee", event.target.value);

    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

	return (
		<TextField
      error={props.shippingFeeError}
      helperText={props.shippingFeeHelperText}
      label="Shipping Fee"
      required
      value={values.numberformat}
      onChange={handleChange}
      name="numberformat"
      id="formatted-numberformat-input"
      variant="outlined"
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
	);
}

export default ShippingFee;