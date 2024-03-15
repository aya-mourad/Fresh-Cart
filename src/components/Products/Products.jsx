import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Product from '../Product/Product'
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';

export default function Products() {
    const [searchQuery, setSearchQuery] = useState('');
  
    function getProduct() {
      return axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }
  
    let { data, isLoading } = useQuery('getProduct', getProduct);
  
    return (
      <>
        <div className="container my-3">
          <div className="search d-flex justify-content-center align-items-center flex-wrap">
            <input
              type="text"
              className="form-control m-5 w-75"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="row">
            {isLoading ? (
              <Loading />
            ) : (
              data?.data.data
                .filter((item) =>
                  item.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item) => <Product key={item._id} item={item} />)
            )}
          </div>
        </div>
      </>
    );
  }
