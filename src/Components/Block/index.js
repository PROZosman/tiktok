import React from 'react';
import { Blockdata } from './data';
import "./style.css";
import Rootcomponent from '../Rootcomponent/Rootcomponent';

const Block = () => {
    return (
        <div>
            <>
                <div className='Block'>
                    <div className="Block_header">
                        <h4>Block</h4>
                    </div>
                    {
                        Blockdata.map((item, i) => (
                            <Rootcomponent key={i} images={item.images} name={item.name} button={item.button} />
                        ))
                    }
                </div>
            </>
        </div>
    )
}

export default Block;
