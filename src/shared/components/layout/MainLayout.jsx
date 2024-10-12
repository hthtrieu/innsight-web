import React from 'react'
import Footer from '../footer/Footer';
import styles from './MainLayout.module.scss';
import Navbar from '../navbar/Navbar';
const MainLayout = ({ children }) => {
    return (
        <div className='flex flex-col'>
            <div className='w-full'>
                <Navbar />
            </div>

            <div className={`${styles['content']} w-full`}>
                {children}
            </div>
            <div className='w-full'>
                <Footer />
            </div>
        </div>
    )
}

export default MainLayout
