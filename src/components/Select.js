import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

function Select({ onFocus, onBlur, options, value, onChange, onInputChange }) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState('');

  const onFocusHandler = () => {
    if (onFocus) onFocus();

    if (!open) setOpen(true);
  };

  const onBlurHandler = () => {
    if (onBlur) onBlur();

    // if (open) setOpen(false);
  };

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const onInputChangeHandler = event => {
    if (onInputChange) onInputChange(event.target.value);

    setInternalValue(event.target.value);
  };

  return (
    <div className={classnames('dropdown', { 'is-active': open })}>
      <div className="dropdown-trigger">
        <input
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onChange={onInputChangeHandler}
          className="input"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        value={internalValue}
        placeholder="Search a person"
        />
      </div>

      <div className="dropdown-menu">
        <div className="dropdown-content">
          {options.map(option => (
            <div
              href=""
              className="dropdown-item"
              onClick={() => {
                if (onChange && open) {
                  onChange(option.value);
                  setOpen(false);
                }
              }}
              key={option.value}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Select.defaultProps = {
  options: [],
  onChange: () => {},
  value: '',
};

export default Select;
