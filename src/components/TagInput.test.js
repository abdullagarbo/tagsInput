import { render, screen, fireEvent } from '@testing-library/react';
import TagInput from './TagInput';

import { CartContext } from '../store/Context';

/* global describe, test, expect, jest */

// Mock context values for testing
const mockAddTag = jest.fn();
const mockOnChangeTagInput = jest.fn();

const renderComponent = (value) => {
  render(
    <CartContext.Provider value={value}>
      <TagInput />
    </CartContext.Provider>
  );
};

// test suites
describe('TagInput component', () => {
  test('should render the input field with placeholder', () => {
    renderComponent({
      addTag: mockAddTag,
      onChangeTagInput: mockOnChangeTagInput,
      suggestions: [],
      inputValue: '',
    });

    expect(
      screen.getByPlaceholderText('Type and use #tags...')
    ).toBeInTheDocument();
  });

  test('should render known tags with correct class', () => {
    const inputValue = '#kidney';
    renderComponent({
      addTag: mockAddTag,
      onChangeTagInput: mockOnChangeTagInput,
      suggestions: [],
      inputValue,
    });

    // Check if the tag is rendered and has the 'known-tag' class
    const tag = screen.getByText('#kidney');
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveClass('known-tag');
  });

  test('should render custom tags with correct class', () => {
    const inputValue = '#home';
    renderComponent({
      addTag: mockAddTag,
      onChangeTagInput: mockOnChangeTagInput,
      suggestions: [],
      inputValue,
    });

    const tag = screen.getByText('#home');
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveClass('custom-tag');
  });

  test('should trigger onChangeTagInput when typing', () => {
    renderComponent({
      addTag: mockAddTag,
      onChangeTagInput: mockOnChangeTagInput,
      suggestions: [],
      inputValue: '',
    });

    const input = screen.getByPlaceholderText('Type and use #tags...');
    fireEvent.change(input, { target: { value: '#newTag' } });

    expect(mockOnChangeTagInput).toHaveBeenCalledTimes(1);
  });

  test('should render suggestions and call addTag when clicked', () => {
    const suggestions = ['suggestion1', 'suggestion2'];
    renderComponent({
      addTag: mockAddTag,
      onChangeTagInput: mockOnChangeTagInput,
      suggestions,
      inputValue: '',
    });

    const suggestion1 = screen.getByText('#suggestion1');
    expect(suggestion1).toBeInTheDocument();

    fireEvent.click(suggestion1);
    expect(mockAddTag).toHaveBeenCalledWith('suggestion1');
  });

  test('should not render suggestions if empty', () => {
    renderComponent({
      addTag: mockAddTag,
      onChangeTagInput: mockOnChangeTagInput,
      suggestions: [],
      inputValue: '',
    });

    expect(screen.queryByText('#suggestion1')).not.toBeInTheDocument();
  });
});
