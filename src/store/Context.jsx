import { useState, createContext, useMemo } from 'react';
import { TAGS_LIST } from '../tags-list.js';

export const CartContext = createContext({
  inputValue: '',
  tags: [],
  suggestions: [],
  addTag: () => {},
  onChangeTagInput: () => {},
});

export default function CartContextProvider({ children }) {
  const [data, setData] = useState({
    inputValue: '',
    tags: [],
    suggestions: [],
  });

  function handleAddTag(tag) {
    setData((prevState) => {
      return {
        ...prevState,
        inputValue: prevState.inputValue.replace(/#\w+$/, `#${tag} `),
        tags: [...prevState.tags, tag],
        suggestions: [],
      };
    });
  }

  function handleInputChange(event) {
    const value = event.target.value;
    setData((prevState) => {
      return {
        ...prevState,
        inputValue: value,
      };
    });

    // Detect if user is typing a new tag
    const lastWord = value.split(' ').pop();
    if (lastWord.startsWith('#')) {
      const query = lastWord.substring(1).toLowerCase();
      const filteredSuggestions = TAGS_LIST.filter((tag) =>
        tag.startsWith(query)
      );
      setData((prevState) => {
        return {
          ...prevState,
          suggestions: filteredSuggestions,
        };
      });
    } else {
      setData((prevState) => {
        return {
          ...prevState,
          suggestions: [],
        };
      });
    }
  }

  const ctxValue = useMemo(
    () => ({
      inputValue: data.inputValue,
      tags: data.tags,
      suggestions: data.suggestions,
      addTag: handleAddTag,
      onChangeTagInput: handleInputChange,
    }),
    [data]
  );

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
