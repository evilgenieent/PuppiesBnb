const React = require('react');
const HashHistory = require('react-router').hashHistory;
const BookingActions = require('../actions/booking_actions');

const BookingIndexItem = React.createClass({
  render() {
    const startDate = new Date(this.props.booking.start_date);
    const endDate = new Date(this.props.booking.end_date);

    return (
      <li className='booking-listing-item'>
        <h1>{this.props.booking.puppy.name}</h1>
        <div className='booking-listing-info'>
          <img onClick={this._redirectToPuppy} className='booking-listing-pic' src={this.props.booking.puppy.image_url} />
          <div className='booking-text-container'>
            Start Date: {(startDate.getMonth()) + '/' + startDate.getDate() + '/' + startDate.getFullYear()} <br/>
            End Date: {(endDate.getMonth()) + '/' + endDate.getDate() + '/' + endDate.getFullYear()} <br/>
          </div>
        </div>
      </li>
    );
  }
});

module.exports = BookingIndexItem;