import React from 'react';
import SigInButton from './SigIn/SigInButton.tsx';

function Header() {
  return (
    <>
      <div className={'header w-100 bg-red'}>Header</div>
      <a href={'/address/list'}>Addres All</a>
      <a href={'/address/list/1'}>Addres one (By ID 1)</a>
      <SigInButton />
    </>
  );
}
export default Header;
