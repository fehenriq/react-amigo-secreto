import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import Formulario from './Formulario'

describe('Comportamento do Formulario.tsx', () => {
  test('Quando o input está vazio, novos participantes não podem ser adicionados', () => {
    render(<RecoilRoot> <Formulario /> </RecoilRoot>)
    //Encontrar no DOM o input
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    //Encontrar o botão
    const botao = screen.getByRole('button')
    //Garantir que o input esteja no documento
    expect(input).toBeInTheDocument()
    //Garantir que o botão esteja no documento
    expect(botao).toBeDisabled()
  })

  test('Adicionar um participante caso exista um nome preenchido', () => {
    render(<RecoilRoot> <Formulario /> </RecoilRoot>)
    //Encontrar no DOM o input
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    //Encontrar o botão
    const botao = screen.getByRole('button')
    //Inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: 'Felipe'
      }
    })
    //Clicar no botão de submeter
    fireEvent.click(botao)
    //Garantir que o input esteja com o foco ativo
    expect(input).toHaveFocus()
    //Garantir que o input não tenha um valor
    expect(input).toHaveValue("")
  })

  test('Nomes duplicados não podem ser adicionados na lista', () => {
    render(<RecoilRoot> <Formulario /> </RecoilRoot>)
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')
    fireEvent.change(input, {
      target: {
        value: 'Felipe'
      }
    })
    fireEvent.click(botao)
    fireEvent.change(input, {
      target: {
        value: 'Felipe'
      }
    })
    fireEvent.click(botao)

    const mensagemDeErro = screen.getByRole('alert')

    expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos!')
  })

  test('A mensagem de erro dve sumir após os timers', () => {
    jest.useFakeTimers()
    render(<RecoilRoot> <Formulario /> </RecoilRoot>)
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')
    fireEvent.change(input, {
      target: {
        value: 'Felipe'
      }
    })
    fireEvent.click(botao)
    fireEvent.change(input, {
      target: {
        value: 'Felipe'
      }
    })
    fireEvent.click(botao)
    let mensagemDeErro = screen.queryByRole('alert')
    expect(mensagemDeErro).toBeInTheDocument()

    act(() => {
      jest.runAllTimers()
    });

    mensagemDeErro = screen.queryByRole('alert')
    expect(mensagemDeErro).toBeNull()
  })
})

