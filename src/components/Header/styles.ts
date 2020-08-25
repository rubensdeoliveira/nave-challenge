import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 85px;

  a {
    display: flex;
    align-items: center;

    img {
      width: 145px;
      height: 37px;
    }
  }

  button {
    border: 0;
    background: transparent;
    color: #000000;
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
  }
`
