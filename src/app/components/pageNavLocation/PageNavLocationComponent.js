import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const PageNavLocationComponent = ({ pageName }) =>
  <div className="PageNavLocationComponentBlock">
    <div className="PageNavLocationComponent">
      <div className="PageNavLocationComponent-title">
        {pageName}
      </div>
      <div className="PageNavLocationComponent-content">
        <div className="PageNavLocationComponent-content-item"><Link to="/">Home</Link></div>
        <div className="PageNavLocationComponent-content-item"><Link to="/">First Category</Link></div>
        <div className="PageNavLocationComponent-content-item"><Link to="/">Second</Link></div>
        <div className="PageNavLocationComponent-content-item"><Link to="/">Last item</Link></div>
      </div>
    </div>
  </div>;

PageNavLocationComponent.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default PageNavLocationComponent;