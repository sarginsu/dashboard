import { useState, useEffect } from 'react';
import { Row, Col, Table, Tag } from 'antd';
import './index.css';
import moment from 'moment';
// import dummy from '../../data.json'

const Highcharts = require('highcharts');
const axios = require('axios');

const Dashboard = () => {
  const [orders, setOrders] = useState();
  const [userCategory, setUserCategory] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (userCategory) getChart();
  }, [userCategory]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('https://ae1cdb19-2532-46fa-9b8f-cce01702bb1e.mock.pstmn.io/takehometest/web/dashboard');
      const { orders, user_category } = data.data;
      // const { orders, user_category } = dummy;
      setOrders(orders);
      setUserCategory(user_category);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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

  const getChart = () => {
    const { conservative, moderate, risk_averse, risk_taker } = userCategory;
    const data = [{
      name: 'User Category',
      colorByPoint: true,
      data: [{
        name: 'Conservative',
        y: parseInt(conservative),
        sliced: true,
        selected: true
      }, {
        name: 'moderate',
        y: parseInt(moderate)
      }, {
        name: 'risk_averse',
        y: parseInt(risk_averse)
      }, {
        name: 'risk_taker',
        y: parseInt(risk_taker)
      }]
    }];

    Highcharts.chart('container', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: false,
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: data
    });
  };


  return (
    <Row className="content">
      <Col xs={24} md={12} xl={6}>
        <div className="widget">
          <span className="top-title">
            Conversion
          </span>
        </div>
      </Col>
      <Col xs={24} md={12} xl={6}>
        <div className="widget">
          <span className="top-title">
            Users
          </span>
        </div>
      </Col>
      <Col xs={24} md={24} xl={12}>
        <div className="widget">
          <span className="top-title">
            Revenue
          </span>
          <figure class="highcharts-figure">
            <div id="container"></div>
          </figure>
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