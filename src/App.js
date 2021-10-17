// import { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './pages/dashboard';

// const axios = require('axios');

function App() {
  // const [orders, setOrders] = useState();
  // const [userCategory, setUserCategory] = useState();

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   try {
  //     const { data } = await axios.get('https://ae1cdb19-2532-46fa-9b8f-cce01702bb1e.mock.pstmn.io/takehometest/web/dashboard');
  //     const { orders, user_category } = data.data;
  //     setOrders(orders);
  //     setUserCategory(user_category);
  //     console.log({ orders, user_category });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
