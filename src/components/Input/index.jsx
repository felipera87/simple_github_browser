import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useField } from '@unform/core';

import { Container, Error } from './styles';

const Input = ({ name, icon: Icon, label, ...rest }) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    const inputCurrentValue = inputRef.current ? inputRef.current.value : null;
    setIsFilled(!!inputCurrentValue);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      {label && <span>{label}</span>}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error>
          <span>{error}</span>
        </Error>
      )}
    </Container>
  );
};

export default Input;
