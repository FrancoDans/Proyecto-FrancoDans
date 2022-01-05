import { Link } from 'react-router-dom'
import { CartWidget } from '../CartWidget/CartWidget'
import './NavBar.scss'
import Icono from "../../imagenes/919471.png";

export const NavBar = () => {

    
    return (
    
    <header className="header">
        <Link to="/">
        <img src={Icono} alt="logo" width="150px" />
        </Link>

        <nav>
            <ul>
                <li><Link to="productos/Nike">Nike</Link></li>
                <li><Link to="productos/Puma">Puma</Link></li>
                <li><Link to="productos/Adidas">Adidas</Link></li>
            </ul>
        </nav>
        
        <CartWidget/>
        
    </header>
    )
}


// export default NavBar