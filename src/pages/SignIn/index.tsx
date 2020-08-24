import React from 'react'

import { Container, Content } from './styles'

import logo from '../../assets/logo.png'

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logo} alt="nave.rs" />
    </Content>
  </Container>
)

export default SignIn
