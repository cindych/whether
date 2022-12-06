import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Home = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div>
            <h1>Spotify Weather Playlist ♫</h1>
            <p className="text-center">generate a cool playlist</p>

            <div className="mt-5 p-3 shadow rounded">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>location</Form.Label>
                        <Form.Control type="email" placeholder="" />
                        <Form.Text className="text-muted">
                        possible locations: 
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>weather</Form.Label>
                        <Form.Control type="password" placeholder="" />
                        <Form.Text className="text-muted">
                        sunny, rainy, or snowy
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        generate
                    </Button>
                </Form>
            </div>
            </div>
        </div>
    )
}

export default Home