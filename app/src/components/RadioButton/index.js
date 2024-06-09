import * as React from 'react';
import Radio from '@mui/material/Radio';
import './style.css';

export default function ColorRadioButtons({ filterNotes }) {
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleClick = async (event) => {
    filterNotes(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    onClick: handleClick,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <div className="radioOptions">
      <Radio
        id="all"
        {...controlProps('all')}
        sx={{
          color: '#FFA07A',
          '&.Mui-checked': {
            color: '#FF6F61',
          },
        }}
      />
      <span>Todos</span>
      <Radio
        id="priority"
        {...controlProps('priority')}
        sx={{
          color: '#FFA07A',
          '&.Mui-checked': {
            color: '#FF6F61',
          },
        }}
      />
      <span>Prioridade</span>
      <Radio
        id="normal"
        {...controlProps('normal')}
        sx={{
          color: '#FFA07A',
          '&.Mui-checked': {
            color: '#FF6F61',
          },
        }}
      />
      <span>Normal</span>
    </div>
  );
}
