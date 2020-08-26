import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 10px;

  width: 100%;
  max-width: 1000px;
  max-height: 500px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    padding: 0;
  }
`

export const ImageContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    width: 50%;
  }

  img {
    width: 100%;
    height: 100%;
  }
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 80%;

  @media (min-width: 768px) {
    width: 50%;
    padding: 32px 30px 27px 30px;
    height: 500px;
  }

  h1 {
    font-size: 24px;
    line-height: 36px;
    font-weight: 600;
    margin-top: 24px;
    color: #000000;

    @media (min-width: 768px) {
      margin-top: 0px;
    }
  }

  h2 {
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    margin-top: 24px;
    color: #212121;
  }

  p {
    margin-top: 10px;
    line-height: 24px;
    color: #212121;
  }
`

export const ActionContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;

  button {
    display: flex;
    align-items: center;

    border: 0;
    background: transparent;

    margin-top: 32px;
    margin-bottom: 27px;

    @media (min-width: 768px) {
      margin-bottom: 0px;
    }
  }

  button + button {
    margin-left: 16px;
  }
`
