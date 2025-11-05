const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    const errorStyle = {
        padding: 10,
        backgroundColor: '#ff000011',
        border: '2px solid red',
        color: 'red',
        fontStyle: 'italic',
        fontSize: 16
    }

    const successStyle = {
        padding: 10,
        backgroundColor: '#00ff0011',
        border: '2px solid green',
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    return (
        <div style={notification.isError ? errorStyle : successStyle}>
            {notification.message}
        </div>
    )
}

export default Notification