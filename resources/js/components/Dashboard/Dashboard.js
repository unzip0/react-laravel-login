import React from 'react'
import { Button } from "reactstrap";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/auth';


const Dashboard = ({history}) => {
    const dispatch = useDispatch();
    const { id, firstName, lastName, email, username } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch( logout() );
        history.push('/login');
    }

    return (
        <div>
            <br></br><br></br><br></br>
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <img src="images/logo.jpg" className="img-fluid" />
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Dashboard</div>
                        <div className="card-body">
                            <div className="alert alert-success" role="alert">
                                <div className="row">
                                    <div className="col-md-3">
                                        <p className="font-weight-bold">UID</p>
                                        <p className="font-weight-bold">First name</p>
                                        <p className="font-weight-bold">Last name</p>
                                        <p className="font-weight-bold">Email</p>
                                        <p className="font-weight-bold">Username</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{id}</p>
                                        <p>{firstName}</p>
                                        <p>{lastName}</p>
                                        <p>{email}</p>
                                        <p>{username}</p>
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                        <div className="card-footer text-muted">
                            <div className="row">
                                <div className="col-md-4">
                                    You are logged in!
                                </div>
                                <div className="col-md-4 offset-md-4">
                                    <Button
                                        className="text-center mb-4 btn-block"
                                        color="warning"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
