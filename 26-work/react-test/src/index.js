import React from 'react';
import ReactDOM from 'react-dom';

const animals = [
    { name: '🐯', isMammal: true, lastName: 'Tiger', id: 1 },
    { name: '🐻', isMammal: true, lastName: 'Bear', id: 2 },
    { name: '🐶', isMammal: true, lastName: 'Dog', id: 3 },
    { name: '🐱', isMammal: true, lastName: 'Cat', id: 4 },
    { name: '🐷', isMammal: true, lastName: 'Pig', id: 5 },
    { name: '🐸', isMammal: false, lastName: 'Frog', id: 6 },
    { name: '🐵', isMammal: true, lastName: 'Monkey', id: 7 },
];

const Header = () => (
    <header>
        <h1>Welcome to the Animal App</h1>
    </header>
);

const Sidebar = () => (
    <aside className="sidebar">
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </aside>
);

const AnimalList = ({ animals }) => {
    const handleMouseEnter = (lastName) => {
        alert(`Название: ${lastName}`);
    };

    return (
        <div style={{ display: 'flex' }}>
            {animals.map((animal, index) => (
                <div
                    key={index}
                    style={{ margin: '10px', cursor: 'pointer' }}
                    onMouseEnter={() => handleMouseEnter(animal.lastName)}
                >
                    {animal.name}
                </div>
            ))}
        </div>
    );
};

const Form = () => {
    return (
        <form>
            <label htmlFor="name">Name</label>
            <input type="text" id='name' />

            <label htmlFor="lastName">Last Name</label>
            <input type="text" id='lastName' />

            <button type="submit">Submit</button>
        </form>
    );
};

ReactDOM.render(
    <>
        <Header/>
        <Sidebar/>
        <main>
            <Form />
            <AnimalList animals={animals} />
        </main>
    </>,
    document.getElementById('root')
);