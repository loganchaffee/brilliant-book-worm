import React, {useState, useEffect, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Form, Card, Modal, Spinner} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import { signout, deleteUser, updateUser, follow } from '../../../actions/auth'
import { getCurrentVisitedUser,  } from '../../../actions/currentVisitedUser';
import { fetchVisitedUserBooks } from '../../../actions/currentVisitedUserBooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faMinus, faPlus, faEllipsisH, faUser } from '@fortawesome/free-solid-svg-icons'
import Alert from '../../common/Alert/Alert'
import './UserDetails.css'

const UserDetails = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({ name: '', email: '', private: false, bio: ''})
    const [initialFormData, setInitialFormData] = useState({ name: '', email: '', private: false, bio: ''})
    const [alert, setAlert] = useState({ variant: 'success', content: '' })
    const [showSpinner, setShowSpinner] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showProfileDropDown, setShowProfileDropDown] = useState(false)

    const [cropper, setCropper] = useState(null)
    const [image, setImage] =  useState('')

    useEffect(() => {
        if (user._id) {
            setFormData({ ...formData, name: user.name, email: user.email, bio: user.bio, private: user.private })
            setInitialFormData({ ...formData, name: user.name, email: user.email, bio: user.bio, private: user.private })
        }
    }, [])

    // CropperJS Functions----------------------------------------------------------------------
    const handleUpdateProfileImage = (e) => {
        const reader = new FileReader()
        reader.addEventListener('load', () =>  {
            setImage(reader.result)
            setShowModal(true)
            document.getElementById('fileInput').value = null
        })
        reader.readAsDataURL(e.target.files[0])
    }

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        const modalImage = document.getElementById('modalImage')
        const cropper = new Cropper(modalImage, {
            aspectRatio: 16 / 16,
        })
        setCropper(cropper)
    }, [showModal === true])

    const handleCropAndUpdate = () => {
        const croppedImageData = cropper.getCroppedCanvas().toDataURL('image/png')
        
        setAlert({ variant: 'success', content: '' })
        setShowSpinner(true)

        dispatch(updateUser({ profileImage: croppedImageData }, setAlert, setShowSpinner))

        cropper.destroy()
        setCropper(null)
        setImage('')
        setShowModal(false)
    }

    const handleProfileImageClick = () => {
        document.getElementById('fileInput').click()
    }
    
    const handleUpdateUserCred = () => {
        let content = 'Please fill in:'
        if (!formData.name) content = content + ' -Display Name'
        if (!formData.email) content = content + ' -Email'
        if (!formData.name || !formData.email) return setAlert({ variant: 'warning', content })

        setAlert({ variant: 'success', content: '' })
        setShowSpinner(true)
        dispatch(updateUser({ ...formData }, setAlert, setShowSpinner))
        setInitialFormData({ ...formData })
    }

    const handleSignout = () => {
        dispatch(signout())
        navigate('/')
    }

    const handleDeleteUser = () => {
        dispatch(deleteUser(navigate))
    }

    const toggleProfileDropdown = () => setShowProfileDropDown(!showProfileDropDown)

    useEffect(() => {
        if (initialFormData.private === formData.private) {
            document.getElementsByClassName('UserDetails__private-warning')[0].style.height = '0'
        }
        if (initialFormData.private !== formData.private && formData.private) {
            document.getElementsByClassName('UserDetails__private-warning')[0].style.height = '30px'
        }
        if (initialFormData.private !== formData.private && !formData.private) {
            document.getElementsByClassName('UserDetails__private-warning')[0].style.height = '0'
        }
    }, [formData.private, initialFormData.private])

    return <>
        <div className='UserDetails'>
            <div className="UserDetails__credentials">
                <div onClick={handleProfileImageClick} className='profile-image-container'>
                    {
                        user.profileImage
                        ?
                        <img className='profile-image' src={user.profileImage} />
                        :
                        <FontAwesomeIcon icon={faUser} />
                    }
                </div>
                <div className='profile-name-container'>
                    <p className="profile-name">{user.name}</p>
                    { <span className={`profile-level-${user.level}`}>Level {user.level}</span> }
                </div>
                <div className='profile-more-btn'>
                    <FontAwesomeIcon icon={faEllipsisH} onClick={toggleProfileDropdown}/>
                </div>
                {
                    showProfileDropDown
                    &&
                    <div className='profile-dropdown box-shadow'>
                        <Button variant="secondary" className='full-width-btn' onClick={handleSignout}>Sign Out</Button>
                        <Button variant="danger" className='full-width-btn' onClick={() => setShowDeleteModal(true)}>Delete Account</Button>
                    </div>
                }
            </div>
        
            <Form className="UserDetails__form main-form">
                <div className='UserDetails__private-warning'>* Note: you will block all followers if you are private</div>
                <Form.Group className="mb-3 d-flex align-items-center justify-content-start">
                    <Form.Label>Profile Visibility</Form.Label>
                    <div className='d-flex mr-10' >
                        <span className='private-radio-label'>Public</span>
                        <Form.Check type="radio" checked={!formData.private} onChange={() => setFormData({...formData, private: false})}/>
                    </div>
                    <div className='d-flex'>
                        <span className='private-radio-label'>Private</span>
                        <Form.Check type="radio" checked={formData.private} onChange={() => setFormData({...formData, private: true})}/>
                    </div>
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center justify-content-start">
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control type="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center justify-content-start">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value.toLowerCase()})} />
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center justify-content-start  flex-wrap">
                    <Form.Label className='bio-label'>Bio</Form.Label>
                    <Form.Control value={formData.bio} as="textarea" placeholder="Say something about yourself..." onChange={(e) => setFormData({...formData, bio: e.target.value })}/>
                </Form.Group>
            </Form>
            
            {
                initialFormData.name !== formData.name 
                || initialFormData.email !== formData.email
                || initialFormData.bio !== formData.bio
                || initialFormData.private !== formData.private
                ?
                <div className='d-flex justify-content-end'>
                    <Button variant="primary" className='UserDetails__credentials__update-btn' onClick={handleUpdateUserCred}>Update Profile</Button>
                </div>
                :
                undefined
            }

            {
                showSpinner
                &&
                <div className='d-flex justify-content-center'>
                    <Spinner animation="border" variant="primary" />
                </div>
            }
            <Alert variant={alert.variant} content={alert.content} onClose={() => setAlert({ ...alert, content: '' })} />
        </div>

        {/* Invisible input clicked when profile image is clicked */}
        <Form.Control id="fileInput" style={{ display: 'none' }} type="file" onChange={(e) => handleUpdateProfileImage(e)} />

        <Modal centered show={showModal} onHide={() => setShowModal(false)} >
            <Modal.Header closeButton>
                <Modal.Title>Adjust Profile Image</Modal.Title>
            </Modal.Header>
            <div>
                <img id='modalImage' src={image} />
            </div>
            <Modal.Footer>
                <Button variant="primary" onClick={handleCropAndUpdate}>Save Changes</Button>
            </Modal.Footer>
        </Modal>

        <Modal size='sm' centered show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <div>
                    <Modal.Title>Delete Account?</Modal.Title>
                    <p>All your data will be lost</p>
                </div>
            </Modal.Header>
            <Modal.Footer>
                <div className='d-flex justify-content-between' style={{ width: '100%' }}>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteUser}>Delete</Button>
                </div>
            </Modal.Footer>
        </Modal>
    </>
}

export default UserDetails