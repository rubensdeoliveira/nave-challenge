import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import InputMask from '../../components/InputMask'

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'birthdate',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      }
    },
  }
})

describe('InputMask component', () => {
  it('should be able to render a input', () => {
    const { getByPlaceholderText } = render(
      <InputMask
        label="Idade"
        mask="99/99/9999"
        name="birthdate"
        placeholder="Idade"
      />,
    )

    expect(getByPlaceholderText('Idade')).toBeTruthy()
  })

  it('should be able to mask text', () => {
    const { getByPlaceholderText } = render(
      <InputMask
        label="Idade"
        mask="99/99/9999"
        name="birthdate"
        placeholder="Idade"
      />,
    )

    const birthdateInputMask = getByPlaceholderText('Idade')

    fireEvent.change(birthdateInputMask, {
      target: { value: '06061995' },
    })

    expect(birthdateInputMask).toHaveValue('06/06/1995')
  })
})
