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
