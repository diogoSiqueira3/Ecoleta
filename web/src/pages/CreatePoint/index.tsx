import React, { useEffect, useState, ChangeEvent } from 'react';
import './style.css';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';
import axios from 'axios';

interface Item {
    id: number,
    title: string,
    image_url: string,
}

interface UF {
    id: number,
    sigla: string,
    nome: string,
}

interface City {
    id: number,
    nome: string,
}

const CreatePoint = () => {

    const [items, setItems] = useState<Item[]>([]);

    const [uf, setUF] = useState<UF[]>([]);
    const [selectedUF, setSelectedUF] = useState('0');

    const [city, setCity] = useState<City[]>([]);  
    const [selectedCity, setSelectedCity] = useState('0');

    useEffect(() => {
        api.get('Items').then(response => {
            setItems(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            setUF(response.data);
        });
    }, []);

    useEffect(() => {
        if(selectedUF === '0'){
            return;
        }
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`).then(response => {
            setCity(response.data);
        });

    }, [selectedUF]);

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
       const uf =  event.target.value;
       
       setSelectedUF(uf);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city =  event.target.value;
        
        setSelectedCity(city);
     }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="logo" />
                <Link to="/"><FiArrowLeft />Voltar para Home</Link>
            </header>
            <form>
                <h1>Cadastro do <br /> ponto de coleta</h1>

                <fieldset>
                    <legend><h2>Dados</h2></legend>
                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="name" /> <br />

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="e-mail">E-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email" />
                            </div>

                            <div className="field">
                                <label htmlFor="whatsapp">WhatsApp</label>
                                <input
                                    type="text"
                                    name="whatsapp"
                                    id="whatsapp" />
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2><span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={[-19.8786098, -44.0251721]} zoom={13}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-19.8786098, -44.0251721]}>
                        </Marker>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select 
                            name="uf" 
                            id="uf" 
                            value={selectedUF} 
                            onChange={handleSelectUf}>

                                <option value="">Selecione a UF</option>
                                {uf.map(uf => (
                                    <option value={uf.sigla} key={uf.id}>{uf.sigla} - {uf.nome}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select 
                            name="city" 
                            id="city"
                            value={selectedCity}
                            onChange={handleSelectCity}>

                                <option value="0">Selecione a Cidade</option>
                                {city.map(city => (
                                    <option value={city.nome} key={city.id}>{city.nome}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2> <span>Selecione um ou mais ítens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (

                            <li key={item.id}>
                                <img src={item.image_url} alt={item.title}/>
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">Cadastrar ponto de coleta</button>
            </form>
        </div>
    )
}

export default CreatePoint;