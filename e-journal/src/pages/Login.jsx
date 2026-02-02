import LoginImg from '../assets/LoginImg.svg'
import '../styles/Auth.css'

function Login() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-illustration" aria-hidden="true">
          <img src={LoginImg} alt="" className="auth-image" />
        </div>
        <section className="auth-panel" aria-label="Login">
          <h1 className="auth-title">Login To Account</h1>
          <p className="auth-subtitle">Enter your personal data to login</p>

          <form className="auth-form">
            <label className="auth-field">
              <span className="auth-label">Email</span>
              <input type="email" placeholder="eg. johnfrans@gmail.com" />
            </label>

            <label className="auth-field">
              <span className="auth-label">Password</span>
              <input type="password" placeholder="Enter your password" />
            </label>

            <button type="submit" className="auth-submit">
              Login
            </button>
          </form>

          <p className="auth-footer">
            Don&apos;t have an account yet? <a href="/signup">Sign Up</a>
          </p>
        </section>
      </div>
    </div>
  )
}

export default Login

