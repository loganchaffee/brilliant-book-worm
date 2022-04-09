import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// Bootstrap
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Post from '../Post/Post'
import Card from 'react-bootstrap/esm/Card'
import Form from 'react-bootstrap/esm/Form'
import Button from 'react-bootstrap/esm/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

const ViewPost = () => {
    const user = useSelector((state) => state.auth)
    const currentPost = useSelector((state) => state.currentPost)

    return (
       <Container>
            <Row>
                <Col xs={12}>
                    <Link to="/feed" className='back-arrow'>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                </Col>
            </Row>
           <Row>
               <Col>
                    <Post post={currentPost} />
               </Col>
           </Row>
            
           <Row>
                <Col>
                    <Card style={{margin: '0 0 10px 20px'}}>
                        <Card.Body >
                            <div className='d-flex mb-2'  style={{borderBottom: '1px solid #ccc'}}>
                                <p style={{marginRight: '5px'}} >{user.name}</p>
                                <p className={`Post__level-${user.level}`}>Level {user.level}</p>
                            </div>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Your Review</Form.Label>
                                    <Form.Control as="textarea" />
                                </Form.Group>
                                <Form.Group>
                                    <Button>Comment</Button>
                                </Form.Group>
                            </Form>
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card style={{margin: '0 0 10px 20px'}}>
                        <Card.Body >
                            <div className='d-flex mb-2'  style={{borderBottom: '1px solid #ccc'}}>
                                <p style={{marginRight: '5px'}} >Mr. Commenter </p>
                                <p className={`Post__level-3`}>Level 3</p>
                            </div>
                            <div className='d-flex'>
                                <p>That is a great book. You are in for a treat! 😁</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card style={{margin: '0 0 10px 20px'}}>
                        <Card.Body >
                            <div className='d-flex mb-2' style={{borderBottom: '1px solid #ccc'}}>
                                <p style={{marginRight: '5px'}}>Mr. Mean Guy </p>
                                <p className={`Post__level-4`}>Level 4</p>
                            </div>
                            <div>
                                <p>Reading is gay! 🤣</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card style={{margin: '0 0 10px 20px'}}>
                        <Card.Body >
                            <div className='d-flex mb-2'  style={{borderBottom: '1px solid #ccc'}}>
                                <p style={{marginRight: '5px'}}>Nice Guy </p>
                                <p className={`Post__level-2`}>Level 2</p>
                            </div>
                            <div className='d-flex'>
                                <p>Dont be a jerk 😔</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
       </Container>
    )
}

export default ViewPost