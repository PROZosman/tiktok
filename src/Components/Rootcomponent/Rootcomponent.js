import React from 'react'
import "./style.css"

const Rootcomponent = ({ images, name, button }) => {
    return (
        <>
            <div className="Rootcomponent_wrapper">
                <div className='Rootcomponent_images'>
                    <img src={images} alt="" />
                </div>
                <div className='Rootcomponent_name'>
                    <h5>{name}</h5>
                </div>
                {button &&
                    <div className='Rootcomponent_btn'>
                        <button type="button">{button}</button>
                    </div>
                }
            </div>
        </>
    )
}

export default Rootcomponent;
