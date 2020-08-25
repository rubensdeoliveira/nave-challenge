import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 448px;
  height: 408px;
  border: 1px solid #212121;
  padding: 40px 32px;

  img {
    width: 235px;
    height: 60px;
    margin-bottom: 40px;
  }

  form {
    width: 100%;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    button {
      max-width: unset;
      margin-top: 32px;
    }

    div + div {
      margin-top: 32px;
    }
  }
`
