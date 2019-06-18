import React from 'react';

const Header = ({title, displayName, signOut}) => (
  <header className="header">
    <div className="header__title">{ title }</div>
    { displayName && (
      <div 
        className="header__profile"
        onClick={() => {
          signOut();
        }}
      >
        {displayName}
        <img src={require('../../assets/user.svg')} alt='' />
      </div>
    )}
  </header>
);

export default Header;
