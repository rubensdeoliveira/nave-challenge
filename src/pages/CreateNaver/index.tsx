import React, { useRef, useCallback } from 'react'

import { FaChevronLeft } from 'react-icons/fa'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useHistory, Link } from 'react-router-dom'
import Header from '../../components/Header'
import {
  Content,
  TitleContainer,
  FormContainer,
  StyledButtonContainer,
} from './styles'
import Button from '../../components/Button'
import Input from '../../components/Input'
import getValidationErrors from '../../utils/getValidationErrors'
import InputMask from '../../components/InputMask'
import api from '../../services/api'

interface INaverInfo {
  name: string
  admission_date: string
  job_role: string
  project: string
  birthdate: string
  url: string
}

const CreateNaver: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: INaverInfo) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          job_role: Yup.string().required('Cargo obrigatório'),
          birthdate: Yup.date().required('Idade obrigatória'),
          admission_date: Yup.date().required('Tempo de empresa obrigatório'),
        })

        await schema.isValid(new Date('dd/mm/yyyy'))

        await schema.validate(data, {
          abortEarly: false,
        })

        api.post('navers', data)

        history.push('/home')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)
        }
      }
    },
    [history],
  )

  return (
    <>
      <Header />

      <Content>
        <TitleContainer>
          <Link to="/home">
            <FaChevronLeft size={20} color="#000000" />
          </Link>
          <h1>Adicionar Naver</h1>
        </TitleContainer>

        <FormContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="name" label="Nome" placeholder="Nome" />

            <Input name="job_role" label="Cargo" placeholder="Cargo" />

            <InputMask
              name="birthdate"
              label="Idade"
              placeholder="Idade"
              mask="99/99/9999"
            />

            <InputMask
              name="admission_date"
              label="Tempo de empresa"
              placeholder="Tempo de empresa"
              mask="99/99/9999"
            />

            <Input
              name="project"
              label="Projetos que participou"
              placeholder="Projetos que participou"
            />

            <Input
              name="url"
              label="URL da foto do Naver"
              placeholder="URL da foto do Naver"
            />

            <StyledButtonContainer>
              <Button type="submit">Salvar</Button>
            </StyledButtonContainer>
          </Form>
        </FormContainer>
      </Content>
    </>
  )
}

export default CreateNaver
