import { useEffect, useState } from "react";
import UserBalance from "../components/Dashboard/UserBalance";

import '../styles/Dashboard.scss';
import '../styles/MyAccount.scss';
import { formatHolderName } from "../utils/formatData";

const MyAccount = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [user, setUser] = useState(null);

  const handleUserDetails = () => {
    const userDataStr = localStorage.getItem("userData");
    const userData = JSON.parse(userDataStr);
    setUser(userData[0]);
  };

  useEffect(() => {
    handleUserDetails();
  }, [user]);


  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };


  return (
    <div className='main'>
      <div className='titlebar'>
        <h1>My Account</h1><button className="button" onClick={toggleEdit}>Edit Profile</button>
      </div>
      <div className='dashboard-cards'>
        <UserBalance />
        {showEdit && <EditDetails />}
      </div>
    </div>
  );
};




const EditDetails = () => {
  const [newHolder, setNewHolder] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const [editType, setEditType] = useState('');
  
  const userDataStr = localStorage.getItem("userData");
  const userData = JSON.parse(userDataStr);

  
  const handleEditName = (name) => {
    if (name === '') {
      setError('Name cannot be empty');
    } else if (name.length < 3) {
      setError('Name must be at least 3 characters');
    } else if (!/^[\sa-zA-Z]+$/.test(name)) {
      setError('Name must contain only letters');
    } else if (userData.some((user) => user.holder.toLowerCase() === name.toLowerCase())) {
      setError('Name already exists');
    } else {
      setError('');
    }
  };

  

  const handleEditEmail = (email) => {
    if (email === '') {
      setError('Email cannot be empty');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email must be valid');
    } else {
      setError('');
    }
  };

  const handleEditPassword = (password) => {
    if (password === '') {
      setError('Password cannot be empty');
    } else if (password.length < 8) {
      setError('Password must be at least 8 characters');
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
      setError ('Password must contain at least one uppercase letter, one lowercase letter, and one number')
    } else {
      setError('');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    

    if (editType === 'holder') {
      if (error !== '') {
        alert('Please fix errors');
      } else 
      {
        userData[0].holder = formatHolderName(newHolder);
        setEditType('');
      }
    } else if (editType === 'email') {
      userData[0].email = newEmail;
      setEditType('');
    } else if (editType === 'password') {
      userData[0].password = newPassword;
      setEditType('');
    }
    console.log(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
    setNewHolder('');
    setNewEmail('');
    setError('');
    setNewPassword('');
  };

  return(
    <div className="editUser">
      {editType === '' && <h1>Edit Details</h1>}
      {editType !== '' && <h1>Edit {formatHolderName(editType)}</h1>}
      <form>
        <div>
          {editType === 'holder' || (editType === '' && <button onClick={() => {setEditType('holder')}} >Edit Name</button>)}
          {editType === 'holder' && (
            <div>
              <label>Account Holder</label>
              <input type="text" placeholder="Change Holder Name" name="name" value={newHolder} onChange={(e) =>{ handleEditName(e.target.value); setNewHolder(e.target.value)}} id="name" required/>
            </div>
          )}
        </div>

        <div>
        {editType === 'email' || editType === '' && (<button onClick={() => {setEditType('email')}} >Edit Email</button>)}
            {editType === 'email' && (
              <div>
                <label>Email Address</label>
                <input type="email" placeholder="Change Email" name="email" value={newEmail} onChange={(e) => { handleEditEmail(e.target.value);setNewEmail(e.target.value);}} id="email" required/>
              </div>
            )}
        </div>

        <div>
        {editType === 'password' || editType === '' && (<button onClick={() => {setEditType('password')}} >Edit Password</button>)}
            {editType === 'password' && (
              <div>
                <label>Password</label>
                <input type="password" placeholder="Change Password" name="password" value={newPassword} onChange={(e) => {setNewPassword(e.target.value); handleEditPassword(e.target.value);}} id="password" required/>
              </div>
            )}
          </div>
          {editType !== '' && <span className="error-text">{error}</span>}
        {editType !== '' && <button className="button" onClick={handleSubmit}>Submit</button>}
      </form>
    </div>
  )
};

export default MyAccount;