// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
//Layout imports
import Home from './component/Home';
import Footer from './component/layout/Footer';
import Header from './component/layout/header';
// Product Detail
import ProductDetail from './component/product/ProductDetail';
//Auth or User imports
import { Login } from './component/user/Login';
import Register from './component/user/Register';
import Profile from './component/user/Profile';
import ProtectedRoute from './component/route/ProtectedRoute';
import UpdateProfile from './component/user/UpdateProfile';
import UpdatePassword from './component/user/UpdatePassword';
import ForgotPassword from './component/user/ForgotPassword';
import NewPassword from './component/user/NewPassword';

//Admin imports
import Dashboard from './component/admin/Dashboard';
import ProductList from './component/admin/ProductList';
import NewProduct from './component/admin/NewProduct';
import UpdateProduct from './component/admin/UpdateProduct';
import OrderList from './component/admin/OrderList';
import ProcessOrder from './component/admin/ProcessOrder';
import UserList from './component/admin/UserList';
import UpdateUser from './component/admin/UpdateUser';
import ProductReviews from './component/admin/ProductReviews';
import { loadUser } from './actions/userAction';
import store from './store';

//Cart import
import Cart from './component/cart/Cart';
import Shipping from './component/cart/Shipping';
import ConfirmOrder from './component/cart/ConfirmOrder';
import Payment from './component/cart/Payment';
import OrderSuccess from './component/cart/OrderSuccess';

// Payment
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Order imports
import ListOrders from './component/order/ListOrders';
import OrderDetails from './component/order/OrderDetails';
import { userReducer } from './reducer/userReducer';


// import { Routes, Route, Link } from 'react-router-dom';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');

      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey();

  }, []);
  const { user, isAuthenticated, loading } = useSelector(state => state.auth);

  return (
    <Router>
      
    <div className="App">
      <Header />
      <div className='container container-fluid'>
        
      <Route path='/' component={Home} exact />
      <Route path='/product/:id' component={ProductDetail} exact />
      <Route path='/search/:keyword' component={Home } />
      <Route path='/cart' component={Cart} exact />
      <ProtectedRoute path='/shipping' component={Shipping}  />
      <ProtectedRoute path='/order/confirm' component={ConfirmOrder}  />
      <ProtectedRoute path='/success' component={OrderSuccess}  />
      {stripeApiKey && 
        <Elements stripe={loadStripe(stripeApiKey)}>
         <ProtectedRoute path='/payment' component={Payment} /> 
        </Elements>
      }
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/password/forgot' component={ForgotPassword} />
      <Route path='/password/reset/:token' component={NewPassword} />
      <ProtectedRoute path='/me' component={Profile} exact />
      <ProtectedRoute path='/me/update' component={UpdateProfile} exact />
      <ProtectedRoute path='/password/update' component={UpdatePassword} exact />
      <ProtectedRoute path='/orders/me' component={ListOrders} exact />
      <ProtectedRoute path='/order/:id' component={OrderDetails} exact />
      </div>
      <ProtectedRoute path='/dashboard' isAdmin={true} component={Dashboard} exact />
      <ProtectedRoute path='/admin/products' isAdmin={true} component={ProductList} exact />
      <ProtectedRoute path='/admin/product' isAdmin={true} component={NewProduct} exact />
      <ProtectedRoute path='/admin/product/:id' isAdmin={true} component={UpdateProduct} exact />
      <ProtectedRoute path='/admin/orders' isAdmin={true} component={OrderList} exact />
      <ProtectedRoute path='/admin/order/:id' isAdmin={true} component={ProcessOrder} exact />
      <ProtectedRoute path='/admin/users' isAdmin={true} component={UserList} exact />
      <ProtectedRoute path='/admin/user/:id' isAdmin={true} component={UpdateUser} exact />
      <ProtectedRoute path='/admin/reviews' isAdmin={true} component={ProductReviews} exact />
      {!loading && (!isAuthenticated || user.role !== 'admin') && (
      <Footer />
      )}
    </div>
   
    </Router>
  );
}

export default App;
