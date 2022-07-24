import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './LandingPage.css'
import './ScrollingBooks/ScrollingBooks.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import trackImg from '../../images/track.png'
import levelUpImg from '../../images/level-up.png'
import shareImg from '../../images/share.png'
import ScrollingBooks from './ScrollingBooks/ScrollingBooks'
import Auth from '../../Auth/Auth'
import logo from '../../images/logo.png'


const LandingPage = () => {
    const books = [{
        "_id": "62d60fdd1e24dae70386f9ca",
        "thumbnail": "http://books.google.com/books/content?id=B6kl7WGhRKkC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    {
        "_id": "62d6113d1e24dae70386f9d0",
        "thumbnail": "http://books.google.com/books/content?id=CgeHW-geducC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d611501e24dae70386f9d6",
        "thumbnail": "http://books.google.com/books/content?id=zSknpwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    {
        "_id": "62d611921e24dae70386f9dc",
        "thumbnail": "http://books.google.com/books/content?id=17owDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d611a31e24dae70386f9e2",
        "thumbnail": "http://books.google.com/books/content?id=UzsMAAAAIAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d611b21e24dae70386f9e8",
        "thumbnail": "http://books.google.com/books/content?id=pgPWOaOctq8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d611ca1e24dae70386f9ee",
        "thumbnail": "http://books.google.com/books/content?id=3IAUEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d611e41e24dae70386f9f4",
        "thumbnail": "http://books.google.com/books/content?id=no6iEu4lWEgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d611f71e24dae70386f9fa",
        "thumbnail": "http://books.google.com/books/content?id=UB74EoKvVfsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d612e11e24dae70386fa00",
        "thumbnail": "http://books.google.com/books/content?id=EPftAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    {
        "_id": "62d612f21e24dae70386fa06",
        "thumbnail": "http://books.google.com/books/content?id=mfMJAQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d613091e24dae70386fa0d",
        "thumbnail": "http://books.google.com/books/content?id=p_5l2FCfvF8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d613151e24dae70386fa13",
        "thumbnail": "http://books.google.com/books/content?id=utvB0I_0SZsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d613251e24dae70386fa19",
        "thumbnail": "http://books.google.com/books/content?id=z1k_AxXUvmEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d613401e24dae70386fa1f",
        "thumbnail": "http://books.google.com/books/content?id=nVGKDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d613611e24dae70386fa25",
        "thumbnail": "http://books.google.com/books/content?id=b3ctQ5L7zNoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d6136f1e24dae70386fa2b",
        "thumbnail": "http://books.google.com/books/content?id=T5IhvgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    {
        "_id": "62d6137f1e24dae70386fa31",
        "thumbnail": "http://books.google.com/books/content?id=UU9UAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d613b91e24dae70386fa37",
        "thumbnail": "http://books.google.com/books/content?id=mWHcDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d613c41e24dae70386fa3d",
        "thumbnail": "http://books.google.com/books/content?id=W4r7lF_MSMYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d613db1e24dae70386fa43",
        "thumbnail": "http://books.google.com/books/content?id=CzaeCifjTf4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d613e71e24dae70386fa49",
        "thumbnail": "http://books.google.com/books/content?id=S_qN7V5CB6QC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d613f21e24dae70386fa4f",
        "thumbnail": "http://books.google.com/books/content?id=dZ1TngEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    {
        "_id": "62d6140e1e24dae70386fa55",
        "thumbnail": "http://books.google.com/books/content?id=HlVoAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d6141d1e24dae70386fa5b",
        "thumbnail": "http://books.google.com/books/content?id=_luMDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d614281e24dae70386fa61",
        "thumbnail": "http://books.google.com/books/content?id=CV2ZQtY3G7kC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d6143b1e24dae70386fa67",
        "thumbnail": "http://books.google.com/books/content?id=dM_-DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d6145a1e24dae70386fa6e",
        "thumbnail": "http://books.google.com/books/content?id=bSW6uk_CzXUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d614631e24dae70386fa73",
        "thumbnail": "http://books.google.com/books/content?id=YpTA74jz018C&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    {
        "_id": "62d614721e24dae70386fa79",
        "thumbnail": "http://books.google.com/books/content?id=B1hSG45JCX4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d614881e24dae70386fa7f",
        "thumbnail": "http://books.google.com/books/content?id=pO6mDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d614911e24dae70386fa85",
        "thumbnail": "http://books.google.com/books/content?id=OPAgEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d614cd1e24dae70386fa8c",
        "thumbnail": "http://books.google.com/books/content?id=jUX8N9kiCiQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d614d81e24dae70386fa92",
        "thumbnail": "http://books.google.com/books/content?id=uv4vqKYsyawC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d615021e24dae70386faa1",
        "thumbnail": "http://books.google.com/books/content?id=l4lxLsH2n3YC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d6153f1e24dae70386faa8",
        "thumbnail": "http://books.google.com/books/content?id=f_0m7WiulUMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    }
    ]
 
    const [showAuth, setShowAuth] = useState(false)
    const [isSignup, setIsSignup] = useState(true)

    const handleShowAuth = () => {
        setShowAuth(true)
        setTimeout(() => {
            document.getElementsByClassName('form-control')[0].focus()
        }, 250)
        if (window.innerWidth < 600) {
            setTimeout(() => {
                document.getElementsByClassName('Auth__title')[0].scrollIntoView({ behavior: "smooth", block: "start", inline: 'nearest' })
            }, 300)
        }
    }

    return <div className='LandingPage'>
        <div className='LandingPage__top-section'>
            <Container>
                <Row className='LandingPage__navbar'>
                    <Col xs={1} className='LandingPage-navbar__left'>
                        <img className='logo' src={logo}/>
                    </Col>
                    <Col className='d-flex justify-content-end align-items-center'>
                        <a href='#about' className='ml-20 LandingPage__navbar-link'>About</a>
                        <span className='ml-20 LandingPage__navbar-link' onClick={() => {
                            setIsSignup(false)
                            handleShowAuth(true)
                        }}>Sign In</span>
                        <span className='ml-20 LandingPage__navbar-link' onClick={() => {
                            setIsSignup(true)
                            handleShowAuth(true)
                        }}>Sign Up</span>
                    </Col>
                </Row>
                
                <Row className='LandingPage__hero-section'>
                    <Col xs={12} md={6} className='LandingPage__hero-section__left animate-up-and-in'>
                        <h1>Up Your <br /><span>Reading Game</span></h1>
                        <h2>Track your reading. Manage your library and book reviews. See what others are reading and share your ideas.</h2>
                        {!showAuth && <Button className='call-to-action-btn' onClick={handleShowAuth}>Sign Up <FontAwesomeIcon icon={faArrowRight} className='ml-10'/></Button>}
                    </Col>
                    <Col xs={12} md={6} style={{ position: 'relative'}} className='animate-up-and-in'>
                        {
                            showAuth
                            ?
                            <Auth isSignup={isSignup} setIsSignup={setIsSignup} />
                            :
                            <ScrollingBooks />
                        }
                    </Col>
                </Row>
                <a name="about"></a>
                <Row >
                    <Col className='LandingPage__video-section'>
                        <h1 className='tac'>Welcome To Brilliant BookWorm</h1>
                        <h2 className='tac'>The all in one book tracking tool</h2>
                        <div className='LandingPage__video'>
                            <iframe  width="560" height="315" src="https://www.youtube.com/embed/r7qCY-_teg8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        <div className='LandingPage__feature-section'>
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <h1>Track Your Reading</h1>
                        <p>Track your reading progress through the intuitive dashboard</p>
                        <p>Easily find your book with the search tool powered by the google books API</p>
                        <p>Get an estimated completion time based on your own reading speed</p>
                    </Col>
                    <Col xs={12} md={6}>
                        <img src={trackImg} />
                    </Col>
                </Row>
            </Container>
        </div>
        <div className='LandingPage__feature-section dark-feature-section'>
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <img src={levelUpImg} className='br-10'/>
                    </Col>
                    <Col xs={12} md={6}>
                        <h1>Level Up</h1>
                        <p>Stay motivated by gamifying your reading</p>
                        <p>Earn points and level up as your read more, meet your deadlines, and increase your reading speed</p>
                        <p>Get some bragging rights as your interact with your friends and followers</p>
                    </Col>
                </Row>
            </Container>
        </div>
        <div className='LandingPage__feature-section'>
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <h1>Share your Ideas</h1>
                        <p>Add followers to and see what others are reading</p>
                        <p>Keep your finished books in your library where other people can read your reviews</p>
                        <p>Interact with other's posts in your news feed and share your thoughts</p>
                    </Col>
                    <Col xs={12} md={6}>
                        <img src={shareImg}/>
                    </Col>
                </Row>
            </Container>
        </div>
        <div className='LandingPage__footer-container'>
            <Container className='LandingPage__footer d-flex justify-content-center align-items-center'>
                <p className='mr-10'>brilliantbookworm©</p>
                <p className='mr-10'>Created by Logan Chaffee</p>
                <a href='https://loganchaffee.com/'><p className='mr-10'>loganchaffee.com</p></a>
            </Container>
        </div>
    </div>
}

export default LandingPage