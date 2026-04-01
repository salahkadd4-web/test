'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { pusherClient } from '@/lib/pusher'

type Message = {
  id: string
  contenu: string
  isAdmin: boolean
  lu: boolean
  createdAt: string
}

export default function MessagesPage() {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [contenu, setContenu] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const fetchMessages = async () => {
    const res = await fetch('/api/messages')
    const data = await res.json()
    setMessages(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  // Pusher — écouter les nouveaux messages
  useEffect(() => {
    if (!session?.user?.id) return

    const channel = pusherClient.subscribe(`chat-${session.user.id}`)
    channel.bind('nouveau-message', (message: Message) => {
      setMessages((prev) => {
        const exists = prev.find((m) => m.id === message.id)
        if (exists) return prev
        return [...prev, message]
      })
    })

    return () => {
      pusherClient.unsubscribe(`chat-${session.user.id}`)
    }
  }, [session?.user?.id])

  // Scroll automatique
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contenu.trim()) return

    setSending(true)
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contenu }),
      })

      const data = await res.json()
      if (res.ok) {
        setMessages((prev) => {
          const exists = prev.find((m) => m.id === data.id)
          if (exists) return prev
          return [...prev, data]
        })
        setContenu('')
      }
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center text-gray-500">
        Chargement...
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pt-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">💬 Discussion avec le support</h1>

      {/* Zone messages */}
      <div className="bg-white rounded-2xl shadow-sm flex flex-col h-[500px]">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 py-16">
              <p className="text-4xl mb-3">💬</p>
              <p>Aucun message. Écrivez-nous !</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm ${
                  msg.isAdmin
                    ? 'bg-gray-100 text-gray-800 rounded-tl-sm'
                    : 'bg-blue-600 text-white rounded-tr-sm'
                }`}>
                  {msg.isAdmin && (
                    <p className="text-xs font-semibold text-purple-600 mb-1">⚙️ Support</p>
                  )}
                  <p>{msg.contenu}</p>
                  <p className={`text-xs mt-1 ${msg.isAdmin ? 'text-gray-400' : 'text-blue-200'}`}>
                    {new Date(msg.createdAt).toLocaleTimeString('fr-FR', {
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={contenu}
              onChange={(e) => setContenu(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={sending || !contenu.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition disabled:opacity-50"
            >
              {sending ? '...' : '➤'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}