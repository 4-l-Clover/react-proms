import Axios from 'axios'

import { API_URL, JPA_API_URL } from './Constants'

class TodoDataService {

   retrieveAllTodos(name) {
       return Axios.get(`${JPA_API_URL}/users/${name}/todos`)
    }

   /*
   retrieveAllTodos(name) {
      let username = 'ronan'
      let password = 'dummy'

      let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)

     return Axios.get(`${JPA_API_URL}/users/${name}/todos`
      , 
          {
              headers : {
                  authorization: basicAuthHeader
              }
          }
     );        
   }
   */


   retrieveTodo(name, id) {
      return Axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`)
   }

   deleteTodo(name, id) {
      return Axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`)
   }

   updateTodo(name, id, todo) {

      console.log('Update TODO!!')

      return Axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo)
   }

   createTodo(name, todo) {
      return Axios.post(`${JPA_API_URL}/users/${name}/todos`, todo)
   }

}

export default new TodoDataService