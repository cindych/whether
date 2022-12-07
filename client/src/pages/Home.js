import React from 'react';
import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { getSongsForWeather } from '../fetcher';

function Home() {

    const [songs, setSongs] = useState([]);

    const [city, setCity] = useState(''),
        onInput = ({ target: { value } }) => setCity(value),
        onFormSubmit = e => {
            e.preventDefault();
            console.log(city);
            // TODO: update list on displayed songs -> move to another page?
            setSongs(getSongsForWeather(city));
            let test = Promise.resolve(getSongsForWeather(city));
            test.then((value) =>
                console.log(value));
            setCity('');
        }


    return <div className="d-flex justify-content-center align-items-center">
        <div>
            <h1>Spotify Weather Playlist ♫</h1>
            <p className="text-center">generate a cool playlist</p>
            <div className="mt-5 p-3 ashadow rounded">
                <Form onSubmit={onFormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>location</Form.Label>
                        <Form.Control onChange={onInput} placeholder="" type="text" value={city} />
                        <Form.Text className="text-muted">
                            possible locations:
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>weather</Form.Label>
                        <Form.Control type="text" placeholder="" />
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
}

export default Home