import React, { useContext, useEffect, useState } from 'react';
import { wishcontext } from '../Context/WishlistContextProvider';
import { CartContext } from '../Context/CartContext'
import { toast } from 'react-toastify';

export default function WishList() {
  const { getUserWish,RemoveFromWish } = useContext(wishcontext);
  const [item, setItem] = useState([]);
  const { counter, setcounter, addToCart } = useContext(CartContext);

  useEffect(() => {
    (async () => {
      let data = await getUserWish();
      setItem(data?.data);
    })();
  }, []);


  async function addProductToCart(id) {
    let data = await addToCart(id);
    if (data?.data?.status === 'success') {
      toast.success('Product added successfully');
    }
  }



  //   async function removeProduct(id) {
  //         let data = await RemoveFromWish(id);
  //         setItem(data?.data);
  //         if (data?.data?.status === "success") {
  //             // console.log(response)
  //             toast.success('Product removed Successfuly');
  //         } 
  // }

  async function removeProduct(id) {
    try {
      let response = await RemoveFromWish(id);
      if (response.status === "success") {
        console.log(response)
        setItem(response.data); // Update the state with updated cart data
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  }


  return (
    <div>
      {item && item.length > 0 ? (
        <div className='container bg-main-light mt-5'>
          <h2 className='fw-bolder p-3 '>My WishList</h2>
          {item.map((product) => {
            const isAddedToWishlist = true;
            return (
              <div key={product._id} className='row border-bottom p-2'>
                <div className='col-md-2'>
                  <img src={product.imageCover} className='w-100' alt='' />
                </div>
                <div className='col-md-10 d-flex justify-content-between mt-5 '>
                  <div>
                    <p>{product.title}</p>
                    <p className={`text-main m-0 fw-bolder ptext`}>Price: {product.price} EGP</p>
                    <button onClick={() => removeProduct(product._id)} className={`btn m-0 p-0 text-red ptext`}>
                      <i className='fa-solid fa-trash-can '></i> <span >Remove</span>
                    </button>
                  </div>
                  <div>
                    <button className='btn brdr' onClick={() => addProductToCart(product._id)}> add To Cart </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className='container bg-main-light mt-5'>
          <div className='content p-4'>
            <h2 className='p-2 fw-bolder'>My WishList</h2>
          </div>
        </div>
      )}
    </div>
  );
}