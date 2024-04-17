'use client'

import emailjs from 'emailjs-com';
import { useCallback, useRef, useState } from "react";
import { FaBandcamp, FaFacebook, FaInstagram, FaSoundcloud } from "react-icons/fa";

const Footer = () => {
 return (
    <footer className='flex flex-col gap-6'>
      <ContactForm />
      <Socials />
    </footer>
 );
};

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const defaultData = () => ({
      name: '',
      email: '',
      subject: '',
      message: '',
    });


  const [data, setData] = useState<FormData>(defaultData);
  const form = useRef(null);

  const onChange = useCallback(
    <T extends HTMLInputElement | HTMLTextAreaElement>(event: React.ChangeEvent<T>): void => {
      const {name, value} = event.target;

      const fieldData: Partial<FormData> = {[name]: value};

      setData({...data, ...fieldData});
    },
    [data],
  );

  const handleSendMessage = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      /**
       * This is a good starting point to wire up your form submission logic
       * */
      console.log('Data to send: ', data);
      emailjs.sendForm(process.env.NEXT_PUBLIC_SERVICE_ID!, process.env.NEXT_PUBLIC_TEMPLATE_ID!, form.current!, process.env.NEXT_PUBLIC_PUBLIC_KEY!).then(
        _result => {
          alert('Message Sent, I will get back to you shortly :)!');
        },
        error => {
          alert('An error occurred, Please try again!');
          console.log(error);
        },
      );
    },
    [data],
  );

  const inputClasses =
    'bg-neutral-700 border-0 focus:border-0 focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-md placeholder:text-neutral-400 placeholder:text-sm text-neutral-200 text-sm';

  return (
    <div className='flex flex-col mx-72'>
       <form className="grid min-h-[320px] grid-cols-1 gap-y-4" method="POST" onSubmit={handleSendMessage} ref={form}>
        <input className={inputClasses} name="name" onChange={onChange} placeholder="Name" required type="text" />
        <input
          autoComplete="email"
          className={inputClasses}
          name="email"
          onChange={onChange}
          placeholder="Email"
          required
          type="email"
        />
        <input
          autoComplete="subject"
          className={inputClasses}
          name="subject"
          onChange={onChange}
          placeholder="Subject"
          required
          type="subject"
        />
        <textarea
          className={inputClasses}
          maxLength={250}
          name="message"
          onChange={onChange}
          placeholder="Message"
          required
          rows={6}
        />
        <button
          aria-label="Submit contact form"
          className="w-max rounded-full border-2 border-orange-600 bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-md outline-none hover:bg-stone-800 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-stone-800"
          type="submit">
          Send Message
        </button>
      </form>
    </div>
    
  );
};

const Socials = () => {
  return (
    <div className="flex justify-center space-x-4">
      {socialLinks.map(({label, Icon, href}) => (
        <a
          aria-label={label}
          className="-m-1.5 rounded-md p-1.5 transition-all duration-300 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500  sm:-m-3 sm:p-3"
          href={href}
          key={label}>
          <Icon className="h-5 w-5 align-baseline sm:h-6 sm:w-6"/>
        </a>
      ))}
    </div>
  );
};

export interface Social {
  label: string;
  Icon: React.ElementType
  href: string;
}

export const socialLinks: Social[] = [
  {label: 'Facebool', Icon: FaFacebook, href: 'https://www.facebook.com/lovereaction.family'},
  {label: 'Instagram', Icon: FaInstagram, href: 'https://www.instagram.com/Lovereaction.family/'},
  {label: 'Soundcloud', Icon: FaSoundcloud, href: 'https://soundcloud.com/lovereactionfamily'},
  {label: 'Bandcamp', Icon: FaBandcamp, href: 'https://lovereaction-family.bandcamp.com/'},
];



export default Footer;
