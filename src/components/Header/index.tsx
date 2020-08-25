import React from 'react'

import { Container } from './styles'

import logo from '../../assets/logo.png'
import { useAuth } from '../../hooks/auth'

const Header: React.FC = () => {
  const { signOut } = useAuth()

  return (
    <Container>
      <img src={logo} alt="nave.rs" />
      <button type="button" onClick={signOut}>
        Sair
      </button>
    </Container>
  )
}

export default Header
