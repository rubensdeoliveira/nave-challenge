import { renderHook, act } from '@testing-library/react-hooks'
import MockAdapter from 'axios-mock-adapter'

import { useAuth, AuthProvider } from '../../hooks/auth'
import api from '../../services/api'

const apiMock = new MockAdapter(api)

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const apiResponse = {
      id: 'user123',
      name: 'José',
      email: 'rubensojunior6@gmail.com',
      token: 'token-123',
    }

    apiMock.onPost('users/login').reply(200, apiResponse)

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    result.current.signIn({
      email: 'rubensojunior6@gmail.com',
      password: '123456',
    })

    await waitForNextUpdate()

    expect(setItemSpy).toHaveBeenCalledWith(
      '@Naver:user',
      JSON.stringify(apiResponse),
    )
    expect(result.current.user.email).toEqual('rubensojunior6@gmail.com')
  })

  it('should restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@Naver:user':
          return JSON.stringify({
            id: 'user123',
            name: 'José',
            email: 'rubensojunior6@gmail.com',
            token: 'token-123',
          })
        default:
          return null
      }
    })

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    expect(result.current.user.email).toEqual('rubensojunior6@gmail.com')
  })

  it('should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@Naver:user':
          return JSON.stringify({
            id: 'user123',
            name: 'José',
            email: 'rubensojunior6@gmail.com',
            token: 'token-123',
          })
        default:
          return null
      }
    })

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem')

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    act(() => {
      result.current.signOut()
    })

    expect(removeItemSpy).toHaveBeenCalledTimes(1)
    expect(result.current.user).toMatchObject({})
  })
})
