import React from 'react'

export default function Category({item, handleShow}) {
    return (
        <div key={item._id} className='col-md-4'>
            <div className="content text-center">
                <div
                    className={`box my-5 `}
                    onClick={() => handleShow(item)} 
                >
                    <img src={item.image} alt="" className={`squareimage`} />
                    <h5 className={`caption text-main`}>{item.name}</h5>
                </div>
            </div>
        </div>
    );
}