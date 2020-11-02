import React from 'react';

import './app-header.css';

function AppHeader({onNavClick}) {

  const navList =[
    {name: 'People'},
    {name: 'Planets'},
    {name: 'Starships'}
  ]
  return (
    <div className="app-header">
      <h1>StarWars DB</h1>
      <ul>
      {navList.map(el => (
        <li key={el.name} onClick={() => onNavClick(el.name.toLowerCase())}>{el.name}</li>
      ))}
      </ul>
    </div>
  )
}
export default AppHeader;
