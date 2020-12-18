export default function validate(values) {
    
    let errors = {};
    
    if (!values.first_name) {
        errors.first_name = 'Name is required';
    }
    if (!values.last_name) {
        errors.last_name = 'Last name is required';
    }

    if (!values.email) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    if (!values.username) {
        errors.username = 'Username is required';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be 6 or more characters';
    }
    return errors;
};