import React from 'react'
import Navs from './Nav'
import Title from './title'

const MainPageLayout = ({ children }) => {
    return (
        <>
        <Title title="Box-Office" subTitle="Are you looking for an actor or movie"></Title>
            <Navs />
            {children}
        </>
    )
}

export default MainPageLayout