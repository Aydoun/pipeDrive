import React, { Component } from 'react';
import { Avatar } from 'antd';
import './index.css';

class UserDetails extends Component {
  render() {
    return (
      <div className="user-details__wrapper">
        <div >
          <table>
            <tbody>
              <tr className="user-contact__info">
                <td></td>
                <td>
                <div>
                    <Avatar 
                      src="https://www.bing.com/th?id=OIP.1g4ItbHS0yvA0WHilyOY1QHaFj&w=236&h=177&c=7&o=5&pid=1.7"
                       size={64} />
                    <div className="user-contact__name">Anna Rita Sousa</div>
                    <div className="user-contact__phone">+87 1222128732</div>
                  </div>
                </td>
              </tr>
              <tr className="user-personal__info">
                  <td>Name</td>
                  <td>Gabrielle</td>
              </tr> 
              <tr className="user-personal__info">
                  <td>Name</td>
                  <td>Gabrielle</td>
              </tr> 
              <tr className="user-personal__info">
                  <td>Name</td>
                  <td>Gabrielle</td>
              </tr> 
            </tbody>
          </table>
        </div> 
      </div>
    );
  }
}


export default UserDetails;
