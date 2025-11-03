import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs)
      )
      .catch(() => console.log('Could not connect to DB')
      )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault() // Prevent default redirection behavior of forms

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      console.log('Wrong credentials')
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Login to the app</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              Username
              <input type='text' value={username} onChange={(event) => setUsername(event.target.value)} />
            </label>
          </div>
          <div>
            <label>
              Password
              <input type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        Hello, {user.name}
      </div>
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App