'use client'

import emailjs from 'emailjs-com'
import { useCallback, useRef, useState } from 'react'
import {
  FaBandcamp,
  FaFacebook,
  FaInstagram,
  FaSoundcloud,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="flex flex-col gap-6 pb-[80px]">
      <ContactForm />
      <Socials />
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
      console.log('Data to send: ', data)
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_SERVICE_ID!,
          process.env.NEXT_PUBLIC_TEMPLATE_ID!,
          form.current!,
          process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        )
        .then(
          () => {
            alert('Message Sent, I will get back to you shortly :)!')
          },
          (error) => {
            alert('An error occurred, Please try again!')
            console.log(error)
          },
        )
    },
    [data],
  )

  const inputClasses =
    'border focus:outline-none focus:ring-1 rounded-md placeholder:text-sm text-sm ' +
    'border-neutral-300 focus:ring-blue-600 shadow-sm ' +
    'dark:border-neutral-600 dark:focus:ring-orange-600 dark:shadow-md p-4'
  const buttonClasses =
    'px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ' +
    'border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100 active:bg-neutral-200 ' +
    'dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:active:bg-neutral-600 ' +
    'focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-orange-600 shadow-sm dark:shadow-md'

  return (
    <div className="mx-10 flex flex-col items-center">
      <form
        className="grid min-w-[380px] max-w-[480px] grid-cols-1 gap-y-4"
        method="POST"
        ref={form}
        onSubmit={handleSendMessage}
      >
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
        <input
          autoComplete="subject"
          className={inputClasses}
          name="subject"
          placeholder="Subject"
          required
          type="subject"
          onChange={onChange}
        />
        <textarea
          className={inputClasses}
          maxLength={250}
          name="message"
          placeholder="Message"
          required
          rows={6}
          onChange={onChange}
        />
        <button
          aria-label="Submit contact form"
          className={buttonClasses}
          type="submit"
        >
          Wa Let&apos;s Go!
        </button>
      </form>
    </div>
  )
}

const Socials = () => {
  return (
    <div className="m-4 flex justify-center space-x-4">
      {socialLinks.map(({ label, Icon, href }) => (
        <a
          aria-label={label}
          className="-m-1.5 rounded-md p-1.5 transition-all duration-300 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500  sm:-m-3 sm:p-3"
          href={href}
          key={label}
        >
          <Icon className="h-5 w-5 align-baseline sm:h-6 sm:w-6" />
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
    label: 'Facebool',
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
