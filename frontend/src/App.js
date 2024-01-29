import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/login/Login';
import Signup from './Pages/signup/Signup';
import { Provider } from 'react-redux';
import store from './redux/store';
import CartPage from './Pages/cartPage/CartPage';
import OrderPage from './Pages/OrderPage/OrderPage';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter> 
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/orders" element={<OrderPage/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>

  );
}

export default App;
