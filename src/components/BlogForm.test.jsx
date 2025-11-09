import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

test('Blog form calls the event handler with the right details when a new blog is created', async () => {
    const blog = {
        title: 'ABC Murders',
        author: 'Agatha Christie',
        url: 'https://agathachristie.com/abc_murders',
    }

    const formHandler = vi.fn()

    render(<BlogForm addBlog={formHandler} />)

    const user = userEvent.setup()

    const title = screen.getByLabelText('Title')
    const author = screen.getByLabelText('Author')
    const url = screen.getByLabelText('URL')
    const button = screen.getByText('Create')

    await user.type(title, blog.title)
    await user.type(author, blog.author)
    await user.type(url, blog.url)
    await user.click(button)

    expect(formHandler.mock.calls).toHaveLength(1)
    expect(formHandler.mock.calls[0][0]).toStrictEqual(blog)
})