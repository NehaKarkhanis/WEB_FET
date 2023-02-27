import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignupModal from '../SignupModal/SignupModal';
import login_img from "../../assets/login.jpg";

function SignupRestaurant() {

    const [restaurantName, setRestaurantName] = useState('');
    const [address, setAddress] = useState('');
    const [postalcode, setPostalCode] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [restaurantNameError, setRestaurantNameError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [postalcodeError, setPostalcodeError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [blankFromError, setBlankFormError] = useState('');

    const commonRegEx = new RegExp('^[A-Za-z]+$');
    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

    const [disabled, setDisabled] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if ('restaurantName' === name) {
            setRestaurantName(value);
        } else if ('address' === name) {
            setAddress(value);
        } else if ('postalcode' === name) {
            setPostalCode(value);
        }else if ('email' === name) {
            setEmail(value);
        } else if ('password' === name) {
            setPassword(value);
        } else if ('confirmPassword' === name) {
            setConfirmPassword(value);
        }
    }

    const handleInputValidation = e => {
        const { name, value } = e.target;
        if ('restaurantName' === name) {
            console.log(value);
            console.log(value.match(commonRegEx));
            if (!value) {
                setRestaurantNameError('Enter Restaurant name');
                setDisabled(true);
            } else if (!value.match(commonRegEx)) {
                setRestaurantNameError('Restaurant name can contain only alphabets');
                setDisabled(true);
            } else {
                setRestaurantNameError('');
                setDisabled(false);
            }
        } else if ('address' === name) {
            if (!value) {
                setAddressError('Enter address');
                setDisabled(true);
            } else if (!value.match(commonRegEx)) {
                setAddressError('Address can contain only alphabets');
                setDisabled(true);
            } else {
                setAddressError('');
                setDisabled(false);
            }
        }else if ('postalcode' === name) {
            if (!value) {
                setPostalcodeError('Enter postalcode');
                setDisabled(true);
            } else {
                setPostalcodeError('');
                setDisabled(false);
            }
        } else if ('email' === name) {
            if (!value) {
                setEmailError('Enter an email');
                setDisabled(true);
            } else if (!validEmail.test(value)) {
                setEmailError('Enter a valid email address');
                setDisabled(true);
            } else {
                setEmailError('');
                setDisabled(false);
            }
        } else if ('password' === name) {
            if (!value) {
                setPasswordError('Enter a password');
                setDisabled(true);
            } else if (value.length < 8) {
                setPasswordError('Password must containt min. 8 characters');
                setDisabled(true);
            } else if (confirmPassword && value !== confirmPassword) {
                setConfirmPasswordError('Password and confirm password do not match');
                setDisabled(true);
            } else if (confirmPassword && value === confirmPassword) {
                setConfirmPasswordError('');
                setPasswordError('');
                setDisabled(false);
            } else {
                setPasswordError('');
                setDisabled(false);
            }
        } else if ('confirmPassword' === name) {
            if (!value) {
                setConfirmPasswordError('Enter confirm password');
                setDisabled(true);
            } else if (value.length < 8) {
                setConfirmPasswordError('Confirm password must be min. 8 charceters');
                setDisabled(true);
            } else if (password && value !== password) {
                setConfirmPasswordError('Password and confirm password do not match');
                setDisabled(true);
            } else if (!password) {
                setPasswordError('Enter a password');
                setDisabled(true);
            } else if (password && value === password) {
                setConfirmPasswordError('');
                setDisabled(false);
            } else {
                setConfirmPasswordError('');
                setDisabled(false);
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleInputValidation(e);
        console.log(blankFromError);
        if (restaurantNameError || addressError || postalcodeError || emailError ||
            passwordError || confirmPasswordError) {
            setBlankFormError('Enter mandatory fields');
        } else {
            setBlankFormError('');
            setRestaurantName('');
            setAddress('');
            setPostalCode('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setShowModal(true);
        }
    }

    const handleModalClose = e => {
        setShowModal(false);
        navigate('/login');
    }

    return (
        <StyledSignupImgWrapper className="login-img-wrapper">
            <StyledForm className='form'>
                <div className='formContent'>
                    <div className='formTitle'>
                        <h3>Register Restaurant</h3>
                    </div>

                    <div className='inputWrapper'>
                        <label className='formLabel'>Restaurant Name*</label>
                        <input className='formInput' type='text' name='restaurantName' value={restaurantName} onChange={(e) => handleInputChange(e)} onBlur={handleInputValidation} placeholder='Restaurant Name' />
                    </div>
                    <div className='err'>
                        {<span className='err'>{restaurantNameError}</span>}
                    </div>

                    <div className='inputWrapper'>
                        <label className='formLabel'>Address*</label>
                        <input className='formInput' type='text' name='address' value={address} onChange={(e) => handleInputChange(e)} onBlur={handleInputValidation} placeholder='Address' />
                    </div>
                    <div className='err'>
                        {<span className='err'>{addressError}</span>}
                    </div>

                    <div className='inputWrapper'>
                        <label className='formLabel'>PostalCode*</label>
                        <input className='formInput' type='text' name='postalcode' value={postalcode} onChange={(e) => handleInputChange(e)} onBlur={handleInputValidation} placeholder='PostalCode' />
                    </div>
                    <div className='err'>
                        {<span className='err'>{postalcodeError}</span>}
                    </div>

                    <div className='inputWrapper'>
                        <label className='formLabel'>Email*</label>
                        <input className='formInput' type='email' name='email' value={email} onChange={(e) => handleInputChange(e)} onBlur={handleInputValidation} placeholder='Email' />
                    </div>
                    <div className='err'>
                        {<span className='err'>{emailError}</span>}
                    </div>

                    <div className='inputWrapper'>
                        <label className='formLabel'>Password*</label>
                        <input className='formInput' type='password' name='password' value={password} onChange={(e) => handleInputChange(e)} onBlur={handleInputValidation} placeholder='Password' />
                    </div>
                    <div className='err'>
                        {<span className='err'>{passwordError}</span>}
                    </div>

                    <div className='inputWrapper'>
                        <label className='formLabel'>Confirm Password*</label>
                        <input className='formInput' type='password' name='confirmPassword' value={confirmPassword} onChange={(e) => handleInputChange(e)} onBlur={handleInputValidation} placeholder='Confirm Password' />
                    </div>
                    <div className='err'>
                        {<span className='err'>{confirmPasswordError}</span>}
                    </div>

                    <div className='footNote'>
                        <p>* Mandatory fields</p>
                    </div>

                    <div className='err'>
                        {<span className='blank-err'>{blankFromError}</span>}
                    </div>

                    <button disabled={disabled} className='registerBtn' type='submit' onClick={(e) => handleSubmit(e)}>Register</button>
                    <div className='submit-modal'>
                        <SignupModal onClose={handleModalClose} showModal={showModal} />
                    </div>
                </div>
            </StyledForm>
            <StyledSignupImg className="login-img">
                <img src={login_img} alt="login_img" />
            </StyledSignupImg>
        </StyledSignupImgWrapper>
    )
}

const StyledSignupImgWrapper = styled.div`
    display: flex;
    width: 60%;
    box-shadow: 1px 1px 2px 2px #ccc;
    border-radius: 5px;
    margin: 1rem auto;
    padding: 3rem;
`


const StyledSignupImg = styled.div`
    flex-basis: 50%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const StyledForm = styled.form`
    margin:2rem auto;
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding: 0 1rem;
    .formContent {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .inputWrapper{
        display: flex;
        font-size: 1.5rem;
        flex-direction: column;
        gap: 1rem;
    }
    .inputWrapper > input {
        padding: 1rem;
        outline: none;
        border: none;
        box-shadow: 1px 1px 2px 2px #ccc;
        border-radius: 5px;
    }
    .err{
    padding: 0rem;
    color: red;
    font-size: small;
    text-align: right;
    }
    .registerBtn {
    width: fit-content;
    margin: 0 auto;
    padding: 0.5rem;
    background-color: rgb(16, 109, 240);
    border-radius: 5px;
    border:none;
    box-shadow: 1px 1px 1px 1px #ccc;
    color: white;
    letter-spacing: 1px;
    }
    .registerBtn:hover{
    cursor: pointer;
    }
    .registerBtn:disabled,
    .registerBtn[disabled]{
    cursor: not-allowed;
    color: #666666;
    background-color: #ccc;
    }
    .formTitle{
    text-align: center;
    font-size: 2rem;
    }
    .footNote{
    color: red;
    justify-content: left;
    font-size: small;
    padding: 0rem;
    }
`
export default SignupRestaurant;