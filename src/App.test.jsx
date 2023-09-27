import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
    test('should show input and button when page loads', () => {
        render(<App />);
      
        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button');
      
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
      });
    
    test('Should render data when the user searches "house"'), async () => {
        render(<App />)
        const user = userEvent.setup()

        const input = screen.getByRole('textbox');
        await user.type(input, "house")
      
        const button = screen.getByRole('button');
        await user.click(button)

        expect(await screen.findByText('house')).toBeInTheDocument();
        expect(await screen.findByText('example')).toBeInTheDocument();
        expect(await screen.findByText('definition')).toBeInTheDocument();
    }

    test('Should render error message when no value is in input search'), async () => {
        render(<App />)

        const input = screen.getByRole('textbox');
        input.value = '';
      
        const button = screen.getByRole('button');
        button.click();

        expect(screen.getByText("Sorry pal, we couldn't find definitions for the word you were looking for.")).toBeInTheDocument();
    }
});