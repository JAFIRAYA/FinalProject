import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'


const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [ tasks, setTasks] = useState(null)
 
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail} `)
      const json = await response.json()
      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (authToken) {
      getData()
    }}
  , [])

  console.log(tasks)

  //Sort by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))


  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken &&
        <>
        <div className='app-all'>
        <ListHeader listName={'Hello , This Your Programm'} getData={getData} />
        <h3 className="user-email">Welcome back  {userEmail}  😇  </h3>
        {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
        </div>
        </>}
      
    </div>
  )
}

export default App
