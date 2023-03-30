import React from 'react';
import "./style.css";
import Rootcomponent from '../Rootcomponent/Rootcomponent';
import { Mygroupsdata } from './data';

const Mygroups = () => {
    return (
        <div className='Mygroups'>
            <div className="Mygroups_header">
                <h4>Mygroups</h4>
            </div>
            {
                Mygroupsdata.map((item, i) => (
                    <Rootcomponent key={i} images={item.images} name={item.name} button={item.button} />
                ))
            }
        </div>
    )
}

export default Mygroups
