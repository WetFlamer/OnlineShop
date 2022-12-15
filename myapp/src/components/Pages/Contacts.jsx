import React from 'react';
import styles from '../styles/Contacts.module.css'
const Contacts = () => {
    return (
        <div className={styles.map}>
             <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa0b4a8254ab883b96d4a6922697e2c6e9a3998c01fd95746e338dfe7ff877d0b&amp;source=constructor" width="1057" height="641" frameborder="0"></iframe>
        </div>
    );
};

export default Contacts;