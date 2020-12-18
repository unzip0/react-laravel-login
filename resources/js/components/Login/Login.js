import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import validate from '../../rules/LoginFormRules';
import useForm from '../../hooks/useForm';
import { getLogin } from '../../helpers/getLogin';
import { login } from '../../../actions/auth';
import Nav from '../Nav/Nav';

const SignIn = ({history}) => {

    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(false);
    const [ responseError, setResponseError] = useState([]);
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(handleLogin, validate, setResponseError);
    

    function handleLogin() {
        setLoading(true);
        getLogin(values)
            .then( response => {
                if (response.status === 'failed'){
                    Object.keys(response.errors).map((field, pos) =>(
                        setResponseError(responseError => [ ...responseError, response.errors[field][0]])
                    ));
                    setLoading(false);
                }else{
                    dispatch(
                        login(
                            response.data.id,
                            response.data.first_name,
                            response.data.last_name,
                            values.email,
                            response.data.username
                        ),
                    );
                    history.push('/dashboard');
                }
            });
        
    }

    const isLoading = loading;
    const errors_response = responseError;

    return (
        <div className="col-md-6 offset-md-3">
            <Nav />
            <Form onSubmit={handleSubmit} className="containers">
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={values.email || ''}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <small className="text-danger">{errors.email}</small>
                    )}
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={values.password || ''}
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <small className="text-danger">{errors.password}</small>
                    )}
                </FormGroup>
                {errors_response && (
                    errors_response.map( (error, i) => (
                        <p key={i} className="text-danger">{error}</p>
                    ))
                    
                )}  
                <Button
                    className="text-center mb-4 btn-block"
                    color="success"
                    type="submit"
                >
                    Sign In
                    {isLoading ? (
                    <span
                        className="spinner-border spinner-border-sm ml-5"
                        role="status"
                        aria-hidden="true"
                    ></span>
                    ) : (
                    <span></span>
                    )}
                </Button>
            </Form>
      </div>
    )
    
};

export default SignIn;

