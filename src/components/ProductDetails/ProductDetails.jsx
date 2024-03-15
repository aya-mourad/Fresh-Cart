import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Product from '../Product/Product'
import { wishcontext } from '../Context/WishlistContextProvider';
import { CartContext } from '../Context/CartContext'
import { toast } from 'react-toastify'


export default function ProductDetails() {
let {id}=useParams()


let[products,setProducts]=useState([])
   async function getProduct(){
    let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products/'+id);
    console.log(data);
    setProducts(data.data)
   }

   useEffect(() => {
    getProduct()
   },[])


   let {counter,setcounter,addToCart}=  useContext(CartContext)
   let {  addToWishList, getUserWish } = useContext(wishcontext); 
   let [btnLoading,setBtnLoading]=useState(true)
   let [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

   async function addProductToCart(id){
     setBtnLoading(false)
    let data = await addToCart(id)
   //  console.log(data);
    if(data.status == "success"){
     toast.success('Product added succefully');
     setcounter(data.numOfCartItems);
     setBtnLoading(true);
    }
}

async function addProductToWish(id) {
 let data = await addToWishList(id)
      console.log(data);
      if(data.status == "success"){
        toast.success('Product added succefully To wishList');
        setIsAddedToWishlist(true);
}
}

  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col-md-3">
                <img src={products.imageCover} className='w-100' alt="" />
            </div>
            <div className="col-md-8">
               <div className="content    m-auto mt-5 pt-5">
                   <h2 className='fw-bolder'>{products.title}</h2>
                   <p className='fs-6'>{products.description}</p>
               </div>
               <div className='d-flex justify-content-between'>
                     <p>{products.price} EGP</p>
                     <p><i className="fa-solid fa-star rating-color"></i>{products.ratingsAverage}</p>
                            
                </div>
                <div className="content">
                     <button disabled={!btnLoading} onClick={()=>addProductToCart(products._id)} className='btn bg-main w-75 text-white '>
                        
                        {btnLoading?'Add To Cart':<i className='fa fa-spinner fa-spin'></i>}
                    </button>
                     <span className={`fs-3 ms-3 cursor-pointer ${isAddedToWishlist ? 'text-red' : ''}`} onClick={() => addProductToWish(products._id)}>
                           <i className="fa-solid fa-heart"></i> </span>      
                      
                     </div>
            </div>
        </div>
    </div>
    
    </>
  )
}