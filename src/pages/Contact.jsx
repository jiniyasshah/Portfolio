import React, { Suspense, useState } from 'react'
import emailjs from '@emailjs/browser'
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Fox from '../models/Fox';
import Loader from "../components/Loader";
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';
const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [isLoading, setIsLoading] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState('idle')
    const formRef = useRef(null);
    const { alert, showAlert, hideAlert } = useAlert();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleFocus = () => {
        setCurrentAnimation('walk')

    }


    const handleBlur = () => {
        setCurrentAnimation('idle')
    }

    const handleSubmit = (e) => {
        setCurrentAnimation('hit')

        e.preventDefault();
        setIsLoading(true);
        emailjs.send(
            import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
            {
                from_name: form.name,
                to_name: "Jiniyas",
                from_email: form.email,
                to_email: "jiniyasshahts@gmail.com",
                message: form.message


            },
            import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
        ).then(() => {

            showAlert({ text: 'Message sent successfully!', type: "success" })
            setTimeout(() => {
                hideAlert();
                setCurrentAnimation('idle')
                setForm({ name: '', email: '', message: '' })
            }, [3000])


            setIsLoading(false)

            //TODO: show success message
        }).catch((error) => {
            showAlert({ text: "I didn't receive your message", type: 'danger' })
            setCurrentAnimation('idle')
            setIsLoading(false)
            console.log(error)
        })


    }
    return (
        <section className='relative flex lg:flex-row flex-col max-container'>
            {alert.show && <Alert {...alert} />}
            <div className="flex-1 min-w-[50%] flex flex-col">

                <h1 className='head-text'>Get in Touch</h1>
                <form className="w-full flex flex-col gap-7 mt-14" onSubmit={handleSubmit} ref={formRef}>

                    <label className="text-black-500 font-semibold">Name
                        <input
                            type='text'
                            name='name'
                            className='input'
                            placeholder='John'
                            required
                            value={form.name}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />


                    </label>
                    <label className="text-black-500 font-semibold">Email
                        <input
                            type='email'
                            name='email'
                            className='input'
                            placeholder='john@example.com'
                            required
                            value={form.email}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />


                    </label>
                    <label className="text-black-500 font-semibold">Your Message
                        <textarea

                            name='message'
                            rows={4}
                            className='input'
                            placeholder='Let me know how can I help you!'
                            required
                            value={form.message}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />


                    </label>
                    <button type='submit' className='btn' onFocus={handleFocus} onBlur={handleBlur}>{isLoading ? "Sending..." : "Send Message"}</button>
                </form>
            </div>
            <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">

                <Canvas camera={{
                    position: [0, 0, 5],
                    fov: 75,
                    near: 0.1,
                    far: 1000
                }}>
                    <directionalLight intensity={2.5} position={[0, 0, 1]} />
                    <ambientLight intensity={0.5} />
                    <Suspense fallback={<Loader />}>
                        <Fox
                            position={[0.5, 0.35, 0]}
                            rotation={[12.6, -0.6, 0]}
                            scale={[0.5, 0.5, 0.5]}
                            currentAnimation={currentAnimation} />

                    </Suspense>

                </Canvas>
            </div>



        </section>
    )
}

export default Contact
