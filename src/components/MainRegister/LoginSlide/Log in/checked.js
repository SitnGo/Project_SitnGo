import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export default function Checkboxes() {
  const [state, setState] = React.useState({
    checked: false,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <div>
      <Checkbox
        checked={state.checked}
        onChange={handleChange('checked')}
        value="checked"
        color="primary"
        inputProps={{
          'aria-label': 'secondary checkbox',
        }}
      />
        </div>
  );
}