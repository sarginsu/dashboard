import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import moment from 'moment';
import './HeaderCustom.css';

const HeaderCustom = () => {
  const now = moment().format('DD MMMM YYYY');

  return (
    <div className="top-menu">
      <div className="top-bar">
        <Row>
          <Col xs={24} md={6} xl={6}>
            <Link to="/">
              <img alt="Bareksa" src="/bareksa.png" width="135" />
            </Link>
          </Col>
          <Col xs={24} md={6} xl={6}>
            {/* <Link to="/dashboard">
              Reinhart H.
            </Link> */}
          </Col>
          <Col xs={24} md={6} xl={6}>

          </Col>
          <Col xs={24} md={6} xl={6}>

          </Col>
        </Row>
      </div>
      <div className="sub-menu">
        <span className="text-date">
          {now}
        </span>
      </div>
    </div>
  )
};

export default HeaderCustom;