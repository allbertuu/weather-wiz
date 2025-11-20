import { render, screen } from '@testing-library/react';
import SupportCreator from '.';
import { act } from 'react';
import { pix } from '../../my-data';

test('deve renderizar o componente SupportCreator', () => {
  render(<SupportCreator />);

  const linkElement = screen.getByText(/Apoiar o criador deste site/i);

  expect(linkElement).toBeInTheDocument();
});

test('deve exibir o diálogo com o código Pix ao interagir com o texto', () => {
  render(<SupportCreator />);

  const textElement = screen.getByText(/Apoiar o criador deste site/i);
  textElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
  const dialogElement = screen.getByText(/Pix:/i);

  expect(dialogElement).toBeInTheDocument();
});

test('deve copiar o código Pix para a área de transferência ao clicar no diálogo', () => {
  Object.assign(navigator, {
    clipboard: {
      writeText: vi.fn(),
    },
  });
  render(<SupportCreator />);

  const textElement = screen.getByText(/Apoiar o criador deste site/i);
  textElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
  const dialogElement = screen.getByText(/Pix:/i);
  act(() => {
    dialogElement.click();
  });

  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(pix.random);
});

test('deve fechar o diálogo ao mover o mouse para fora do texto', () => {
  render(<SupportCreator />);

  const textElement = screen.getByText(/Apoiar o criador deste site/i);
  textElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
  const dialogElement = screen.getByText(/Pix:/i);

  textElement.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
  expect(dialogElement).not.toBeVisible();
});
