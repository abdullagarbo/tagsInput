import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import TagInput from './TagInput';

/*global describe, test, expect*/

// test suites
describe('TagInput component', () => {
  test('renders input component as a test', () => {
    render(<TagInput />);

    const inputElement = screen.getByPlaceholderText('Type and use #tags...', {
      exact: false,
    });

    expect(inputElement).toBeInTheDocument();
  });
});
