import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Alert from '../common/Alert/Alert'
import './ResetPassword.css'
import { requestResetEmail } from '../../api/index'
import { useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../../api/index'


const ResetPassword = () => {
    const params = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' })
    const [alert, setAlert] = useState({ variant: '', content: ''})
    const [resetIsComplete, setResetItComplete] = useState(false)

    const handleSubmit = async () => {
        if (!formData.email, !formData.password, !formData.confirmPassword) return setAlert({ variant: 'warning', content: 'Please fill in all fields' })
        if (formData.password !== formData.confirmPassword) return setAlert({ variant: 'warning', content: 'Passwords must match' })

        try {
            const { data } = await resetPassword({ ...formData, token: params.token })
            setAlert({ variant: 'success', content: 'Password has been saved' })
            setResetItComplete(true)
        } catch (error) {
            setAlert({ variant: 'danger', content: error.response.data})
        }
    }

    const navigateToSignIn = () => navigate('/')

    return <div className='RequestPasswordReset'>
        <h3 className='Auth__title'>Create New Password</h3>

        <Form className='main-form'>
            <Form.Group className="mb-10">
                <Form.Control className='mb-10' type="email" placeholder="Account Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase() })}/>
                <Form.Control className='mb-10' type="password" placeholder="New Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
                <Form.Control className='mb-10' type="password" placeholder="Confirm New Password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}/>
            </Form.Group>
            <div className='d-flex'>
                <Button 
                    style={{marginLeft: 'auto'}} 
                    onClick={resetIsComplete ? navigateToSignIn : handleSubmit}
                >
                    {resetIsComplete ? 'Sign In' : 'Reset Password'}
                </Button>       
            </div>
        </Form>

        <Alert variant={alert.variant} content={alert.content} onClose={() => setAlert({ variant: '', content: ''})} />
    </div>
}

export default ResetPassword