import React from 'react'
import CampusDetails from '../components/CampusDetails'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function CampusDetailsInput() {
    return (
        <>
        <Navbar/>
        <CampusDetails style={{ paddingTop: '4rem' }} />
        <Footer/>
        </>

    )
}

export default CampusDetailsInput;
