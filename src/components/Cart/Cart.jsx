import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartContext'
import Loading from '../Loading/Loading'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Cart() {
    let { getUserCart, updateCount, setCounter, DeleteFromCart, ClearCart,CheckOut } = useContext(CartContext)
    let [items, setItem] = useState([])
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [btnLoading, setBtnLoading] = useState(false); 

    async function updateProductQuantity(id, newCount) {
        let res = await updateCount(id, newCount);
        console.log(res.data.data)
        if (res?.data?.status === 'success') {
            setItem(res.data.data)
            setCounter(res?.data?.numOfCartItems);
            toast.success('Quantity updated Successfuly');
        }
    }


    async function deleteProduct(id) {
        let res = await DeleteFromCart(id);
        setItem(res?.data)
        if (res?.data?.status === 'success') {
            toast.success('Product removed Successfuly');
        }
    };

    async function clearCart() {
        try {
            const response = await ClearCart();
            if (response.status === "success") {
                setItem([]);
                setTotalCartPrice(0);
            }
        } catch (error) {
            console.error("Error clearing cart:", error);
            setBtnLoading(false); 
        }
    };

    async function Payment(id) {
        let data = await CheckOut(id);
        window.location.href=data.session.url;
    }

    useEffect(() => {
        (async () => {
            let { data } = await getUserCart()
            setItem(data?.data)
        })()
    }, [])

    console.log(items)

if (btnLoading) {
        <Loading />
    }

    return (
        <>
            {items !== null && items?.products?.length > 0 ?
                <div className="container bg-main-light my-2 p-3">
                    <div className="header d-flex justify-content-between flex-wrap ">
                        <div className="content">
                            <h2>Shop Cart :</h2>
                            <p className='text-main'>Total Cart Price : {items?.totalCartPrice} EGP </p>
                        </div>
                        <div className="butt m-5">
                            <button onClick={()=>Payment(items._id)} className='btn bg-main text-white'>Check out</button>
                        </div>
                    </div>
                    {items?.products?.map(item => {
                        return <div key={item._id} className="row border-bottom p-2">
                            <div className="col-md-1 ">
                                <img src={item.product.imageCover} class='w-100' alt="" />
                            </div>
                            <div className="col-md-11 d-flex justify-content-between ">
                                <div>
                                    <p className='m-0'>{item.product.title}</p>
                                    <p className='text-main m-0'>Price: {item.price} EGP</p>
                                    <button onClick={() => deleteProduct(item.product._id)} className='btn m-0 mt-2 p-0'><i class="fa-solid fa-trash-can text-main "></i> Remove</button>
                                </div>
                                <div>
                                    <button onClick={() => { updateProductQuantity(item.product._id, item.count + 1) }} className='btn border-main btn-sm' style={{ height: 'fit-content' }}>+</button>
                                    <span className='mx-3'>{item.count}</span>
                                    <button disabled={item.count == 1} onClick={() => { updateProductQuantity(item.product._id, item.count - 1) }} className='btn border-main btn-sm' style={{ height: 'fit-content' }}>-</button>
                                </div>
                            </div>
                        </div>
                    })}
                    {btnLoading ? (
                        <button className='btn bg-main text-white w-25 mb-3 mt-2' disabled>Clearing Cart...</button>
                    ) : (
                        <Link to="/Home">
                            <button onClick={clearCart} className='btn bg-main text-white w-25 mb-3 mt-2'>Clear your Cart</button>
                        </Link>
                    )}

                </div> :<h2 className='text-center'>Your cart is empty</h2>}

        </>
    )
}






