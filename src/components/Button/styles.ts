import styled from 'styled-components'
import { lighten } from 'polished'

export const Container = styled.button`
  background: #212121;
  height: 40px;
  border: 0;
  padding: 0 16px;
  color: #ffffff;
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  margin-top: 32px;
  transition: background-color 0.2s;

  &:hover {
    background: ${lighten(0.2, '#212121')};
  }
`
