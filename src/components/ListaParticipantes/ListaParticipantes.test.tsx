import { render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { useListaParticipantes } from '../../state/hooks/useListaParticipantes';
import ListaParticipantes from './ListaParticipantes';

jest.mock('../../state/hooks/useListaParticipantes', () => {
  return {
    useListaParticipantes: jest.fn()
  }
})

describe('Uma lista de participantes', () => {
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue([])
  })
  test('Deve ser renderizada sem elementos', () => {
    render(<RecoilRoot> <ListaParticipantes /> </RecoilRoot >)

    const itens = screen.queryAllByRole('listitem')
    expect(itens).toHaveLength(0)
  })
})

describe('Uma lista preenchida de participantes', () => {
  const participantes = ['Fran', 'Dri']
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes)
  })

  test('Deve ser renderizada sem elementos', () => {
    render(<RecoilRoot> <ListaParticipantes /> </RecoilRoot >)

    const itens = screen.queryAllByRole('listitem')
    expect(itens).toHaveLength(participantes.length)
  })
})