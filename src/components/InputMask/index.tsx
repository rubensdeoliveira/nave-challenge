import React, { useRef, useEffect } from 'react'
import ReactInputMask, { Props as InputProps } from 'react-input-mask'
import { useField } from '@unform/core'
import { FiAlertCircle } from 'react-icons/fi'
import { Container, InputContainer, Error } from './styles'

interface Props extends InputProps {
  name: string
  label: string
  containerStyle?: Object
}

const InputMask: React.FC<Props> = ({
  name,
  label,
  containerStyle = {},
  ...rest
}) => {
  const inputMaskRef = useRef(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputMaskRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value)
      },
      clearValue(ref: any) {
        ref.setInputValue('')
      },
    })
  }, [fieldName, registerField])

  return (
    <Container>
      <label htmlFor={fieldName}>{label}</label>

      <InputContainer
        style={containerStyle}
        isErrored={!!error}
        data-testid="input-mask-container"
      >
        <ReactInputMask
          id={fieldName}
          ref={inputMaskRef}
          defaultValue={defaultValue}
          {...rest}
        />
        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </InputContainer>
    </Container>
  )
}

export default InputMask
