import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 280px;
  margin-bottom: 32px;

  img {
    width: 280px;
    height: 280px;
    margin-bottom: 16px;
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

  svg + svg {
    margin-left: 16px;
  }
`

export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
`
