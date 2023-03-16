import { defineStore } from 'pinia' // import defineStore from 'pinia'
export const userLoggedIn = defineStore({ // create user login state
    id: 'loggedIn',
    state: () => {
        return {
            name: '',
            isLoggedIn: false,
            userType: ''
        }
    },
    actions: {
        async login(username, password) { // login action
            try {
                const response = await fauxApi(username, password)
                this.$patch({
                    isLoggedIn: response.isPermitted,
                    name: response.name,
                    userType: response.userType
            })
            this.$router.push("/");
            } catch (error) {
                console.log(error)
            }
        },
        async logout() { // logout action
            this.$patch({
                name: '',
                isLoggedIn: false,
                userType: ''
            })
            this.$router.push("/");
        }
    }
})

function fauxApi(username, password) { // fake api to emulate login credentials and response
    if (username === 'Viewer' && password === 'viewer') { // if username and password match for viewer access
        return Promise.resolve({
            isPermitted: true,
            name: 'viewer',
            userType: 'viewer'
        })
    } else if (username === 'Editor' && password === 'editor') { // if username and password match for editor access
            return Promise.resolve({
                isPermitted: true,
                name: 'editor',
                userType: 'editor'
            })
        }
        else {
            return Promise.reject(new Error ('Invalid credentials')) // if username and password do not match any credentials
        }
    }