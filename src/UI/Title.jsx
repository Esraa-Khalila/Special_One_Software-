import React from 'react';
import styles from './Title.module.css'

const Title = (props) => {
  return (
    <div>
      <h2 className={styles.head__text}>{props.headText}</h2>
    </div>
  );
}

export default Title