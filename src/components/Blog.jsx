import { useState } from 'react'

const Blog = ({ blog, handleLike, showRemoveButton, handleRemove }) => {
    const [showDetails, setShowDetails] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle}>
            <h3>{blog.title} <button onClick={() => setShowDetails(p => !p)}>{showDetails ? 'Hide details' : 'Show details'}</button></h3>
            {
                showDetails && (
                    <div>
                        <p>Author: {blog.author}</p>
                        <p>Likes: {blog.likes} <button onClick={() => handleLike(blog)}>Like</button></p>
                        <p>URL: {blog.url}</p>
                        <p>Submitted by: {blog.user.username}</p>
                    </div>
                )
            }
            {
                showRemoveButton && (
                    <button onClick={() => handleRemove(blog)}>Remove</button>
                )
            }
        </div>
    )
}

export default Blog