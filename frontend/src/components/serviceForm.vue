<!-- To do for Sprint 3: make services dynamic -->

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      org: '',
      service: { // service object with default values
        name: '',
        status: '',
        description: ''
      }
    }
  },
  created() { //DH - gets the organization id
    axios.get(`${apiURL}/org`).then((res) => {
      this.org = res.data._id
    })
  },
  methods: {
    handleSubmitForm() {
      //DH - adds service to database
      this.$axios.post(`${apiURL}/services`, this.service)
        .then(() => {
          this.$router.push({ name: 'services' }) // route to services page
          alert('Service added successfully!') // alert user that service was added
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  // sets validations for the various data properties
  validations() {
    return {
      service: {
        name: { required }
      }
    }
  },
}
</script>
<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Create New Service
      </h1>
    </div>
    <div class="px-10 py-20">
      <!-- @submit.prevent stops the submit service from reloading the page-->
      <form @submit.prevent="handleSubmitForm">
        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Service Details</h2>

          <!-- form field -->
          <div class="flex flex-col w-50">
            <label class="block">
              <span class="text-gray-700">Service Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                id="name"
                class="w-50 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="service.name"
              />
            </label>
            </div>
              <div class="flex flex-col w-50">
            <label>
              <span class="text-gray-700">Service Description</span>
              <span style="color: #ff0000"></span>
              <input
                type="text"
                id="description"
                class="w-50 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="service.description"
              />
              <label>
              <span class="text-gray-700">Active Service Status?  </span>
              <input type="checkbox" id="status" v-model="service.status">
              </label>
              <span class="text-black" v-if="v$.service.name.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.service.name.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
            </label>
          </div>

          <!-- form field -->
          <div class="flex flex-col">
          </div>
          <div></div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              type="reset"
              class="border border-red-700 bg-white text-red-700 rounded"
              @click="$router.back()"
            >
              Go back
            </button>
          </div>
        <div class="flex justify-between mt-10 mr-20">
          <button class="bg-red-700 text-white rounded" type="submit">
            Add New Service
          </button>
        </div>
        </div>
        
      </form>
    </div>
  </main>
</template>
