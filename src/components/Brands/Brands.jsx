import axios from 'axios'
import React from 'react'
import { useQuery  } from 'react-query';
import Brand from '../Brand/Brand';
import Loading from '../Loading/Loading'
import { useState } from 'react';


export default function Brands() {
    let [loading, setLoading] = useState(true)

    function getBrands() {
        setLoading(false)
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    }
  
    let { data } = useQuery("getBrands", getBrands);
   
    if (loading) {
        <Loading />
    }
    return (
        <div className="container">
            <div className="title text-center my-3 ">
                <h2 className='text-main fw-bolder'> ALL Brands</h2>
            </div>
            <div className="row">
                {data?.data.data.map((item) => (<Brand key={item._id} item={item} />

                ))}

            </div>
        </div>
    )
}