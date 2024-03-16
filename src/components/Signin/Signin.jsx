import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
export default function Signin() {

    let navigate = useNavigate()
    let [errMsg, setErrMsg] = useState('')


    function sendDataToApi(values) {
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).then(({ data }) => {
            console.log(data);
            if (data.message == 'success') {
                //to signin
                localStorage.setItem("token",data.token)
                navigate('/home')
            }
        }).catch(err => {
            setErrMsg(err.response.data.message)
            console.log(err.response.data.message);
        })

    }

    function validationSchema() {

        let errors = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().matches(/^[A-Z][a-zA-Z0-9]{6,}$/).required(),
        })
        return errors
    }

    let login = useFormik({
        initialValues: {

            email: '',
            password: '',

        },
        validationSchema
        ,
        onSubmit: (values) => {
            console.log(values);
            // send to api
            sendDataToApi(values)
        }
    })

    return (
        <div>

            <div className="w-75 m-auto my-5">
                <h2>login Now:</h2>
                <form onSubmit={login.handleSubmit}>


                    <label htmlFor="Email">Email:</label>
                    <input onBlur={login.handleBlur} value={login.values.email} onChange={login.handleChange} className='form-control mb-3' type="email" name="email" id="Email" />
                    {login.errors.email && login.touched.email ? <div className="alert alert-danger">
                        {login.errors.email}
                    </div> : ''}

                    <label htmlFor="password">Password:</label>
                    <input onBlur={login.handleBlur} value={login.values.password} onChange={login.handleChange} className='form-control mb-3' type="password" name="password" id="password" />
                    {login.errors.password && login.touched.password ? <div className="alert alert-danger">
                        {login.errors.password}
                    </div> : ''}


                    {errMsg ? <div className="alert alert-danger">
                        {errMsg}
                    </div> : ''}

                    <button disabled={!(login.isValid && login.dirty)} type='submit' className='btn bg-main text-white'>Signin</button>
                    <Link to={'/forgetPassword'}> <h4 className='mt-3'>Forgot Password?</h4></Link>
                </form>
            </div>
        </div>
    )
}

