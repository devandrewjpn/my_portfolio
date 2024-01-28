import React, { useState } from 'react'
import './contact.css'
import { MdOutlineEmail } from 'react-icons/md'
import { BsWhatsapp } from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion'
import { showFromTopVariants } from '../motion/variants'
import { useForm } from 'react-hook-form'

const Contact = () => {
  const { register, handleSubmit } = useForm()
  const [sendinBtn,setSendinBtn] = useState('Send Message!')
  const [disabledBtn,setDisabledBtn] = useState(false)

  const onSubmit = async (data) => {
    setSendinBtn('Sending..')
    setDisabledBtn(true)

    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", `Bearer ${process.env.API_EMAIL_TOKEN}`)

    console.log(process.env.API_EMAIL_TOKEN,process.env.API_EMAIL_URL);

    const response = await fetch(process.env.API_EMAIL_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "destinatario": "yuutoandrew.jpn@gmail.com",
        "assunto": "Formulário do portfólio",
        "titulo": "Dados preenchidos:",
        "campos": [
          {
            "key": "Nome",
            "value": data.name
          },
          {
            "key": "Email",
            "value": data.email
          },
          {
            "key": "Mensagem",
            "value": data.mensagem
          },
        ]
      })
    })

    const statusCode = response.status;

    if(statusCode === 201) {
      toast.success("Email received, thank you!")
    } else {
      toast.error("Something went wrong..")
    }

    setSendinBtn('Send Message!')
    setDisabledBtn(false)
  }


  return (
    <>
      <ToastContainer />
      <section id='contact'>
        <motion.h5 variants={showFromTopVariants(200)} initial="hidden" whileInView="visible" viewport={{ once: true }}>Get in Touch</motion.h5>
        <motion.h2 variants={showFromTopVariants(200, 0.3)} initial="hidden" whileInView="visible" viewport={{ once: true }}>Contact Me</motion.h2>

        <div className="container contact__container">
          <div className="contact__options">
            <motion.div variants={showFromTopVariants(200, 0.4)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <article className='contact__option'>
                <MdOutlineEmail className='contact__option-icon' />
                <h4>Email</h4>
                <h5>yuutoandrew.jpn@gmail.com</h5>
                <a href="mailto:yuutoandrew.jpn@gmail.com" target='_blank' rel='noreferrer'>Send a Message</a>
              </article>
            </motion.div>
            <motion.div variants={showFromTopVariants(200, 0.5)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <article className='contact__option'>
                <BsWhatsapp className='contact__option-icon' />
                <h4>WhatsApp</h4>
                <h5>+55 31 9 9976 8768</h5>
                <a href="https://api.whatsapp.com/send/?phone=5531999768768" target='_blank' rel='noreferrer'>Send a Message</a>
              </article>
            </motion.div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <motion.div variants={showFromTopVariants(200, 0.6)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <input type="text" {...register('name')} placeholder='Your Full name' required />
            </motion.div>
            <motion.div variants={showFromTopVariants(200, 0.7)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <input type="email" {...register('email')} placeholder='Your Email' required />
            </motion.div>
            <motion.div variants={showFromTopVariants(200, 0.8)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <textarea {...register('mensagem')} rows="6" placeholder='Your Message' required></textarea>
            </motion.div>
            <motion.button variants={showFromTopVariants(200, 1)} initial="hidden" whileInView="visible" viewport={{ once: true }} type='submit' disabled={disabledBtn} className='btn btn-primary'>
              {sendinBtn}
            </motion.button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact