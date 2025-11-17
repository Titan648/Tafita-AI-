import { Menu } from 'lucide-react';
import './Header.css';

function Header({ onMenuClick }) {
  return (
    <header className="header">
      <button className="menu-button" onClick={onMenuClick}>
        <Menu size={24} />
      </button>
      <h2>Tafita AI</h2>
      <div className="header-spacer"></div>
    </header>
  );
}

export default Header;
