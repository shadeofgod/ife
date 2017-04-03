import createNew from './components/CreateNew'
import lists from './components/Lists'

const routes = [
  {
    path: '/',
    name: 'createNew',
    component: createNew
  },
  {
    path: '/lists',
    name: lists,
    component: lists
  }
]

export default routes
