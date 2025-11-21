import { render, screen } from '@testing-library/react';
import GeolocationInfos from '.';

test('quando localName não é fornecido, exibe local padrão', () => {
  render(<GeolocationInfos />);

  const strongElement = screen.getByText(/algum lugar agradável/i);

  expect(strongElement).toBeInTheDocument();
  expect(strongElement.tagName).toBe('STRONG');
});

test('quando localName é fornecido, exibe o local correto', () => {
  const testLocalName = 'São Paulo';
  render(<GeolocationInfos localName={testLocalName} />);

  const strongElement = screen.getByText(testLocalName);

  expect(strongElement).toBeInTheDocument();
  expect(strongElement.tagName).toBe('STRONG');
});

test('exibe a hora atual formatada', () => {
  render(<GeolocationInfos />);
  const currentHour = new Date();
  const formattedHour = currentHour
    .toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace('.', ':');

  const timeElement = screen.getByText(formattedHour, { exact: false });

  expect(timeElement).toBeInTheDocument();
  expect(timeElement.tagName).toBe('TIME');
});
