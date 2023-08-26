import React from 'react'
import ReactDOM  from 'react-dom'
import styles from './Loader.module.scss'



function Loader() {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
    <div className={styles.loader}>
        <img src="'../../../public/img/loader/Rolling-1s-200px.gif'" alt="loading" />
    </div>
      
    </div>,
    document.getElementById("loader")
  );
}

export default Loader
