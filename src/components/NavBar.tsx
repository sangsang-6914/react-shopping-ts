import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useAuth } from '../context/AuthContextProvider';

const NAV_ITEM_CLASS = 'hover:text-brand';

function NavBar() {
  const { user, login, logout } = useAuth();
  const handleLogin = () => {
    login().catch((err: any) => {
      console.error(err);
    });
  };
  const handleLogout = () => {
    logout()
      .then((result: any) => {
        console.log(result);
        // snackbar 처리
      })
      .catch((err: any) => {
        console.error(err);
      });
  };
  return (
    <header className="flex justify-between p-2 border-b border-gray-300">
      <Link
        to="/"
        className="flex items-center text-brand text-4xl hover:brightness-75"
      >
        <FiShoppingBag />
        <p>SangsMall</p>
      </Link>
      <nav className="flex gap-3 items-center font-bold">
        <Link to="/products" className={NAV_ITEM_CLASS}>
          Products
        </Link>
        {user && (
          <Link to="/carts" className={NAV_ITEM_CLASS}>
            Carts
          </Link>
        )}
        {user && user.isAdmin && (
          <Link to="/products/new">
            <BsFillPencilFill className={`text-xl ${NAV_ITEM_CLASS}`} />
          </Link>
        )}
        {user && (
          <>
            <img
              src={user.photoURL}
              className="w-10 h-10 rounded-full"
              alt="avatar"
            />
            <p>{user.displayName}</p>
          </>
        )}
        {user ? (
          <Button onClick={handleLogout} text="Logout" />
        ) : (
          <Button onClick={handleLogin} text="Login" />
        )}
      </nav>
    </header>
  );
}

export default NavBar;
