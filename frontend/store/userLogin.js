import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const userLoggedIn = defineStore({
  id: 'loggedIn',
  state: () => ({
    name: '',
    isLoggedIn: false,
    userType: '',
  }),
  actions: {
    async login(username, password) {
      try {
        const router = useRouter()
        const response = await axios.post('/users/login', { username, password })

        // Update the state based on the response from the backend
        this.name = response.data.username
        this.isLoggedIn = true
        this.userType = response.data.role

        // Store the access token in local storage
        localStorage.setItem('accessToken', response.data.accessToken)

        // Redirect the user to the home page
        router.push('/')
      } catch (error) {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log('Error', error.message)
        }
      }
    },
    async logout() {
      const router = useRouter()
      this.name = ''
      this.isLoggedIn = false
      this.userType = ''
      localStorage.removeItem('accessToken')
      router.push('/')
    },
    async createUser(username, password, role) {
      try {
        const response = await axios.post('/users', { username, password, role })
        return response.data
      } catch (error) {
        console.error(error)
      }
    },
    async getUsers() {
      try {
        const response = await axios.get('/users')
        return response.data
      } catch (error) {
        console.error(error)
      }
    }
  },
})
