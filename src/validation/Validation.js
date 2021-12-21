import * as Yup from 'yup';

const LoginValidation = Yup.object({
  username: Yup.string().email('Invalid Email!').required('You have omitted Email field'),
  password: Yup.string().min(6, 'The password must not be less than 6 char!').required('You have omitted password field'),
});

const RegisterValidation = Yup.object({
  email: Yup.string().email('Invalid Email!').required('You have omitted Email field'),
  firstName: Yup.string().min(5, "First Name can't be less than 6 char").required('You have omitted First Name field!'),
  lastName: Yup.string().min(5, "Last Name can't be less than 6 char").required('You have omitted Last Name field!'),
  password1: Yup.string().min(6, 'The Password must not be less than 6 char!').required('You have omitted password field'),
  password2: Yup.string()
    .oneOf([Yup.ref('password1'), null], 'Passwords must match')
    .required("You've omitted this field"),
});

const EmailValidation = Yup.object({
  email: Yup.string().email('Invalid Email!').required('You have omitted Email field'),
});

const PostValidation = Yup.object({
  title: Yup.string().min(5, "Title Name can't be less than 6 char").required('You have omitted Title  field!'),
  content: Yup.string().min(20, "Content can't be less than 20 char").required('You have omitted Content  field!'),
});

const ResetValidation = Yup.object({
  password1: Yup.string().min(6, 'The password must not be less than 6 char!').required('You have omitted password field'),
  password2: Yup.string()
    .oneOf([Yup.ref('password1'), null], 'Passwords must match')
    .required("You've omitted this field"),
});
export { LoginValidation, RegisterValidation, EmailValidation, ResetValidation, PostValidation };
