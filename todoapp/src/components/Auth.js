import { useState } from 'react'
import { useCookies} from 'react-cookie'

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [isLogIn, setIsLogin] = useState(true)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)

  const viewLogin = (status) => {
    setError(null)
    setIsLogin(status)
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault()
    if (!isLogIn && password !== confirmPassword) {
      setError('Make sure passwords match!')
      return
    }
    if(email.length==0||password.length==0){
      setError(true)

    }
    
    const response = await fetch(`http://localhost:8000/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, password})
    })

    const data = await response.json()

    if (data.detail) {
      setError(data.detail)
    } else {
      setCookie('Email', data.email)
      setCookie('AuthToken', data.token)

      window.location.reload()
    }

  }


  return (
    <div className="container">
      <div className="contact-box">
      <div className='left'> </div>
        <div className="right">
        <form>
          <h2>{isLogIn  ? 'Log in' : 'Sign up!'}</h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          /> <br />
          {error && email.length<=0?
          <label id='labels'>Email can't be empty</label>:""}
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          /> <br />
           {error && password.length<=0?
          <label id='labels'>password can't be empty</label>:""}
          {!isLogIn && <input
            type="password"
            placeholder="confirm password"
            onChange={(e) =>setConfirmPassword(e.target.value)}
          />}
          <br />
          <input type="submit" className="create" onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')} /><br />
          {error && <label>{error}</label>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{backgroundColor : !isLogIn ? '#EF4F67' : '#fff' , color : !isLogIn ? '#fff' : '#EF4F67'}}
          >Sign Up</button>
          <button
            onClick={() => viewLogin(true)}
            style={{backgroundColor : isLogIn ? '#EF4F67' : '#fff' , color : !isLogIn ? '#EF4F67' : '#fff'}}
          >Login</button>
        </div>
        </div>
      </div>
    </div>
  )
}



export default Auth







  
