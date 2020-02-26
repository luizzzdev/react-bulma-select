import { render, fireEvent } from '@testing-library/react';
import Select from '../Select';
import React from 'react';

const options = [
  {
    label: 'option_one_label',
    value: 'option_one_value',
  },
  {
    label: 'option_two_label',
    value: 'option_two_value',
  },
];

describe('Select', () => {
  it('renders the options and select one of them', () => {
    const onChange = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <Select options={options} onChange={onChange} />
    );

    fireEvent.focus(getByPlaceholderText(/search a person/i));
    fireEvent.click(getByText('option_two_label'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('option_two_value');

    fireEvent.focus(getByPlaceholderText(/search a person/i));
    fireEvent.click(getByText('option_one_label'));
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith('option_one_value');
  });
});
