'use client'

import { useState, useEffect, useRef } from 'react'
import { pusherClient } from '@/lib/pusher'

type Message = {
  id: string
  contenu: string
  isAdmin: boolean
  lu: boolean
  createdAt: string
}

type Conversation = {
  id: string
  nom: string
  prenom: string
  email: string | null
  telephone: string | null
  messages: Message[]
  _count: { messages: number }
}

export default function AdminMessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [contenu, setContenu] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const fetchConversations = async () => {
    const res = await fetch('/api/admin/messages')
    const data = await res.json()
    setConversations(data)
    setLoading(false)
  }

  const fetchMessages = async (userId: string) => {
    const res = await fetch(`/api/admin/messages/${userId}`)
    const data = await res.json()
    setMessages(data)
    // Mettre à jour le count non lu
    setConversations((prev) =>
      prev.map((c) => c.id === userId ? { ...c, _count: { messages: 0 } } : c)
    )
  }

  useEffect(() => { fetchConversations() }, [])

  // Pusher — écouter les nouvelles conversations
  useEffect(() => {
    const channel = pusherClient.subscribe('admin-notifications')
    channel.bind('nouveau-message', ({ userId }: { userId: string }) => {
      fetchConversations()
      if (selectedUserId === userId) {
        fetchMessages(userId)
      }
    })

    return () => {
      pusherClient.unsubscribe('admin-notifications')
    }
  }, [selectedUserId])

  // Pusher — écouter les messages du client sélectionné
  useEffect(() => {
    if (!selectedUserId) return

    const channel = pusherClient.subscribe(`chat-${selectedUserId}`)
    channel.bind('nouveau-message', (message: Message) => {
      if (!message.isAdmin) {
        setMessages((prev) => {
          const exists = prev.find((m) => m.id === message.id)
          if (exists) return prev
          return [...prev, message]
        })
      }
    })

    return () => {
      pusherClient.unsubscribe(`chat-${selectedUserId}`)
    }
  }, [selectedUserId])

  // Scroll automatique
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSelectConversation = (userId: string) => {
    setSelectedUserId(userId)
    fetchMessages(userId)
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contenu.trim() || !selectedUserId) return

    setSending(true)
    try {
      const res = await fetch(`/api/admin/messages/${selectedUserId}`, {
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

  const selectedConversation = conversations.find((c) => c.id === selectedUserId)

  if (loading) return <div className="text-center text-gray-500 py-12">Chargement...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">💬 Messages</h1>

      <div className="flex gap-4 h-[600px]">

        {/* Liste des conversations */}
        <div className="w-72 bg-white rounded-2xl shadow-sm overflow-y-auto shrink-0">
          <div className="p-4 border-b">
            <p className="font-semibold text-gray-700 text-sm">
              Conversations ({conversations.length})
            </p>
          </div>

          {conversations.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p className="text-3xl mb-2">💬</p>
              <p className="text-sm">Aucune conversation</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleSelectConversation(conv.id)}
                className={`w-full p-4 text-left hover:bg-gray-50 transition border-b flex items-center gap-3 ${
                  selectedUserId === conv.id ? 'bg-purple-50 border-l-4 border-l-purple-600' : ''
                }`}
              >
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-purple-600 font-bold text-sm">
                    {conv.prenom[0]}{conv.nom[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-sm">
                    {conv.prenom} {conv.nom}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {conv.messages[0]?.contenu || 'Aucun message'}
                  </p>
                </div>
                {conv._count.messages > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                    {conv._count.messages}
                  </span>
                )}
              </button>
            ))
          )}
        </div>

        {/* Zone de chat */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col">
          {!selectedUserId ? (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <p className="text-5xl mb-3">💬</p>
                <p>Sélectionnez une conversation</p>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-4 border-b flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">
                    {selectedConversation?.prenom[0]}{selectedConversation?.nom[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {selectedConversation?.prenom} {selectedConversation?.nom}
                  </p>
                  <p className="text-xs text-gray-400">
                    {selectedConversation?.email || selectedConversation?.telephone}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isAdmin ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm ${
                      msg.isAdmin
                        ? 'bg-purple-600 text-white rounded-tr-sm'
                        : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                    }`}>
                      {!msg.isAdmin && (
                        <p className="text-xs font-semibold text-blue-600 mb-1">
                          👤 {selectedConversation?.prenom}
                        </p>
                      )}
                      <p>{msg.contenu}</p>
                      <p className={`text-xs mt-1 ${msg.isAdmin ? 'text-purple-200' : 'text-gray-400'}`}>
                        {new Date(msg.createdAt).toLocaleTimeString('fr-FR', {
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="border-t p-4">
                <form onSubmit={handleSend} className="flex gap-2">
                  <input
                    type="text"
                    value={contenu}
                    onChange={(e) => setContenu(e.target.value)}
                    placeholder="Répondre au client..."
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="submit"
                    disabled={sending || !contenu.trim()}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition disabled:opacity-50"
                  >
                    {sending ? '...' : '➤'}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}