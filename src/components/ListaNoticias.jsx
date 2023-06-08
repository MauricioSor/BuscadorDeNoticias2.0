import React from 'react';
import Noticias from './Noticias'
const ListaNoticas = ({noticia}) => {
    return (
        <div className='border mx-3'>
        <Noticias noticia={noticia}></Noticias>
        </div>
    );
};

export default ListaNoticas;