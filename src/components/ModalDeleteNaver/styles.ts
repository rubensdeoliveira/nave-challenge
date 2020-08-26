import styled from 'styled-components'
import Button from '../Button'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;

  h1 {
    font-size: 24px;
    line-height: 36px;
    font-weight: 600;
    color: #212121;
  }

  p {
    line-height: 36px;
    color: #212121;
    margin-top: 24px;
  }
`

export const ActionContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;

  margin-top: 36px;

  button + button {
    margin-left: 0px;
    margin-top: 10px;

    @media (min-width: 700px) {
      margin-left: 24px;
      margin-top: 0px;
    }
  }

  button {
    width: 100%;

    @media (min-width: 700px) {
      width: 176px;
    }
  }
`

export const CancelButton = styled(Button)`
  background: #ffffff;
  border: 1px solid #212121;
  color: #212121;
`
