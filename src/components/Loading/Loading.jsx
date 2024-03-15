import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

export default function Loader() {
    return <>
        <div className='my-5 text-center '>
                <ThreeCircles
                    height="490"
                    width="100"
                    color="#0aad0a"
                    wrapperStyle={{}}
                    wrapperClass="d-felx justify-content-center"
                    visible={true}
                    ariaLabel="three-circles-rotating"
                />
        </div>
    </>
}
