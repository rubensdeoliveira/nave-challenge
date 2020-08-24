import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  max-width: 448px;
  height: 408px;
  border: 1px solid #212121;
  padding: 40px 32px;

  img {
    width: 235px;
    height: 60px;
  }
`
