import React from 'react';
import { Link } from 'react-router-dom';

const Navs = () => {
    const links = [
        {to:'/',text:'Home'},
        {to:'/starred',text:'Starred'}
    ]
    return (
        <div>
            <ul>
                {
                    links.map((item)=>{
                        return <li key={item.to}><Link to={item.to}>{item.text}</Link></li>
                    })
                }
            </ul>
        </div>
    )
}

export default Navs;