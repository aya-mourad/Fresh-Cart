import React, { createContext, useState } from 'react'
import axios from 'axios'

export let CartContext = createContext(0)
export default function CartContextProvider({ children }) {
    getUserCart()
    let [counter, setCounter] = useState(0)

    async function addToCart(productId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId }, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(data => data).catch(err => err)

    }
    async function getUserCart() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then(data => data).catch(err => err)

    }
    async function updateCount(id, newCount) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count: newCount }, {

            headers: {
                token: localStorage.getItem("token")
            }
        }).then(data => data).catch(err => err)


    }
    async function DeleteFromCart(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers: { token: localStorage.getItem('token') }
            }).then(({ data }) => data).catch(err => err)
    }
    async function ClearCart(){
        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart',
        { headers:{token: localStorage.getItem('token') }
         }).then(({data})=>data).catch(err=> err)
          
      }
      

      async function CheckOut(cartId){
        return axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/"+cartId,{  },
        { headers:{token: localStorage.getItem('token') }
         }).then(({data})=>data).catch(err=> err)
      
      }

    return <CartContext.Provider value={{ counter, setCounter, addToCart, getUserCart, updateCount, DeleteFromCart,ClearCart,CheckOut }}>

        {children}

    </CartContext.Provider>

}
