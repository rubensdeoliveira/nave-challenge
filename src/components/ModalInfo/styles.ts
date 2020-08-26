import styled from 'styled-components'

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

export const CloseButton = styled.button`
  display: flex;
  align-items: center;

  border: 0;
  background: transparent;
  position: absolute;
  top: 21px;
  right: 21px;
`
