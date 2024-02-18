import {Table} from './Table.tsx'
import {useEffect, useState} from 'react'
import {fetchApiUsers, User} from './api-readonly-file.ts'

function App() {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    fetchApiUsers().then(setUsers)
  }, []);

  return (
    <>
      {users?.length} rows fetched
      <Table
        data={users ?? []}
        defaultLimit={25}
        columns={[
          {id: 'id', title: 'ID', render: _ => _},
          {id: 'firstname', title: 'First name', render: _ => _},
          {id: 'lastname', title: 'Last name', render: _ => _},
          {id: 'country', title: 'Country', render: _ => _},
        ]}
       />
    </>
  )
}

export default App
