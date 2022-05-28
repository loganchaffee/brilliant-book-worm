import React, {useState, useEffect, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Form, Alert, Card, Modal} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import { signout, deleteUser, updateUser, follow } from '../../../actions/auth'
import { getCurrentVisitedUser,  } from '../../../actions/currentVisitedUser';
import { fetchVisitedUserBooks } from '../../../actions/currentVisitedUserBooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faMinus, faPlus, faEllipsisH, faUser } from '@fortawesome/free-solid-svg-icons'
import './UserDetails.css'

const UserDetails = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({ name: '', email: ''})
    const [initialFormData, setInitialFormData] = useState({ name: '', email: ''})
    const [errorMessage, setErrorMessage] = useState('')

    const [showModal, setShowModal] = useState(false)
    const [showProfileDropDown, setShowProfileDropDown] = useState(false)

    const [cropper, setCropper] = useState(null)
    const [image, setImage] =  useState('')

    useEffect(() => {
        if (user._id) {
            setFormData({ ...formData, name: user.name, email: user.email })
            setInitialFormData({ ...formData, name: user.name, email: user.email })
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
        dispatch(updateUser({ profileImage: croppedImageData }, setErrorMessage))
        cropper.destroy()
        setCropper(null)
        setImage('')
        setShowModal(false)
    }

    const handleProfileImageClick = () => {
        document.getElementById('fileInput').click()
    }
    
    const handleUpdateUserCred = () => {
        // dispatch(updateUser({ ...user, ...formData}, setErrorMessage))
        dispatch(updateUser({ ...formData}, setErrorMessage))
        setInitialFormData({ ...formData})
    }

    const handleSignout = () => {
        dispatch(signout())
        navigate('/')
    }

    const handleDeleteUser = () => {
        dispatch(deleteUser(navigate))
    }

    const toggleProfileDropdown = () => setShowProfileDropDown(!showProfileDropDown)

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
                        <Button variant="danger" className='full-width-btn' onClick={handleDeleteUser}>Delete Account</Button>
                    </div>
                }
            </div>
        
            <Form className="UserDetails__form main-form">
                <Form.Group className="mb-3 d-flex align-items-center justify-content-start">
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control type="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value.toLowerCase()})} />
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center justify-content-start">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value.toLowerCase()})} />
                </Form.Group>
            </Form>
            
            {
                initialFormData.name !== formData.name || initialFormData.email !== formData.email
                ?
                <div className='d-flex justify-content-end'>
                    <Button variant="primary" className='UserDetails__credentials__update-btn' onClick={handleUpdateUserCred}>Update Profile</Button>
                </div>
                :
                undefined
            }

            { errorMessage && <Alert variant="warning">{errorMessage}</Alert> }
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
    </>
}

export default UserDetails