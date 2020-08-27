import React from 'react'

import { render, fireEvent, waitFor } from '@testing-library/react'
import MockAdapter from 'axios-mock-adapter'
import { act } from 'react-dom/test-utils'
import CreateNaver from '../../pages/CreateNaver'
import api from '../../services/api'

const mockedHistoryPush = jest.fn()
const mockedAddToast = jest.fn()

const apiMock = new MockAdapter(api)

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
})

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  }
})

describe('Create Naver page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear()
  })

  it('should be able to create a naver', async () => {
    const { getByPlaceholderText, getByText } = render(<CreateNaver />)

    const nameField = getByPlaceholderText('Nome')
    const jobRoleField = getByPlaceholderText('Cargo')
    const birthdateField = getByPlaceholderText('Idade')
    const admissionDateField = getByPlaceholderText('Tempo de empresa')
    const projectField = getByPlaceholderText('Projetos que participou')
    const urlField = getByPlaceholderText('URL da foto do Naver')
    const buttonElement = getByText('Salvar')

    apiMock.onPost('navers').reply(200, {})

    projectField
    fireEvent.change(nameField, {
      target: { value: 'José' },
    })
    fireEvent.change(jobRoleField, {
      target: { value: 'Desenvolvedor Front-end' },
    })
    fireEvent.change(birthdateField, {
      target: { value: '06061995' },
    })
    fireEvent.change(admissionDateField, { target: { value: '20082020' } })
    fireEvent.change(projectField, {
      target: { value: 'Projeto Front-end' },
    })
    fireEvent.change(urlField, { target: { value: 'url-foto-jose' } })

    fireEvent.click(buttonElement)

    await act(async () => {
      fireEvent.click(buttonElement)
    })

    expect(getByText('Naver criado com sucesso!')).toBeTruthy()
  })

  it('should not be able to create a naver with invalid data', async () => {
    const { getByPlaceholderText, getByText } = render(<CreateNaver />)

    const nameField = getByPlaceholderText('Nome')
    const jobRoleField = getByPlaceholderText('Cargo')
    const birthdateField = getByPlaceholderText('Idade')
    const admissionDateField = getByPlaceholderText('Tempo de empresa')
    const projectField = getByPlaceholderText('Projetos que participou')
    const urlField = getByPlaceholderText('URL da foto do Naver')
    const buttonElement = getByText('Salvar')

    apiMock.onPost('navers').reply(200, {})

    projectField
    fireEvent.change(nameField, {
      target: { value: 'José' },
    })
    fireEvent.change(jobRoleField, {
      target: { value: 'Desenvolvedor Front-end' },
    })
    fireEvent.change(birthdateField, {
      target: { value: 'invalid-data' },
    })
    fireEvent.change(admissionDateField, { target: { value: '20082020' } })
    fireEvent.change(projectField, {
      target: { value: 'Projeto Front-end' },
    })
    fireEvent.change(urlField, { target: { value: 'url-foto-jose' } })

    fireEvent.click(buttonElement)

    await act(async () => {
      fireEvent.click(buttonElement)
    })

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled()
    })
  })

  it('should display a toast error if create fails', async () => {
    const { getByPlaceholderText, getByText } = render(<CreateNaver />)

    const nameField = getByPlaceholderText('Nome')
    const jobRoleField = getByPlaceholderText('Cargo')
    const birthdateField = getByPlaceholderText('Idade')
    const admissionDateField = getByPlaceholderText('Tempo de empresa')
    const projectField = getByPlaceholderText('Projetos que participou')
    const urlField = getByPlaceholderText('URL da foto do Naver')
    const buttonElement = getByText('Salvar')

    apiMock.onPost('navers').networkError()

    projectField
    fireEvent.change(nameField, {
      target: { value: 'José' },
    })
    fireEvent.change(jobRoleField, {
      target: { value: 'Desenvolvedor Front-end' },
    })
    fireEvent.change(birthdateField, {
      target: { value: '06061995' },
    })
    fireEvent.change(admissionDateField, { target: { value: '20082020' } })
    fireEvent.change(projectField, {
      target: { value: 'Projeto Front-end' },
    })
    fireEvent.change(urlField, { target: { value: 'url-foto-jose' } })

    fireEvent.click(buttonElement)

    await act(async () => {
      fireEvent.click(buttonElement)
    })

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      )
    })
  })

  it('should navigate to home after close info modal', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <CreateNaver />,
    )

    const nameField = getByPlaceholderText('Nome')
    const jobRoleField = getByPlaceholderText('Cargo')
    const birthdateField = getByPlaceholderText('Idade')
    const admissionDateField = getByPlaceholderText('Tempo de empresa')
    const projectField = getByPlaceholderText('Projetos que participou')
    const urlField = getByPlaceholderText('URL da foto do Naver')
    const buttonElement = getByText('Salvar')

    apiMock.onPost('navers').reply(200, {})

    projectField
    fireEvent.change(nameField, {
      target: { value: 'José' },
    })
    fireEvent.change(jobRoleField, {
      target: { value: 'Desenvolvedor Front-end' },
    })
    fireEvent.change(birthdateField, {
      target: { value: '06061995' },
    })
    fireEvent.change(admissionDateField, { target: { value: '20082020' } })
    fireEvent.change(projectField, {
      target: { value: 'Projeto Front-end' },
    })
    fireEvent.change(urlField, { target: { value: 'url-foto-jose' } })

    fireEvent.click(buttonElement)

    await act(async () => {
      fireEvent.click(buttonElement)
    })

    await act(async () => {
      fireEvent.click(getByTestId('modal-info-close-button'))
    })

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/home')
    })
  })
})
