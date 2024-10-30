import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    const [name, setName] = useState('LOLO');
    const [car, setCar] = useState({
        name: 'bmw',
        color: 'neon',
        price: 12345,
    });

    const setState = (chabhi: string, value: string | number) => {
        setCar((p) => ({
            ...p,
            [chabhi]: value,
        }));
    };

    return (
        <div>
            Home hai yeh {name}<br />
            <button onClick={() => setName('Jahnvi')}>Click</button>&nbsp;&nbsp;&nbsp;
            <Link to="/home/test">Home Test</Link>&nbsp;&nbsp;&nbsp;<br />
            Name: {car?.name ? car?.name : 'naam'}
            Color: {car?.color}
            Price: {car?.price}
            <button onClick={() => setState('color', 'red')}>Click me for fun</button>&nbsp;&nbsp;&nbsp;
            <button onClick={() => setState('name', 'luna')}>Click me for double fun</button>&nbsp;&nbsp;&nbsp;
        </div>
    )
}
