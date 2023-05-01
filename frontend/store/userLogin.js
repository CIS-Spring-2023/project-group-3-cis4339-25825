import { defineStore } from 'pinia'
import axios from 'axios'

const apiURL = import.meta.env.VITE_ROOT_API

export const useLoggedInUser = defineStore({
  id: 'loggedInUser',
  state: () => ({
    name: '',
    role: 0,
    isLoggedIn: false,
  }),
  actions: {
    async login(username, password) {
      try {
        console.log(username, password);
        const response = await axios.post(`${apiURL}/users/login`, {
          username: username,
          password: password,
        });
        console.log(response);
        if (response && response.data) {
          this.name = response.data.username;
          this.role = response.data.role;
          this.isLoggedIn = true;
          console.log(response);
          this.$router.push('/');
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 500) {
          alert('Internal server error. Please try again later.');
        } else {
          alert('Invalid credentials. Please try again.');
        }
      }
    },
    logout() {
      this.name = '';
      this.role = 0;
      this.isLoggedIn = false;
      this.$router.push('/login');
    },
  },
});



