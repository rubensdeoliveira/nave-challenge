import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 280px;
  margin-bottom: 32px;

  button {
    border: 0;
    background: transparent;
    display: flex;
    align-items: center;

    img {
      height: 100%;
      width: 100%;
      margin-bottom: 16px;
    }
  }

  h2 {
    font-size: 16px;
    line-height: 18px;
    font-weight: 600;
    color: #212121;
    margin-bottom: 4px;
  }

  p {
    font-size: 16px;
    line-height: 24px;
    color: #212121;
    margin-bottom: 13px;
  }
`

export const ActionContainer = styled.div`
  display: flex;
  align-items: center;

  button {
    border: 0;
    background: transparent;
  }

  button + button {
    margin-left: 16px;
  }
`
