import './App.css'
import { useState } from "react"

export default function App({ socket }) {

  const [author, setAuthor] = useState(null)
  const [messages, setMessages] = useState([])

  const handleConnexion = e => {
    e.preventDefault()

    socket.on("new_msg", (newMessage) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        newMessage
      ])
    })

    const author = e.target.querySelector("#author").value
    setAuthor(author)
  }

  const handleSend = e => {
    e.preventDefault()

    const msg = {
      content: e.target.querySelector("#message").value,
      date: Date.now(),
      author: author
    }

    socket.emit("send_msg", msg)
  }

  const msgElements = []

  const myStyle1 = {
    textAlign: "right",
    marginLeft: 150
  }

  messages.map((message, i) => {
    msgElements.push(
      author == message.author ?
        <div key={i} style={myStyle1} >
          <h2>{message.author}</h2>
          <p>{message.content}</p>
          <p><strong>{new Date(message.date).getHours()}h{new Date(message.date).getMinutes()}</strong></p>
        </div>
      :
        <div key={i} >
          <h2>{message.author}</h2>
          <p>{message.content}</p>
          <p><strong>{new Date(message.date).getHours()}h{new Date(message.date).getMinutes()}</strong></p>
        </div>
    )
  })

  return (
    <div className='app'>
      <h1>Client Chat</h1>
      <div className="container">
        
        <div>
          {msgElements}
        </div>
      </div>
      <form onSubmit={handleConnexion} hidden={author != null} >
        <input type="text" id="author" />
        <button >Se connecter</button>
      </form>
      <form hidden={author == null} onSubmit={handleSend} >
        <input type="text" id="message" />
        <button>Envoyer</button>
      </form>
    </div>

  )
}