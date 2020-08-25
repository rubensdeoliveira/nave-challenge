import React from 'react'

import { Link } from 'react-router-dom'
import { Container } from './styles'

import logo from '../../assets/logo.png'
import { useAuth } from '../../hooks/auth'

const Header: React.FC = () => {
  const { signOut } = useAuth()

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="nave.rs" />
      </Link>
      <button type="button" onClick={signOut}>
        Sair
      </button>
    </Container>
  )
}

export default Header
