import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
  const { login } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    login(username, password)
  }

  // Fill demo credentials
  const handleDemoLogin = () => {
    setUsername('mor_2314')
    setPassword('83r5^_')
  }

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleSubmit}>
        <h2 className='login-title'>Welcome Back 👋</h2>

        <input 
          className='login-input' 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          placeholder="Username" 
        />
        <input 
          className='login-input' 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Password" 
        />

        <button className='login-button' type="submit">Login</button>

        <button 
          className='demo-login-button' 
          type="button" 
          onClick={handleDemoLogin}
          style={{
            marginTop: '10px',
            backgroundColor: 'red',
            border: '1px solid #ccc',
            padding: '8px',
            cursor: 'pointer'
          }}
        >
          Use Demo Account
        </button>

        <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#555' }}>
          Test login: <strong>Username:</strong> <code>mor_2314</code> | <strong>Password:</strong> <code>83r5^_</code>
        </p>
      </form>
    </div>
  )
}

export default Login
