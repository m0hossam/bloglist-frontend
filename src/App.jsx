import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs)
      )
      .catch(() => console.log('Could not connect to DB')
      )
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user')

    if (userJSON) {
      const user = JSON.parse(userJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault() // Prevent default redirection behavior of forms

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      createNotification('Wrong username or password', true)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(prevBlogs => prevBlogs.concat(createdBlog))
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      createNotification(`New blog '${createdBlog.title}' by '${createdBlog.author}' added`, false)
    } catch {
      createNotification('Invalid title, author, or URL', true)
    }
  }

  const createNotification = (msg, isError) => {
    const notif = {
      message: msg,
      isError: isError
    }
    setNotification(notif)
    setTimeout(() => setNotification(null), 3000)
  }

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
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
      <Notification notification={notification} />
      <h2>blogs</h2>
      <div>
        Hello, {user.name}
      </div>
      <button onClick={handleLogout}>Logout</button>
      <br />
      <div>
        <h2>Create New Blog</h2>
        <form onSubmit={handleCreateBlog}>
          <div>
            <label>
              Title
              <input type='text' value={blogTitle} onChange={(event) => setBlogTitle(event.target.value)} />
            </label>
          </div>
          <div>
            <label>
              Author
              <input type='text' value={blogAuthor} onChange={(event) => setBlogAuthor(event.target.value)} />
            </label>
          </div>
          <div>
            <label>
              URL
              <input type='url' value={blogUrl} onChange={(event) => setBlogUrl(event.target.value)} />
            </label>
          </div>
          <button type='submit'>Create</button>
        </form>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App