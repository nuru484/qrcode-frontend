import * as yup from 'yup';

// Yup validation schema
const schema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  username: yup
    .string()
    .required('Username is required')
    .min(4, 'Username must be at least 4 characters')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters'),
  // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  // .matches(/[0-9]/, 'Password must contain at least one number')
  // .matches(
  //   /[^A-Za-z0-9]/,
  //   'Password must contain at least one special character'
  // )
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  role: yup
    .string()
    .required('Role is required')
    .oneOf(['ADMIN', 'STUDENT'], 'Please select a valid role (ADMIN, STUDENT)'),
  identification: yup
    .string()
    .required('Identification is required')
    .min(3, 'Identification must be at least 6 characters'),
});

export default schema;
