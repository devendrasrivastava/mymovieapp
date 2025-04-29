import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import '../css/SignUp.css';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      city: '',
      phone: '',
      age: '',
      password: '',
      confirmpassword: '',
    },
    validationSchema: yup.object({
      firstname: yup
        .string()
        .min(3, 'First name is too short')
        .max(20, 'First name is too long')
        .matches(/^[a-zA-Z.]{2,}$/, 'Please enter a valid First Name')
        .required('Firstname cannot be left blank'),
      lastname: yup
        .string()
        .min(3, 'Last name is too short')
        .max(20, 'Last name is too long')
        .matches(/^[a-zA-Z.]{2,}$/, 'Please enter a valid Last Name')
        .required('Lastname cannot be left blank'),
      email: yup.string().email('Invalid email address').required('Email cannot be left blank'),
      city: yup
        .string()
        .required('City cannot be left blank')
        .matches(/^[a-zA-Z.\s]{2,}$/, 'Please enter a valid City'),
      phone: yup
        .string()
        .required('Phone cannot be left blank')
        .matches(/^[6-9][0-9]{9}$/, 'Please enter a valid mobile number.'),
      age: yup
        .date()
        .min(new Date(Date.now() - 60 * 365.25 * 24 * 60 * 60 * 1000), 'You must be under 60 years old')
        .max(new Date(Date.now() - 18 * 365.25 * 24 * 60 * 60 * 1000), 'You must be at least 18 years old')
        .required('Date of Birth is required'),
      password: yup
        .string()
        .required('Password cannot be left blank')
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
          'Password must be 6-20 characters, including uppercase, lowercase, and numeric digits.'
        ),
      confirmpassword: yup
        .string()
        .required('Confirm Password cannot be left blank')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: (values) => {
      fetch('http://localhost:8765/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.userId) {
            navigate('/loginpage');
          }
        })
        .catch(() => alert('An error occurred. Please try again.'));
    },
  });

  return (
    <div className="container mt-5 user-signup">
      <h2 className="text-center mb-4">Sign Up</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">First Name</label>
          <input
            type="text"
            className={`form-control ${formik.touched.firstname && formik.errors.firstname ? 'is-invalid' : ''}`}
            id="firstname"
            name="firstname"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstname && formik.errors.firstname && (
            <div className="invalid-feedback">{formik.errors.firstname}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">Last Name</label>
          <input
            type="text"
            className={`form-control ${formik.touched.lastname && formik.errors.lastname ? 'is-invalid' : ''}`}
            id="lastname"
            name="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastname && formik.errors.lastname && (
            <div className="invalid-feedback">{formik.errors.lastname}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input
            type="text"
            className={`form-control ${formik.touched.city && formik.errors.city ? 'is-invalid' : ''}`}
            id="city"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.city && formik.errors.city && (
            <div className="invalid-feedback">{formik.errors.city}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="text"
            className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="invalid-feedback">{formik.errors.phone}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="invalid-feedback">{formik.errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">Date of Birth</label>
          <input
            type="date"
            className={`form-control ${formik.touched.age && formik.errors.age ? 'is-invalid' : ''}`}
            id="age"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.age && formik.errors.age && (
            <div className="invalid-feedback">{formik.errors.age}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className={`form-control ${formik.touched.confirmpassword && formik.errors.confirmpassword ? 'is-invalid' : ''}`}
              id="confirmpassword"
              name="confirmpassword"
              value={formik.values.confirmpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
            {formik.touched.confirmpassword && formik.errors.confirmpassword && (
              <div className="invalid-feedback">{formik.errors.confirmpassword}</div>
            )}

          </div>
          <Link to="/loginpage" variant="body2">
            {"Already Registered? Login Page"}
          </Link>
        </div>

        <button type="submit" className="btn btn-primary w-100 submitbutton">Sign Up</button>
      </form>
    </div>
  );
}
