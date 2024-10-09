import PropTypes from 'prop-types';
import styles from './TagItem.module.css';

const TagItem = ({ suggestion, addTag }) => {
  return (
    <div onClick={() => addTag(suggestion)} className={styles.suggestion}>
      #{suggestion}
    </div>
  );
};

TagItem.propTypes = {
  suggestion: PropTypes.string,
  addTag: PropTypes.func,
};

export default TagItem;
