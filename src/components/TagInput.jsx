import { useState } from 'react';
import './TagInput.css';

const tagList = [
  'liver',
  'pain',
  'right',
  'left',
  'pancreas',
  'kidney',
  'brain',
  'severe_pain',
  'tumour',
  'cancer',
  'MRI',
  'CT',
  'male',
  'female',
  'bone',
  'shoulder',
  'hip',
  'XRAY',
  'knee',
  'spine',
  'head',
  'abdomen',
  'contrast',
  'fragment',
  'detached',
  'injury',
  'torn',
  'rotator',
  'cuff',
  'abdominal',
  'dilatation',
];

const TagInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [tags, setTags] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Detect if user is typing a new tag
    const lastWord = value.split(' ').pop();
    if (lastWord.startsWith('#')) {
      const query = lastWord.substring(1).toLowerCase();
      const filteredSuggestions = tagList.filter((tag) =>
        tag.startsWith(query)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Add selected suggestion to the tags list
  const addTag = (tag) => {
    setTags([...tags, tag]);
    setInputValue(inputValue.replace(/#\w+$/, `#${tag} `)); // Replace the current word with the selected tag
    setSuggestions([]);
  };

  // Render the input with highlighted tags
  const renderTags = () => {
    const words = inputValue.split(' ');
    return words.map((word, index) => {
      if (word.startsWith('#')) {
        const tag = word.substring(1);
        const isKnownTag = tagList.includes(tag);
        // const isCustomTag = !isKnownTag && tag !== '';

        return (
          <span key={index} className={isKnownTag ? 'known-tag' : 'custom-tag'}>
            {word}{' '}
          </span>
        );
      }
      return word + ' ';
    });
  };

  return (
    <div className='tagging-input'>
      <div className='input-display'>{renderTags()}</div>
      <input
        className='input-text'
        value={inputValue}
        onChange={handleChange}
        placeholder='Type and use #tags...'
      />
      {suggestions.length > 0 && (
        <div className='suggestions'>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => addTag(suggestion)}
              className='suggestion'
            >
              #{suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
