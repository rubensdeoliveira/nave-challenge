import styled from 'styled-components'

export const NaversBar = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;

  margin-top: 64px;
  margin-bottom: 36px;

  width: 100%;

  h1 {
    font-size: 40px;
    font-weight: 600;
    line-height: 48px;
    color: #212121;
  }

  button {
    width: 100%;
    margin-top: 24px;

    @media (min-width: 440px) {
      width: 176px;
      margin-top: 0px;
    }
  }

  @media (min-width: 440px) {
    justify-content: space-between;
  }
`

export const NaversContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
`
