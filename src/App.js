import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HeaderCustom from './components/layout/HeaderCustom.js';
import Dashboard from './pages/dashboard'
import { Layout } from 'antd';

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <HeaderCustom />

        <Content>
          <Switch>
            <Route path='/' exact component={HeaderCustom}></Route>
            <Route path='/dashboard' exact component={Dashboard}></Route>
          </Switch>
        </Content>

      </Layout>
    </BrowserRouter>
  );
}

export default App;
