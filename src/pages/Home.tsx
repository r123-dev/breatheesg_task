import React, { useState } from 'react'
import SignInBox from '../components/SignIn'
import SignUpBox from '../components/SignUp'
import LogoName from '../images/LogoName.jpg'
import Earth from '../images/Earth.png'

const Home: React.FC = () => {
    const [register, setRegister] = useState(0);
    return (
        <div className='home'>
            <div className='intro'>
                <p className='normal-white'>WELCOME TO</p>
                <img alt='logo' src={LogoName} width="350px" height="50px"></img>
                <p className='large-grey'>We help you track your organisation metrics as per ECG guidelines</p>
                <p className='normal-white'>Sounds Interesting? <a className="link" href='/'>Get in touch!</a></p>
            </div>
            <div className='formContainer'> 
                <img alt='earth' src={Earth} width="156px" height="152x"></img>
                {
                register ?
                    <SignInBox setRegister={setRegister} /> :
                    <SignUpBox setRegister={setRegister} />
                }
            </div>
            
        </div>
    )
}

export default Home
