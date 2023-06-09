import React, { useState, useEffect } from 'react';
import ListaNoticias from './ListaNoticias';
import Form from 'react-bootstrap/Form';
import { Button, Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import '../App.css'
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
            if ((categoria && categoria !== 'general') || (pais && pais !== 'us')) {
            
                url = `https://newsdata.io/api/1/news?apikey=pub_24074bc4b36bc5fc96f3342bf4006ed1ffc3c&category=${categoria}&country=${pais}`;            
            
            }
            else{
                url = 'https://newsdata.io/api/1/news?apikey=pub_24074bc4b36bc5fc96f3342bf4006ed1ffc3c&country=us';
            }
            const consulta = await fetch(url);
            const dato = await consulta.json();
            const datoArray = Object.values(dato);
            setNoticia(datoArray);
        } catch (error) {
            throw new Error(error);
        }

    }
    useEffect(() => {
        consultaDeAPI();
    }, []);
    return (
        <div className='container border my-3'>
            <Container fluid className=' my-3'>
                <h3 id='tituloBusqueda' className='align-self-center text-center'>Refinar Busqueda</h3>
                <div>
                    <Form onSubmit={tomaDeDatos} className='d-flex'>
                        <Form.Select aria-label="Select de categoria" className='my-2 mx-2'>
                            <option value='general'>Ingrese Categoria...</option>
                            <option value="health">Salud</option>
                            <option value="business">Negocios</option>
                            <option value="science">Ciencia</option>
                            <option value="sports">Deporte</option>
                            <option value="technology">Tecnolgia</option>
                        </Form.Select>
                        <Form.Select aria-label="Select de pais" className='my-2 mx-2'>
                            <option value='us'>Ingrese Pais...</option>
                            <option value="ar">Argentina</option>
                            <option value="cn">China</option>
                            <option value="us">Estados Unidos</option>
                            <option value="mx">Mexico</option>
                        </Form.Select>
                        <Button variant='primary' type='submit'>Buscar</Button>
                    </Form>
                </div>
            </Container>
            <ListaNoticias noticia={noticia}></ListaNoticias>
        </div>
    );
};

export default Formulario;