import styled from 'styled-components'

export const Content = styled.div`
  width: 100%;
  max-width: 592px;
  margin: 0 auto;
  margin-top: 40px;
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  a {
    display: flex;
    align-items: center;
  }

  h1 {
    font-size: 24px;
    font-weight: 600;
    line-height: 36px;
    color: #212121;
    margin-left: 22px;
  }
`

export const FormContainer = styled.div`
  width: 100%;

  form {
    width: 100%;

    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    > div {
      width: 100%;
      max-width: 280px;

      div {
        margin-bottom: 32px;
      }
    }

    @media (min-width: 625px) {
      justify-content: space-between;
    }
  }
`

export const StyledButtonContainer = styled.span`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (min-width: 625px) {
    justify-content: flex-end;
  }
`
