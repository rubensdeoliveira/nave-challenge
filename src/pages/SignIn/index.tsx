import React, { useRef, useCallback } from 'react'

import * as Yup from 'yup'

import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { useHistory } from 'react-router-dom'
import { Container, Content } from './styles'

import logo from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useAuth } from '../../hooks/auth'
import getValidationErrors from '../../utils/getValidationErrors'

interface ISignInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { signIn } = useAuth()

  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: ISignInFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail inválido'),
          password: Yup.string().required('Senha obrigatória'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await signIn({
          email: data.email,
          password: data.password,
        })

        history.push('/dashboard')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)
        }
      }
    },
    [signIn, history],
  )

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
