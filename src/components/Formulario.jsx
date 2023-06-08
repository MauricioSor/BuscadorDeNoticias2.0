import React, { useState, useEffect } from 'react';
import ListaNoticias from './ListaNoticias';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

const Formulario = () => {
    const [noticia, setNoticia] = useState([]);
    const tomaDeDatos = (e) => {
        e.preventDefault();
        const categoria = e.target.elements[0].value;
        const pais = e.target.elements[1].value;
        consultaDeAPI(categoria,pais);
    }
    const consultaDeAPI = async (categoria, pais) => {
        try {
            let url = '';
            if (categoria && categoria !== 'Todas') {
                if (pais && pais !== 'Todas') {
                    url = `https://newsapi.org/v2/top-headlines?category=${categoria}&country=${pais}&apiKey=1b0e0dea605e49b2a2093ff503a3c236`;
                } else {
                    url = `https://newsapi.org/v2/top-headlines?category=${categoria}&apiKey=1b0e0dea605e49b2a2093ff503a3c236`;
                }
            }else{
                url = 'https://newsapi.org/v2/top-headlines?q=travel&apiKey=1b0e0dea605e49b2a2093ff503a3c236';
            }
            const consulta = await fetch(url);
            const dato = await consulta.json();
            console.log('soy el dato', dato);
            const datoArray = Object.values(dato);
            setNoticia(datoArray);
        } catch (error) {
            throw new Error(error);
        }

    }
    useEffect(() => {
        console.log('soy useEfect');
        consultaDeAPI();
    }, []);
    return (
        <div className='container border my-3'>
            <div className='container  d-flex justify-content-center my-3'>
                <h3>Refinar busqueda</h3>
                <div>
                    <Form onSubmit={tomaDeDatos}>
                        <Form.Select aria-label="Default select example">
                            <option>Todas</option>
                            <option value="health">Salud</option>
                            <option value="business">Negocios</option>
                            <option value="science">Ciencia</option>
                            <option value="sports">Deporte</option>
                            <option value="technology">Tecnolgia</option>
                        </Form.Select>
                        <Form.Select aria-label="Default select example">
                            <option value='us'>Todas</option>
                            <option value="ar">Argentina</option>
                            <option value="ch">China</option>
                            <option value="us">Estados Unidos</option>
                            <option value="mx">Mexico</option>
                        </Form.Select>
                        <Button variant='primary' type='submit'>Buscar</Button>
                    </Form>
                </div>
            </div>
            <ListaNoticias noticia={noticia}></ListaNoticias>
        </div>
    );
};

export default Formulario;