import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { userAuthorLoginThunk } from "../../redux/slices/userAuthorSlice";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginUserStatus, errMsg, currentUser } = useSelector((state) => state.userAuthorLoginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onLoginFormSubmit(userCredentialsObject) {
    console.log(userCredentialsObject);
    userCredentialsObject.userType = 'admin'; // Set userType as admin
    dispatch(userAuthorLoginThunk(userCredentialsObject));
  }

  useEffect(() => {
    if (loginUserStatus === true) {
      console.log(currentUser.userType);
      if (currentUser.userType === 'admin') {
        navigate("/admin-profile"); // Redirect to admin profile if login is successful
      }
    }
  }, [loginUserStatus]);

  return (
    <div className='abc p-3'>
      <div className=''>
        <div className='p-3'>
          <div className='text-center m-5'>
            <div className='de d-block mx-auto w-50 container rounded-5 pt-4 pb-4 shadow-lg mx-5 my-5'>
              <h1 className="display-2 text-dark fw-semibold">Login</h1>
              {errMsg.length !== 0 && <div className='alert alert-danger w-75 d-block mx-auto fw-bold fs-5' role='alert'>{errMsg}</div>}
              <form className="w-50 mx-auto" onSubmit={handleSubmit(onLoginFormSubmit)}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" {...register("username", { required: true })} id="username" className="form-control fs-5" placeholder='Username' />
                  {errors.username?.type === 'required' && <h5 className='mx-4 text-start text-danger'>Username is required</h5>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" {...register("password", { required: true })} id="password" className="form-control fs-5 " placeholder='Password' />
                  {errors.password?.type === 'required' && <h5 className='mx-4 text-start text-danger'>Password is required</h5>}
                </div>
                <button type="submit" className="btn btn-dark fs-5 fw-medium m-3">Login</button>
                <p className='lead text-center fw-semibold fs-3 text-primary'>
                  New User !!
                  <Link to='/register' className='fs-4 fw-semibold'>
                    <p className='kh fw-medium text-primary'> Register Here!</p>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
