import { useContext } from 'react';
import { CartContext } from '../store/Context';
import Tags from './Tags';
import TagItem from './TagItem';
import { TAGS_LIST } from '../tags-list';
import styles from './TagInput.module.css';

const TagInput = () => {
  const { addTag, onChangeTagInput, suggestions, inputValue } =
    useContext(CartContext);

  const renderTags = () => {
    const words = inputValue.split(' ');
    return words.map((word) => {
      if (word.startsWith('#')) {
        const tag = word.substring(1);
        const isKnownTag = TAGS_LIST.includes(tag);
        return <Tags key={word} word={word} isKnownTag={isKnownTag} />;
      }
    });
  };

  return (
    <div className={styles['tagging-input']}>
      <div className={styles['input-display']}>{renderTags()}</div>
      <input
        className={styles['input-text']}
        value={inputValue}
        onChange={onChangeTagInput}
        placeholder='Type and use #tags...'
      />
      {suggestions.length > 0 && (
        <div className={styles['suggestions']}>
          {suggestions.map((suggestion) => (
            <TagItem key={suggestion} suggestion={suggestion} addTag={addTag} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
