import './UserProfilePage.css';

import Header from '../../components/Header/Header';
import Addresses from '../../components/UserProfile/Addresses';
import PersonalInfo from '../../components/UserProfile/PersonalInfo';

const UserProfilePage = () => {
  return (
    <div>
      <Header></Header>
      <main className="login_page user-profile_page">
        <div className="user-profile_container">
          <h2 className="user-profile_heading">My Profile</h2>
          <div className="info-container">
            <PersonalInfo />
            <Addresses />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfilePage;
