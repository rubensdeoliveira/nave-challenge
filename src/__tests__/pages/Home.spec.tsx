import React from 'react'

import { render, fireEvent, act, waitFor } from '@testing-library/react'
import AxiosMock from 'axios-mock-adapter'
import api from '../../services/api'

import Home from '../../pages/Home'

const mockedHistoryPush = jest.fn()
const mockedAddToast = jest.fn()

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

const apiMock = new AxiosMock(api)

describe('Home page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear()
  })

  it('should be able to list all the navers from api', async () => {
    apiMock.onGet('navers').reply(200, [
      {
        id: '1',
        name: 'José',
        admission_date: '2020-04-03T00:00:00.000Z',
        job_role: 'Front-end',
        user_id: '32da034e-c765-4377-94ca-8a2fe6b5e594',
        project: 'Projeto Back-end',
        birthdate: '1995-02-01T00:00:00.000Z',
        url:
          'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
      },
      {
        id: '2',
        name: 'Rubens',
        admission_date: '2020-04-03T00:00:00.000Z',
        job_role: 'Back-end',
        user_id: '32da034e-c765-4377-94ca-8a2fe6b5e594',
        project: 'Projeto Back-end',
        birthdate: '1995-02-01T00:00:00.000Z',
        url:
          'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
      },
      {
        id: '3',
        name: 'Junior',
        admission_date: '2020-04-03T00:00:00.000Z',
        job_role: 'Devops',
        user_id: '32da034e-c765-4377-94ca-8a2fe6b5e594',
        project: 'Projeto Back-end',
        birthdate: '1995-02-01T00:00:00.000Z',
        url:
          'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
      },
    ])

    const { getByText, getByTestId } = render(<Home />)

    await waitFor(() => expect(getByText('José')).toBeTruthy(), {
      timeout: 200,
    })

    expect(getByText('José')).toBeTruthy()
    expect(getByText('Front-end')).toBeTruthy()
    expect(getByTestId('remove-naver-1')).toBeTruthy()
    expect(getByTestId('edit-naver-1')).toBeTruthy()

    expect(getByText('Rubens')).toBeTruthy()
    expect(getByText('Back-end')).toBeTruthy()
    expect(getByTestId('remove-naver-2')).toBeTruthy()
    expect(getByTestId('edit-naver-3')).toBeTruthy()

    expect(getByText('Junior')).toBeTruthy()
    expect(getByText('Devops')).toBeTruthy()
    expect(getByTestId('remove-naver-3')).toBeTruthy()
    expect(getByTestId('edit-naver-3')).toBeTruthy()
  })

  it('should be able to display modal delete', async () => {
    apiMock.onGet('navers').reply(200, [
      {
        id: '1',
        name: 'José',
        admission_date: '2020-04-03T00:00:00.000Z',
        job_role: 'Front-end',
        user_id: '32da034e-c765-4377-94ca-8a2fe6b5e594',
        project: 'Projeto Back-end',
        birthdate: '1995-02-01T00:00:00.000Z',
        url:
          'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
      },
    ])

    const { getByText, getByTestId } = render(<Home />)

    await waitFor(() => expect(getByText('José')).toBeTruthy(), {
      timeout: 200,
    })

    expect(getByText('José')).toBeTruthy()
    expect(getByText('Front-end')).toBeTruthy()
    expect(getByTestId('remove-naver-1')).toBeTruthy()
    expect(getByTestId('edit-naver-1')).toBeTruthy()

    await act(async () => {
      fireEvent.click(getByTestId('remove-naver-1'))
    })

    expect(getByText('Tem certeza que deseja excluir este Naver?')).toBeTruthy()
  })

  it('should be able to navigate to edit naver page', async () => {
    apiMock.onGet('navers').reply(200, [
      {
        id: '1',
        name: 'José',
        admission_date: '2020-04-03T00:00:00.000Z',
        job_role: 'Front-end',
        user_id: '32da034e-c765-4377-94ca-8a2fe6b5e594',
        project: 'Projeto Back-end',
        birthdate: '1995-02-01T00:00:00.000Z',
        url:
          'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
      },
    ])

    const { getByText, getByTestId } = render(<Home />)

    await waitFor(() => expect(getByText('José')).toBeTruthy(), {
      timeout: 200,
    })

    expect(getByText('José')).toBeTruthy()
    expect(getByText('Front-end')).toBeTruthy()
    expect(getByTestId('remove-naver-1')).toBeTruthy()
    expect(getByTestId('edit-naver-1')).toBeTruthy()

    await act(async () => {
      fireEvent.click(getByTestId('edit-naver-1'))
    })

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/edit-naver', { id: '1' })
    })
  })

  it('should be able to open naver detail modal', async () => {
    apiMock.onGet('navers').reply(200, [
      {
        id: '1',
        name: 'José',
        admission_date: '2020-04-03T00:00:00.000Z',
        job_role: 'Front-end',
        user_id: '32da034e-c765-4377-94ca-8a2fe6b5e594',
        project: 'Projeto Back-end',
        birthdate: '1995-02-02T00:00:00.000Z',
        url:
          'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
      },
    ])

    const { getByText, getByTestId } = render(<Home />)

    await waitFor(() => expect(getByText('José')).toBeTruthy(), {
      timeout: 200,
    })

    expect(getByText('José')).toBeTruthy()
    expect(getByText('Front-end')).toBeTruthy()
    expect(getByTestId('remove-naver-1')).toBeTruthy()
    expect(getByTestId('edit-naver-1')).toBeTruthy()

    await act(async () => {
      fireEvent.click(getByTestId('detail-naver-1'))
    })

    expect(getByText('Projeto Back-end')).toBeTruthy()
    expect(getByText('Projetos que participou')).toBeTruthy()
    expect(getByText('Tempo de empresa')).toBeTruthy()
  })

  it('should be able to navigate to create naver page', async () => {
    const { getByText } = render(<Home />)

    await act(async () => {
      fireEvent.click(getByText('Adicionar Naver'))
    })

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/create-naver')
    })
  })

  it('should be able to delete naver', async () => {
    apiMock.onGet('navers').reply(200, [
      {
        id: '1',
        name: 'José',
        admission_date: '2020-04-03T00:00:00.000Z',
        job_role: 'Front-end',
        user_id: '32da034e-c765-4377-94ca-8a2fe6b5e594',
        project: 'Projeto Back-end',
        birthdate: '1995-02-01T00:00:00.000Z',
        url:
          'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
      },
    ])

    apiMock.onDelete('navers/1').reply(204)

    const { getByText, getByTestId } = render(<Home />)

    await waitFor(() => expect(getByText('José')).toBeTruthy(), {
      timeout: 200,
    })

    expect(getByText('José')).toBeTruthy()
    expect(getByText('Front-end')).toBeTruthy()
    expect(getByTestId('remove-naver-1')).toBeTruthy()
    expect(getByTestId('edit-naver-1')).toBeTruthy()

    await act(async () => {
      fireEvent.click(getByTestId('remove-naver-1'))
    })

    await act(async () => {
      fireEvent.click(getByTestId('modal-delete-button'))
    })

    expect(getByTestId('navers-list')).toBeEmptyDOMElement()
  })

  it('should be able to display modal info', async () => {
    apiMock.onGet('navers').reply(200, [
      {
        id: '1',
        name: 'José',
        admission_date: '2020-04-03T00:00:00.000Z',
        job_role: 'Front-end',
        user_id: '32da034e-c765-4377-94ca-8a2fe6b5e594',
        project: 'Projeto Back-end',
        birthdate: '1995-02-01T00:00:00.000Z',
        url:
          'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
      },
    ])

    apiMock.onDelete('navers/1').reply(204)

    const { getByText, getByTestId } = render(<Home />)

    await waitFor(() => expect(getByText('José')).toBeTruthy(), {
      timeout: 200,
    })

    expect(getByText('José')).toBeTruthy()
    expect(getByText('Front-end')).toBeTruthy()
    expect(getByTestId('remove-naver-1')).toBeTruthy()
    expect(getByTestId('edit-naver-1')).toBeTruthy()

    await act(async () => {
      fireEvent.click(getByTestId('remove-naver-1'))
    })

    await act(async () => {
      fireEvent.click(getByTestId('modal-delete-button'))
    })

    expect(getByText('Naver excluído')).toBeTruthy()
  })

  it('should be able to display a toast erro if delete naver fails', async () => {
    apiMock.onGet('navers').reply(200, [
      {
        id: '1',
        name: 'José',
        admission_date: '2020-04-03T00:00:00.000Z',
        job_role: 'Front-end',
        user_id: '32da034e-c765-4377-94ca-8a2fe6b5e594',
        project: 'Projeto Back-end',
        birthdate: '1995-02-01T00:00:00.000Z',
        url:
          'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
      },
    ])

    apiMock.onDelete('navers/1').networkError()

    const { getByText, getByTestId } = render(<Home />)

    await waitFor(() => expect(getByText('José')).toBeTruthy(), {
      timeout: 200,
    })

    expect(getByText('José')).toBeTruthy()
    expect(getByText('Front-end')).toBeTruthy()
    expect(getByTestId('remove-naver-1')).toBeTruthy()
    expect(getByTestId('edit-naver-1')).toBeTruthy()

    await act(async () => {
      fireEvent.click(getByTestId('remove-naver-1'))
    })

    await act(async () => {
      fireEvent.click(getByTestId('modal-delete-button'))
    })

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      )
    })
  })

  it('should be able to navigate to edit naver by detail modal', async () => {
    apiMock.onGet('navers').reply(200, [
      {
        id: '1',
        name: 'José',
        admission_date: '2020-04-03T00:00:00.000Z',
        job_role: 'Front-end',
        user_id: '32da034e-c765-4377-94ca-8a2fe6b5e594',
        project: 'Projeto Back-end',
        birthdate: '1995-02-02T00:00:00.000Z',
        url:
          'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
      },
    ])

    const { getByText, getByTestId } = render(<Home />)

    await waitFor(() => expect(getByText('José')).toBeTruthy(), {
      timeout: 200,
    })

    expect(getByText('José')).toBeTruthy()
    expect(getByText('Front-end')).toBeTruthy()
    expect(getByTestId('remove-naver-1')).toBeTruthy()
    expect(getByTestId('edit-naver-1')).toBeTruthy()

    await act(async () => {
      fireEvent.click(getByTestId('detail-naver-1'))
    })

    await act(async () => {
      fireEvent.click(getByTestId('detail-modal-edit-button'))
    })

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/edit-naver', { id: '1' })
    })
  })

  it('should be able to delete to display a delete modal by detail modal', async () => {
    apiMock.onGet('navers').reply(200, [
      {
        id: '1',
        name: 'José',
        admission_date: '2020-04-03T00:00:00.000Z',
        job_role: 'Front-end',
        user_id: '32da034e-c765-4377-94ca-8a2fe6b5e594',
        project: 'Projeto Back-end',
        birthdate: '1995-02-02T00:00:00.000Z',
        url:
          'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
      },
    ])

    apiMock.onDelete('navers/1').networkError()

    const { getByText, getByTestId } = render(<Home />)

    await waitFor(() => expect(getByText('José')).toBeTruthy(), {
      timeout: 200,
    })

    expect(getByText('José')).toBeTruthy()
    expect(getByText('Front-end')).toBeTruthy()
    expect(getByTestId('remove-naver-1')).toBeTruthy()
    expect(getByTestId('edit-naver-1')).toBeTruthy()

    await act(async () => {
      fireEvent.click(getByTestId('detail-naver-1'))
    })

    await act(async () => {
      fireEvent.click(getByTestId('detail-modal-delete-button'))
    })

    expect(getByText('Tem certeza que deseja excluir este Naver?')).toBeTruthy()
  })
})
