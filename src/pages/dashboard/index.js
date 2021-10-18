import { useState, useEffect } from 'react';
import { Row, Col, Table, Tag } from 'antd';
import './index.css';
import moment from 'moment';
import PieChart from '../../components/charts/PieChart';
import LineChart from '../../components/charts/LineChart';

import dummy from '../../data.json';
// const axios = require('axios');

const Dashboard = () => {
  const [orders, setOrders] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [dataConversion, setDataConversion] = useState();
  const [dataUsers, setDataUsers] = useState();
  const [dataRevenue, setDataRevenue] = useState();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        // const { data } = await axios.get('https://ae1cdb19-2532-46fa-9b8f-cce01702bb1e.mock.pstmn.io/takehometest/web/dashboard');
        // const { orders, user_category } = data.data;
        const { orders, user_category } = dummy;
        setOrders(orders);
        parseDataCategory(user_category);
        parseDataUsers(orders);
        parseDataRevenue(orders);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const columns = [
    {
      title: 'Order Number',
      dataIndex: 'order_id',
      key: 'order_id',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        const title = status.split(' ')
          .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
          .join(' ')
        let color = '';
        if (status === 'canceled') {
          color = '#D66D4B';
        } else if (status === 'completed') {
          color = '#789764';
        } else {
          color = '#E69849';
        }
        return (
          <Tag color={color} key={status} className="label-status">
            {title}
          </Tag>
        );
      },
    },
    {
      title: 'Operator',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
      render: start_date => (
        moment(start_date).format('DD/MM/YYYY HH:mm')
      ),
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
      render: due_date => (
        moment(due_date).format('DD/MM/YYYY HH:mm')
      ),
    },
  ];

  const parseDataUsers = (users) => {
    let completed = 0;
    let pending = 0;
    let canceled = 0;

    users.forEach(val => {
      const status = val.status;
      if (status === 'completed') completed++;
      else if (status === 'pending') pending++;
      else if (status === 'canceled') canceled++;
    });

    const data = [{
      name: 'Users',
      colorByPoint: true,
      data: [{
        name: 'Completed',
        y: parseInt(completed),
        sliced: true,
        selected: true,
        color: '#725E9C'
      }, {
        name: 'Pending',
        y: parseInt(pending),
        color: '#5C8F94'
      }, {
        name: 'Canceled',
        y: parseInt(canceled),
        color: '#EBA45E'
      }]
    }];
    setDataUsers(data);
  };

  const parseDataCategory = (userCategory) => {
    const { conservative, moderate, risk_averse, risk_taker } = userCategory;
    const data = [{
      name: 'User Category',
      colorByPoint: true,
      data: [{
        name: 'Conservative',
        y: parseInt(conservative),
        sliced: true,
        selected: true,
        color: '#725E9C'
      }, {
        name: 'moderate',
        y: parseInt(moderate),
        color: '#5C8F94'
      }, {
        name: 'risk_averse',
        y: parseInt(risk_averse),
        color: '#EBA45E'
      }, {
        name: 'risk_taker',
        y: parseInt(risk_taker),
        color: '#E4EAEB'
      }]
    }];
    setDataConversion(data);
  };

  const parseDataRevenue = (orders) => {
    let data = [];

    orders.forEach(val => {
      const date = new Date(val.start_date).getTime();
      const arr = [date, parseInt(val.conversion_revenue)];
      data = [...data, arr];
    });
    setDataRevenue(data);
  };

  return (
    <Row className="content">
      <Col xs={24} md={12} xl={6}>
        <div className="widget">
          <span className="top-title">
            Conversion
          </span>
          <PieChart container="conversion" data={dataConversion} />
        </div>
      </Col>
      <Col xs={24} md={12} xl={6}>
        <div className="widget">
          <span className="top-title">
            Users
          </span>
          <PieChart container="users" data={dataUsers} />
        </div>
      </Col>
      <Col xs={24} md={24} xl={12}>
        <div className="widget">
          <span className="top-title">
            Revenue
          </span>
          <LineChart container="users" data={dataRevenue} />
        </div>
      </Col>

      <Col xs={24} md={24} xl={7}>
        <div className="widget">
          <span className="top-title">
            Calenders
          </span>
        </div>
      </Col>
      <Col xs={24} md={24} xl={17}>
        <div className="widget-no-border">
          <span className="top-title">
            Orders
          </span>

          <Table
            columns={columns}
            dataSource={orders}
            loading={isLoading}
          />
        </div>
      </Col>
    </Row>
  )
};

export default Dashboard;