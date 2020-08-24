import styled, { css } from 'styled-components'

import Tooltip from '../Tooltip'

interface ContainerProps {
  isErrored: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 4px;
  }

  & + div {
    margin-top: 32px;
  }
`

export const InputContainer = styled.div<ContainerProps>`
  background: #ffffff;
  padding: 16px 8px;
  width: 100%;
  height: 40px;

  border: 1px solid #424242;

  display: flex;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #333;

    &::placeholder {
      color: #9e9e9e;
    }
  }

  svg {
    margin-right: 16px;
  }

  label {
    color: red;
  }
`

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`
