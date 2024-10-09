import { useContext } from 'react';
import { CartContext } from '../store/Context';
import { TAGS_LIST } from '../tags-list';
import './TagInput.css';

const TagInput = () => {
  const { addTag, onChangeTagInput, suggestions, inputValue } =
    useContext(CartContext);

  const renderTags = () => {
    const words = inputValue.split(' ');
    return words.map((word) => {
      if (word.startsWith('#')) {
        const tag = word.substring(1);
        const isKnownTag = TAGS_LIST.includes(tag);

        return (
          <span key={word} className={isKnownTag ? 'known-tag' : 'custom-tag'}>
            {word}{' '}
          </span>
        );
      }
    });
  };

  return (
    <div className='tagging-input'>
      <div className='input-display'>{renderTags()}</div>
      <input
        className='input-text'
        value={inputValue}
        onChange={onChangeTagInput}
        placeholder='Type and use #tags...'
      />
      {suggestions.length > 0 && (
        <div className='suggestions'>
          {suggestions.map((suggestion) => (
            <div
              key={suggestion}
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
