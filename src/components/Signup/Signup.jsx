
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Signup() {

// function validate(values){
//     const myError={}
     
//     if (!values.name){
//         myError.name="Name is Required."
//     }
//     if (!values.email){
//         myError.email="Email is Required."
//     }
//     if (!/^[A-z][a-zA-Z0-9]{6,}$/.test(values.password)){
//         myError.password="Password is correct."
//     }
//     if (values.password!=values.rePassword){
//         myError.email="Password and rePassword not match ."
//     }
//     return myError
// }

let navigate = useNavigate()
let [errMsg, setErrMsg] = useState('')

function sendDataToApi(values) {
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).then(({ data }) => {
        console.log(data);
        if (data.message == 'success') {
            //to signin
            navigate('/signin')
        }
    }).catch(err => {
        setErrMsg(err.response.data.message)
        console.log(err.response.data.message);
    })

}

function validationSchema() {
    let errors = Yup.object({
        name: Yup.string().min(2).max(20).required(),
        email: Yup.string().email().required(),
        password: Yup.string().matches(/^[A-Z][a-zA-Z0-9]{6,}$/).required(),
        rePassword: Yup.string().oneOf([Yup.ref('password')])
    })
    return errors
}

    let register = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: ''
        },

        // validate:validation
        // validate
        validationSchema,

        onSubmit: (values) => {
            console.log(values);
            //send to api json.stringfy
            sendDataToApi(values)
        }
    })
    console.log(register.errors)
    return (
        <div>
            <div className="w-75 m-auto my-5 ">
                <h2>Register Now:</h2>
                <form onSubmit={register.handleSubmit}>
                    <label htmlFor="Name">Name:</label>
                    <input onBlur={register.handleBlur} value={register.values.name} onChange={register.handleChange} className={`form-control mb-3    ${register.errors.name?'is-invalid' : ''} `} type="text" name='name' id='Name' />
                   {register.errors.name&&register.touched.name? <div className="alert alert-danger">
                        {register.errors.name}
                    </div>:''} 
                    
                    <label htmlFor="Email">Email:</label>
                    <input onBlur={register.handleBlur} value={register.values.email} onChange={register.handleChange} className='form-control mb-3' type="email" name='email' id='Email' />
                    {register.errors.email&&register.touched.email? <div className="alert alert-danger">
                        {register.errors.email}
                    </div>:''} 
                    
                    <label htmlFor="Password">Password:</label>
                    <input onBlur={register.handleBlur} value={register.values.password} onChange={register.handleChange} className='form-control mb-3' type="password" name='password' id='Password' />
                    {register.errors.password&&register.touched.password? <div className="alert alert-danger">
                        {register.errors.password}
                    </div>:''} 
                    
                    <label htmlFor="Repassword">Repassword:</label>
                    <input onBlur={register.handleBlur} value={register.values.rePassword} onChange={register.handleChange} className='form-control mb-3' type="password" name='rePassword' id='Repassword' />
                    {register.errors.rePassword&&register.touched.rePassword? <div className="alert alert-danger">
                        {register.errors.rePassword}
                    </div>:''} 

                    {errMsg? <div className="alert alert-danger">
                        {errMsg}
                    </div>:''}

                    <button disabled={!(register.isValid&&register.dirty)} type='submit' className='btn bg-main text-white'>Signup</button>
                </form>
            </div>
        </div>
    )
}
