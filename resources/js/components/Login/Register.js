import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useDispatch } from 'react-redux';
import validate from '../../rules/RegisterFormRules';
import useForm from '../../hooks/useForm';
import {getRegister} from '../../helpers/getRegister';
import { login } from '../../../actions/auth';
import Nav from '../Nav/Nav';


const SignUp = ({ history }) => {

    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(false);
    const [ responseError, setResponseError] = useState([]);
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(register, validate, setResponseError);

    function register() {
        setLoading(true);
        getRegister(values)
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
                            values.first_name,
                            values.last_name,
                            values.email,
                            values.username
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
            <Nav/>
            <Form
                onSubmit={handleSubmit} 
                className="containers shadow"
            >
                <FormGroup>
                    <Label for="first_name">Name</Label>
                    <Input
                        type="first_name"
                        name="first_name"
                        placeholder="Enter name"
                        value={values.first_name || ''}
                        onChange={handleChange}
                    />
                    {errors.first_name && (
                     <small className="text-danger">{errors.first_name}</small>
                    )}
                </FormGroup>
                
                <FormGroup>
                    <Label for="last_name">Last name</Label>
                    <Input
                        type="last_name"
                        name="last_name"
                        placeholder="Enter last name"
                        value={values.last_name || ''}
                        onChange={handleChange}
                    />
                    {errors.last_name && (
                    <small className="text-danger">{errors.last_name}</small>
                    )}
                </FormGroup>
                
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
                    <Label for="username">Username</Label>
                    <Input
                        type="username"
                        name="username"
                        placeholder="Enter user name"
                        value={values.username || ''}
                        onChange={handleChange}
                    />
                    {errors.username && (
                    <small className="text-danger">{errors.username}</small>
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
                    disabled={isLoading ? true : false}
                >
                    Sign Up
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
}

export default SignUp;