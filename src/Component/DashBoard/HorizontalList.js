import React from 'react'


export const HorizontalList = ({users}) => {
  return (
    <div>
    <h2>User List</h2>
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <strong>Name:</strong> {user.name}, <strong>Age:</strong> {user.age}
        </li>
      ))}
    </ul>
  </div>

  )
}

