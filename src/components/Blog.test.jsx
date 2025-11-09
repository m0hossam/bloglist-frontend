import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

test('Blog renders title & author, does not render URL,likes, or username', () => {
    const blog = {
        title: 'ABC Murders',
        author: 'Agatha Christie',
        likes: 55,
        url: 'https://agathachristie.com/abc_murders',
        user: {
            username: 'm0hossam'
        }
    }

    render(<Blog blog={blog} />)

    const head = screen.getByText(`${blog.title} - ${blog.author}`)
    expect(head).toBeDefined()

    const likes = screen.queryByText(`Likes: ${blog.likes}`)
    expect(likes).toBeNull()

    const url = screen.queryByText(`URL: ${blog.url}`)
    expect(url).toBeNull()

    const username = screen.queryByText(`Submitted by: ${blog.user.username}`)
    expect(username).toBeNull()
})

test('Blog renders likes, URL, and username when the show button is clicked', async () => {
    const blog = {
        title: 'ABC Murders',
        author: 'Agatha Christie',
        likes: 55,
        url: 'https://agathachristie.com/abc_murders',
        user: {
            username: 'm0hossam'
        }
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('Show details')
    await user.click(button)

    const likes = screen.getByText(`Likes: ${blog.likes}`)
    expect(likes).toBeDefined()

    const url = screen.getByText(`URL: ${blog.url}`)
    expect(url).toBeDefined()

    const username = screen.getByText(`Submitted by: ${blog.user.username}`)
    expect(username).toBeDefined()
})