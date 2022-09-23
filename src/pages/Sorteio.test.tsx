import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaParticipantes } from "../state/hooks/useListaParticipantes";
import Sorteio from "./Sorteio";

jest.mock('../state/hooks/useListaParticipantes', () => {
  return {
    useListaParticipantes: jest.fn()
  }
})

describe('A pagina de sorteio', () => {
  const participantes = ['Fran', 'Dri', 'Bruno']

  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes)
  })

  test('Todos os participantes podem exibir o seu amigo secreto', () => {
    render(<RecoilRoot> <Sorteio /> </RecoilRoot>)

    const opcoes = screen.queryAllByRole('option')
    expect(opcoes).toHaveLength(3)
  })
})