import axios from 'axios';
import React, { useState } from 'react';
import { useQueries } from 'react-query';
import Loading from '../Loading/Loading';
import Category from '../Category/Category';

export default function Categories() {
    function getAllCategories() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }

    function getAllSub() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/subcategories");
    }

    const [selectedItem, setSelectedItem] = useState(null);

    const queries = useQueries([
        { queryKey: 'getAllCategories', queryFn: getAllCategories },
        { queryKey: 'getAllSub', queryFn: getAllSub },
    ]);

    const handleShow = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className="container my-5">
            <div className="row">
                {queries[0].data?.data.data.map((item) => (
                    <Category key={item._id} item={item} handleShow={handleShow}/>
                ))}
            </div>
            {selectedItem && (
                <div className="container mt-5">
                    <h2 className='text-center text-main fw-bolder'>{selectedItem.name} subcategories</h2>
                        <div className="row">
                            {queries[1].data?.data.data.map((subItem) => (
                                subItem.category === selectedItem._id && (
                                    <div key={subItem._id} className="col-md-3">
                                        <div className="content">
                                            <div className={`boxtext`}>
                                                <h4 className='fw-bolder'>{subItem.name}</h4>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    
                </div>
            )}
        </div>
    );
}