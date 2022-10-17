import {Component} from 'react';
import {signUp} from '../../utilities/users-service';
import "./SignUpForm.css"


export default class SignUpForm extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: '',
    }

    handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const formData = {...this.state};
            delete formData.error;
            delete formData.confirm;
            const user = await signUp(formData);
            this.props.setUser(user);
        } catch {
            this.setState({
                error: 'Sign Up Failed - Try Again'
            });
        }
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value,
            error: ''
        });
    };

    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
            <div>

                <div className="form-container-log-in">
            
                    <form className="sign-in-form" autoComplete="off" onSubmit={this.handleSubmit}>
                        <label className='label-in-signin-form'>Name</label>
                        <input className='input-in-signin-form' type="text" name="name" value={this.state.name} onChange={this.handleChange} required/>
                        <label className='label-in-signin-form'>Email</label>
                        <input className='input-in-signin-form' type="email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                        <label className='label-in-signin-form'>Password</label>
                        <input className='input-in-signin-form' type="password" name="password" value={this.state.password} onChange={this.handleChange} required/>
                        <label className='label-in-signin-form'>Confirm</label>
                        <input className='input-in-signin-form' type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required/>
                        <button className='sl-button' type="submit" disabled={disable}>SIGN UP</button>
                    </form>
                </div>
                <p className="error-message">&nbsp;{this.state.error}</p>
            </div>
        );
    }
};
