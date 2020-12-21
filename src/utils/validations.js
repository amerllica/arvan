import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required('Required field'),
  password: yup.string().required('Required field'),
});

export const RegisterSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required('Required field'),
  password: yup.string().required('Required field'),
  username: yup.string().required('Required field'),
});
