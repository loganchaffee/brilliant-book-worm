import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Alert from '../common/Alert/Alert'
import './RequestPasswordReset.css'
import { requestResetEmail } from '../../api/index'
import BackButton from '../common/BackButton/BackButton'

const RequestPasswordReset = () => {
    const [email, setEmail] = useState('')
    const [alert, setAlert] = useState({ variant: '', content: ''})

    const handleSubmit = async () => {
        try {
            const { data } = await requestResetEmail({ email })
            let content = "Email sent! If you don't see it in your inbox, check your spam folder"
            setAlert({ variant: 'success', content })
        } catch (error) {
            setAlert({ variant: 'danger', content: 'No account with that email address' })
        }
    }

    return <div className='RequestPasswordReset animate-up-and-in'>
        <BackButton content='Back to Login' overrideURL='/' />
        <h3 className='Auth__title'>Request Password Reset Link</h3>
        <Form className='main-form'>
            <Form.Group className="mb-10">
                <Form.Control type="email" placeholder="Account Email" value={email} onChange={(e) => setEmail(e.target.value.toLowerCase())}/>
            </Form.Group>
            <div className='d-flex'>
                <Button style={{marginLeft: 'auto'}} onClick={handleSubmit}>Send Reset Link</Button>       
            </div>
        </Form>

        <Alert variant={alert.variant} content={alert.content} onClose={() => setAlert({ variant: '', content: ''})} />
    </div>
}

export default RequestPasswordReset