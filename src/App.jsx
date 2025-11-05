import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [notification, setNotification] = useState(null)
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

    const addBlog = async (newBlog) => {
        try {
            const createdBlog = await blogService.create(newBlog)
            setBlogs(prevBlogs => prevBlogs.concat(createdBlog))
            createNotification('New blog added', false)
        } catch {
            createNotification('Invalid title, author, or URL', true)
        }
    }

    const incrementBlogLikes = async (blog) => {
        try {
            const newBlog = { ...blog, likes: blog.likes + 1 }
            const updatedBlog = await blogService.update(blog.id, newBlog)
            setBlogs(prevBlogs => prevBlogs.map(b => b.id === blog.id ? updatedBlog : b))
        } catch {
            createNotification('Blog update failed', true)
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
                Hello, {user.name} <button onClick={handleLogout}>Logout</button>
            </div>
            <br />
            <Togglable showButtonLabel='Create New Blog'>
                <BlogForm addBlog={addBlog} />
            </Togglable>
            <br />
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} handleLike={incrementBlogLikes} />
            )}
        </div>
    )
}

export default App