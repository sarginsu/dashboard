import './index.css';
import moment from 'moment';

const Dashboard = () => {
  const now = moment().format('DD MMMM YYYY');

  return (
    <div className="top-menu">
      <div className="top-bar">
        <h3>Bareksa</h3>
      </div>
      <div className="sub-menu">
        <h5>{now}</h5>
      </div>
    </div>
  )
};

export default Dashboard;