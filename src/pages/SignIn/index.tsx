import React, { useRef, useCallback } from 'react'

import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { Container, Content } from './styles'

import logo from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(() => {
    console.log('entrando')
  }, [])

  return (
    <Container>
      <Content>
        <img src={logo} alt="nave.rs" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="email" label="E-mail" placeholder="E-mail" />

          <Input
            name="password"
            label="Senha"
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default SignIn
