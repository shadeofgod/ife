import home from './components/Home'
import lists from './components/Lists'
import createNew from './components/New'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/lists',
    name: 'lists',
    component: lists
  },
  {
    path: '/new_enquire',
    name: 'createNew',
    component: createNew
  }
]

export default routes
