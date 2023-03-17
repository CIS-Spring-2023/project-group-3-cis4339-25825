import { defineStore } from 'pinia'
export const userLoggedIn = defineStore({
    id: 'loggedIn',
    state: () => {
        return {
            name: '',
            isLoggedIn: false,
            userType: ''
        }
    },
    actions: {
        async login(username, password) {
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
        logout() {
            this.$patch({
                name: '',
                isLoggedIn: false,
                userType: ''
            })
            this.$router.push("/");
        }
    }
})

function fauxApi(username, password) {
    if (username === 'Viewer' && password === 'viewer') {
        return Promise.resolve({
            isPermitted: true,
            name: 'viewer',
            userType: 'viewer'
        })
    } else if (username === 'Editor' && password === 'editor') {
            return Promise.resolve({
                isPermitted: true,
                name: 'editor',
                userType: 'editor'
            })
        }
        else {
            return Promise.reject(new Error ('Invalid credentials'))
        }
    }