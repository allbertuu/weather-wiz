import { render, screen } from '@testing-library/react';
import Greetings from './index.js';

test('quando não há um período do dia válido, deve renderizar a saudação padrão', () => {
  render(<Greetings currentDayPeriod="invalido" />);
  const headingElement = screen.getByRole('heading', {
    name: /bem-vindo\(a\)/i,
  });
  expect(headingElement).toBeInTheDocument();
});

test('quando é manhã, deve renderizar a saudação de bom dia', () => {
  render(<Greetings currentDayPeriod="são 8 horas da manhã" />);
  const headingElement = screen.getByRole('heading', { name: /bom dia/i });
  expect(headingElement).toBeInTheDocument();
});

test('quando é tarde, deve renderizar a saudação de boa tarde', () => {
  render(<Greetings currentDayPeriod="são 15 horas da tarde" />);
  const headingElement = screen.getByRole('heading', { name: /boa tarde/i });
  expect(headingElement).toBeInTheDocument();
});

test('quando é noite, deve renderizar a saudação de boa noite', () => {
  render(<Greetings currentDayPeriod="são 20 horas da noite" />);
  const headingElement = screen.getByRole('heading', { name: /boa noite/i });
  expect(headingElement).toBeInTheDocument();
});

test('quando é madrugada, deve renderizar a saudação de boa madrugada', () => {
  render(<Greetings currentDayPeriod="são 2 horas da madrugada" />);
  const headingElement = screen.getByRole('heading', {
    name: /boa madrugada/i,
  });
  expect(headingElement).toBeInTheDocument();
});

test('deve renderizar a saudação corretamente independentemente do case', () => {
  render(<Greetings currentDayPeriod="SÃO 10 HORAS DA MANHÃ" />);
  const headingElement = screen.getByRole('heading', { name: /bom dia/i });
  expect(headingElement).toBeInTheDocument();
});

test('deve renderizar a saudação corretamente mesmo com espaços extras', () => {
  render(<Greetings currentDayPeriod="   são 18 horas da tarde   " />);
  const headingElement = screen.getByRole('heading', { name: /boa tarde/i });
  expect(headingElement).toBeInTheDocument();
});

test('deve renderizar a saudação padrão quando a string estiver vazia', () => {
  render(<Greetings currentDayPeriod="" />);
  const headingElement = screen.getByRole('heading', {
    name: /bem-vindo\(a\)/i,
  });
  expect(headingElement).toBeInTheDocument();
});
