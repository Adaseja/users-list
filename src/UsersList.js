import { useState } from "react";
import "./UsersList.css";

const UsersList = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    usertype: "Admin",
  });

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const filteringHandle = (action) => {
    console.log(action.target.name);
    
    let newArray = [] 
  
    if (action.target.name === "showUsers") {
      newArray = users.filter((user) => {
        return (user.usertype) === "User";
      });
    } else if (action.target.name === "showAdmins") {
      newArray = users.filter((user) => {
        return (user.usertype) === "Admin";
      });
    } else if (action.target.name === "showAll") {
      newArray = users.filter((user) => {
        return (user.usertype) === "All";
      });
    }
    console.log(newArray);
  };
  

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    setFormData((prevDataForm) => {
      return { ...prevDataForm, [name]: target.value };
    });
  };

  const setUser = (e) => {
    e.preventDefault();
    setUsers(users.concat({ ...formData, id: Date.now() }));
  };

  const removeUser = (id) => {
    const filteredUsers = users.filter(user=>user.id !== id)
    setUsers(filteredUsers)
  }


  return (
    <div className="usersList">
      <form onSubmit={setUser}>
        <label htmlFor="username">User name</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="User name"
          onChange={handleInputChange}
          value={formData.username}
        />
        <label htmlFor="email">User email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="User email"
          onChange={handleInputChange}
          value={formData.email}
        />
        <label htmlFor="usertype">User type</label>
        <select id="usertype" name="usertype" onChange={handleInputChange}>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        <button>Save</button>
      </form>

      <div className="filterButtons">
        <button onClick={(event) => filteringHandle(event)} name="showUsers">
          Show Users
        </button>
        <button onClick={(event) => filteringHandle(event)} name="showAdmins">
          Show Admins
        </button>
        <button onClick={(event) => filteringHandle(event)} name="showAll">
          Show All
        </button>
      </div>



      <div className="list">
        {users.map((user) => {
          return (
            <div className="userItem" key={user.id} onClick={()=>removeUser(user.id)} >
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.usertype}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersList;
