import PropTypes from 'prop-types';
import styles from './Tags.module.css';

const Tags = ({ word, isKnownTag }) => {
  return (
    <span className={isKnownTag ? styles['known-tag'] : styles['custom-tag']}>
      {word}{' '}
    </span>
  );
};

Tags.propTypes = {
  word: PropTypes.string,
  isKnownTag: PropTypes.bool,
};

export default Tags;
