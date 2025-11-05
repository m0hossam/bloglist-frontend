import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')

    const handleCreateBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
        }
        addBlog(newBlog)
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
    }

    return (
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
    )
}

export default BlogForm