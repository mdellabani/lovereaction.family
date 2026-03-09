'use client'

import emailjs from 'emailjs-com'
import { Send } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import {
  FaBandcamp,
  FaFacebook,
  FaInstagram,
  FaSoundcloud,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="flex flex-col gap-8 pb-28">
      <ContactForm />
      <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
        <Socials />
        <div className="mt-4 flex flex-col items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
          <p>Love Reaction Family {new Date().getFullYear()}</p>
          <p>
            Crafted by{' '}
            <a
              className="text-purple-500 transition-colors hover:text-purple-400"
              href="https://mdellabani.github.io/portfolio/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Mahieddine Dellabani
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const ContactForm = () => {
  const defaultData = () => ({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [data, setData] = useState<FormData>(defaultData)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const form = useRef(null)

  const onChange = useCallback(
    <T extends HTMLInputElement | HTMLTextAreaElement>(
      event: React.ChangeEvent<T>,
    ): void => {
      const { name, value } = event.target
      const fieldData: Partial<FormData> = { [name]: value }
      setData({ ...data, ...fieldData })
    },
    [data],
  )

  const handleSendMessage = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setSending(true)
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_SERVICE_ID!,
          process.env.NEXT_PUBLIC_TEMPLATE_ID!,
          form.current!,
          process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        )
        .then(
          () => {
            setSending(false)
            setSent(true)
            setData(defaultData())
            setTimeout(() => setSent(false), 4000)
          },
          (error) => {
            setSending(false)
            alert('An error occurred, Please try again!' + error)
          },
        )
    },
    [data],
  )

  const inputClasses =
    'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm ' +
    'placeholder:text-gray-400 ' +
    'focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 ' +
    'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 ' +
    'dark:focus:border-purple-500 dark:focus:ring-purple-500/20 ' +
    'transition-colors'

  return (
    <section className="w-full rounded-2xl bg-gray-50 p-6 dark:bg-gray-900/50">
      <h2 className="mb-2 text-2xl font-bold tracking-tight">Get In Touch</h2>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        Bookings, collabs, or just vibes — drop us a line.
      </p>
      <form
        className="flex flex-col gap-3"
        method="POST"
        ref={form}
        onSubmit={handleSendMessage}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            className={inputClasses}
            name="name"
            placeholder="Name"
            required
            type="text"
            onChange={onChange}
          />
          <input
            autoComplete="email"
            className={inputClasses}
            name="email"
            placeholder="Email"
            required
            type="email"
            onChange={onChange}
          />
        </div>
        <input
          className={inputClasses}
          name="subject"
          placeholder="Subject"
          required
          type="text"
          onChange={onChange}
        />
        <textarea
          className={inputClasses + ' resize-none'}
          maxLength={250}
          name="message"
          placeholder="Message"
          required
          rows={4}
          onChange={onChange}
        />
        <button
          aria-label="Submit contact form"
          className={`flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-red-400 to-green-400 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-purple-400/50 disabled:opacity-50 ${sent ? 'from-green-500 to-green-500' : ''}`}
          disabled={sending}
          type="submit"
        >
          {sent ? (
            'Sent!'
          ) : sending ? (
            'Sending...'
          ) : (
            <>
              Wa Let&apos;s Go! <Send size={14} />
            </>
          )}
        </button>
      </form>
    </section>
  )
}

const Socials = () => {
  return (
    <div className="flex justify-center gap-4">
      {socialLinks.map(({ label, Icon, href }) => (
        <a
          aria-label={label}
          className="rounded-full p-2.5 text-gray-500 transition-all duration-200 hover:bg-purple-100 hover:text-purple-500 dark:text-gray-400 dark:hover:bg-purple-900/30 dark:hover:text-purple-400"
          href={href}
          key={label}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  )
}

export interface Social {
  label: string
  Icon: React.ElementType
  href: string
}

export const socialLinks: Social[] = [
  {
    label: 'Facebook',
    Icon: FaFacebook,
    href: 'https://www.facebook.com/lovereaction.family',
  },
  {
    label: 'Instagram',
    Icon: FaInstagram,
    href: 'https://www.instagram.com/Lovereaction.family/',
  },
  {
    label: 'Soundcloud',
    Icon: FaSoundcloud,
    href: 'https://soundcloud.com/lovereactionfamily',
  },
  {
    label: 'Bandcamp',
    Icon: FaBandcamp,
    href: 'https://lovereaction-family.bandcamp.com/',
  },
]

export default Footer
