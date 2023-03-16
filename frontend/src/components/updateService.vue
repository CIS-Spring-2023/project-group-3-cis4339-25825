<!-- To do for Sprint 3: make services dynamic -->
<script>
import { userLoggedIn } from '/store/userLogin.js' // import userLoggedIn function from store.js
export default {
  setup() {
      const store = userLoggedIn(); // call userLoggedIn function
      return { store }
  },
  data() {return {
      // Parameter for search to occur
      searchBy: '',
      service: { // service object
        name: '',
        status: '',
        description: '',
  },
}
},
  methods: {
    serviceUpdate() {
      if (this.store.userType === 'editor') {
      alert('Service has been updated.') // alert user that service has been updated
      this.$router.push({ name: 'services' }) // route to services page
      }
      else {
        alert('You do not have permission to update a service.') // alert user that they do not have permission to update a service
        this.$router.push({ name: 'services' }) // route to services page
      }
    },
    serviceDelete() {
        if (this.store.userType === 'editor') {
        alert('Event has been deleted.') // alert user that service has been deleted
        this.$router.push({ name: 'services' }) // route to services page
        }
        else {
          alert('You do not have permission to delete a service.') // alert user that they do not have permission to delete a service
          this.$router.push({ name: 'services' }) // route to services page
        }
      },
},
}

</script>
<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Update Service
      </h1>
    </div>
    <div class="px-10 py-20">
      <form @submit.prevent="handleSubmitForm">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Services To Update</h2>
        </div>
        <br>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Service Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-50 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="service.name"
              />
            </label>
          </div>
          <br>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Service Description</span>
              <span style="color: #ff0000"></span>
              <input
                type="text"
                class="w-50 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="service.description"
              />
            </label>
          </div>
          <br>
          <!-- form field -->
          <div class="flex flex-col">
              <label class="block">
              <span class="text-gray-700">Active Service Status? </span>
              <input type="checkbox" id="status" v-model="service.status">
              </label>
          </div>

        <!-- grid container -->
        <!-- Service update and delete -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="serviceUpdate"
              type="submit"
              class="bg-green-700 text-white rounded"
            >
              Update Service
            </button>
          </div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="serviceDelete"
              type="submit"
              class="bg-red-700 text-white rounded"
            >
              Delete Service
            </button>
          </div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              type="reset"
              class="border border-red-700 bg-white text-red-700 rounded"
              @click="$router.back()"
            >
              Go back
            </button>
          </div>
        </div>
      </form>
  </div>
  </main>
</template>
