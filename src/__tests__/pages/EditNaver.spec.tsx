import React from 'react'

import { render, fireEvent, waitFor } from '@testing-library/react'
import MockAdapter from 'axios-mock-adapter'
import { act } from 'react-dom/test-utils'
import EditNaver from '../../pages/EditNaver'
import api from '../../services/api'

const mockedHistoryPush = jest.fn()
const mockedAddToast = jest.fn()

const apiMock = new MockAdapter(api)

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
      location: { state: { id: '1' } },
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

describe('Edit Naver page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear()
  })

  it('should be able to edit a naver', async () => {
    apiMock.onGet('navers/1').reply(200, {
      id: '1',
      name: 'José',
      admission_date: '2020-04-03T00:00:00.000Z',
      job_role: 'Front-end',
      user_id: '32da034e-c765-4377-94ca-8a2fe6b5e594',
      project: 'Projeto Back-end',
      birthdate: '1995-02-01T00:00:00.000Z',
      url:
        'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
    })

    const { getByPlaceholderText, getByText } = render(<EditNaver />)

    const nameField = getByPlaceholderText('Nome')
    const jobRoleField = getByPlaceholderText('Cargo')
    const birthdateField = getByPlaceholderText('Idade')
    const admissionDateField = getByPlaceholderText('Tempo de empresa')
    const projectField = getByPlaceholderText('Projetos que participou')
    const urlField = getByPlaceholderText('URL da foto do Naver')
    const buttonElement = getByText('Salvar')

    apiMock.onPut('navers/1').reply(200, {})

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

    expect(getByText('Naver atualizado')).toBeTruthy()
    expect(getByText('Naver atualizado com sucesso!')).toBeTruthy()
  })

  it('should not be able to edit a naver with invalid data', async () => {
    apiMock.onGet('navers/1').reply(200, {
      id: '1',
      name: 'José',
      admission_date: '2020-04-03T00:00:00.000Z',
      job_role: 'Front-end',
      user_id: '32da034e-c765-4377-94ca-8a2fe6b5e594',
      project: 'Projeto Back-end',
      birthdate: '1995-02-01T00:00:00.000Z',
      url:
        'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
    })

    const { getByPlaceholderText, getByText } = render(<EditNaver />)

    const nameField = getByPlaceholderText('Nome')
    const jobRoleField = getByPlaceholderText('Cargo')
    const birthdateField = getByPlaceholderText('Idade')
    const admissionDateField = getByPlaceholderText('Tempo de empresa')
    const projectField = getByPlaceholderText('Projetos que participou')
    const urlField = getByPlaceholderText('URL da foto do Naver')
    const buttonElement = getByText('Salvar')

    apiMock.onPut('navers/1').reply(200, {})

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

  it('should display a toast error if edit fails', async () => {
    apiMock.onGet('navers/1').reply(200, {
      id: '1',
      name: 'José',
      admission_date: '2020-04-03T00:00:00.000Z',
      job_role: 'Front-end',
      user_id: '32da034e-c765-4377-94ca-8a2fe6b5e594',
      project: 'Projeto Back-end',
      birthdate: '1995-02-01T00:00:00.000Z',
      url:
        'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
    })

    const { getByPlaceholderText, getByText } = render(<EditNaver />)

    const nameField = getByPlaceholderText('Nome')
    const jobRoleField = getByPlaceholderText('Cargo')
    const birthdateField = getByPlaceholderText('Idade')
    const admissionDateField = getByPlaceholderText('Tempo de empresa')
    const projectField = getByPlaceholderText('Projetos que participou')
    const urlField = getByPlaceholderText('URL da foto do Naver')
    const buttonElement = getByText('Salvar')

    apiMock.onPut('navers/1').networkError()

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
    apiMock.onGet('navers/1').reply(200, {
      id: '1',
      name: 'José',
      admission_date: '2020-04-03T00:00:00.000Z',
      job_role: 'Front-end',
      user_id: '32da034e-c765-4377-94ca-8a2fe6b5e594',
      project: 'Projeto Back-end',
      birthdate: '1995-02-01T00:00:00.000Z',
      url:
        'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
    })

    const { getByPlaceholderText, getByText, getByTestId } = render(
      <EditNaver />,
    )

    const nameField = getByPlaceholderText('Nome')
    const jobRoleField = getByPlaceholderText('Cargo')
    const birthdateField = getByPlaceholderText('Idade')
    const admissionDateField = getByPlaceholderText('Tempo de empresa')
    const projectField = getByPlaceholderText('Projetos que participou')
    const urlField = getByPlaceholderText('URL da foto do Naver')
    const buttonElement = getByText('Salvar')

    apiMock.onPut('navers/1').reply(200, {})

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
