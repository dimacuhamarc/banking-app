import { useState, useEffect } from "react";
import AccountCard from "./AccountCard";
import data from '../../assets/user-data.json';

export default function AccountList() {
  const [users, setUsers] = useState(data);

  const handleUsers = () => {
    setUsers(data);
  }

  useEffect(() => {
    handleUsers();
  });

  return (
    <div className="accounts-list">
      {
        users.map((user) => {
          return (
            <AccountCard 
              key={user.id}
              balance={user.balance}
              holder={user.holder}
              number={user.number}
              type={user.type}
              isAdmin={user.isAdmin}
            />
          );
        })
      }
    </div>
  );
}