import { Route, BrowserRouter, Routes} from 'react-router-dom';
import { Home } from '../Pages/Home';
import { Login } from '../Pages/Login';
import { Register } from '../Pages/Register';

export const Rutas = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/profile" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}
