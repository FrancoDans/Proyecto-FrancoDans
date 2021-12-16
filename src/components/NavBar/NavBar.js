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
                <li><Link to="productos/nike">Nike</Link></li>
                <li><Link to="productos/puma">Puma</Link></li>
                <li><Link to="productos/adidas">Adidas</Link></li>
            </ul>
        </nav>
        
        <CartWidget/>
        
    </header>
    )
}


// export default NavBar