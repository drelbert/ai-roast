'use client'

import { createGroup } from '@/utils/api'
import { useRouter } from 'next/navigation'
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  PromiseLikeOfReactNode,
  JSX,
  useState,
} from 'react'

const USERS = [
  { id: 1, name: 'Skibjorn' },
  { id: 22, name: 'Earl' },
  { id: 444, name: 'Juanita' },
]

// // const router = useRouter()

// const handleOnClick = async () => {
//   // const data = await createGroup(title)
//   // router.push(`/group/${data.id}`)
// }

// common parent to UserListItem, SearchUsers, and CreateGroup
// this is where the state values live
function NewGroup({ users }) {
  const [createNewGroup, setCreateNewGroup] = useState('')
  const [searchUsers, setSearchUsers] = useState('')
  const [userListItem, setUserListItem] = useState('')

  return (
    <div>
      <h2>Create New Group</h2>
      {/* passing in the constants as props */}
      <CreateGroup
        createNewGroup={createNewGroup}
        onCreateNewGroup={setCreateNewGroup}
      />
      <SearchUsers searchUsers={searchUsers} onSearchUsers={setSearchUsers} />
      <UserList users={users} userListItem={userListItem} />

      <button className="bg-slate-500 m-4 px-4 py-2 rounded-lg text-lg text-white hover:text-sky-400 focus:ring-slate-500">
        Create Group
      </button>
    </div>
  )
}

// uses state
// createNewGroup passed in props
function CreateGroup({ createNewGroup, onCreateNewGroup }) {
  return (
    <div className="b-4 pb-4">
      <form className="pt-4">
        <input
          type="text"
          value={createNewGroup}
          placeholder="Add Group Name"
          onChange={(e) => onCreateNewGroup(e.target.value)}
          className="block w-60px rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </form>
    </div>
  )
}

// uses state
// searchUsers passed as props
function SearchUsers({ searchUsers }) {
  return (
    <form className="pb-4">
      <input
        type="text"
        value={searchUsers}
        placeholder="Search for members..."
        className="block w-60px rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </form>
  )
}

function UserList({ users }) {
  const listItems:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | PromiseLikeOfReactNode
    | JSX.Element[]
    | null
    | undefined = []

  users.forEach((user) => {
    listItems.push(<UserListItem user={user} key={user.id} />)
  })
  return (
    <div>
      <h2>Choose Members</h2>
      <ul>{listItems}</ul>
    </div>
  )
}

// uses state
// userList item passed in as props
function UserListItem({ user, userListItem }) {
  const name = user.name

  return (
    <li>
      <input type="checkbox" className="mr-4" checked={userListItem} />
      {name}
    </li>
  )
}

export default function GroupCreate() {
  return <NewGroup users={USERS} />
}
