<!--FIXME - This is a work in progress | Must resolve references to other pages -->

<script>
import axios from 'axios' // import axios to make API calls
const apiURL = import.meta.env.VITE_ROOT_API 

export default { // export default to allow other pages to import this page
  data() { 
    return {
      queryData: [],
      // Parameter for search to occur
      searchBy: '',
      servicetName: '',
      serviceStatus: '',
    }
  },
  created() {
    this.getServices() // get all services on page load
  },
  methods: {
    handleSubmitForm() { 
      let endpoint = ''
      if (this.searchBy === 'Service Name') { // if search by service name
        endpoint = `services/search/?serviceName=${this.serviceName}&searchBy=name` // search by service name and set endpoint
      }
      else if (this.searchBy === 'Service Status') { // if search by service status
        endpoint = `services/search/?serviceStatus=${this.serviceStatus}&searchBy=status` // search by service status and set endpoint
      }
      axios.get(`${apiURL}/${endpoint}`).then((res) => { // make API call
        this.queryData = res.data
      })
    },
    // abstract get services call
    getServices() {
      axios.get(`${apiURL}/services`).then((res) => {
        this.queryData = res.data // set queryData to response data
      })
      window.scrollTo(0, 0) // scroll to top of page
    },
    clearSearch() {
      // Resets all the variables
      this.searchBy = ''
      this.serviceNumber = ''


      // get all entries
      this.getServices()
    },
    editService(serviceID) {
      this.$router.push({ name: 'updateservice', params: { id: serviceID } }) // route to update service page
    },
    addService() {
      this.$router.push({ name: 'serviceform' }) // route to create service page
    },
  }
}
</script>
<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Services
      </h1>
      <div>
      <br>
      <div class="text-center">
      <button class="bg-red-700 text-white rounded"
            @click="addService"
            type="submit"> 
            Add New Service 
      </button>
      </div>
      </div>
    </div>
    <div class="px-10 pt-20">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <h2 class="text-2xl font-bold">Search Service By</h2>
        <!-- Displays Service Name search field -->
        <div class="flex flex-col">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchBy"
          >
            <option value="Service Name">Service Name</option>
            <option value="Service Status">Service Status</option>
          </select>
        </div>
        <div class="flex flex-col" v-if="searchBy === 'Service Name'">
          <label class="block">
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="firstName"
              v-on:keyup.enter="handleSubmitForm"
              placeholder="Enter service name"
            />
            </label>
        </div>
        <div class="flex flex-col" v-if="searchBy === 'Service Status'">
          <input
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            v-model="serviceStatus"
            v-on:keyup.enter="handleSubmitForm"
            placeholder="Enter Service Status"
          />
        </div>
        </div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
        <div></div>
        <div></div>
        <div class="mt-5 grid-cols-2">
          <button
            class="mr-10 border border-red-700 bg-white text-red-700 rounded"
            @click="clearSearch"
            type="submit"
          >
            Clear Search
          </button>
          <button
            class="bg-red-700 text-white rounded"
            @click="handleSubmitForm"
            type="submit"
          >
            Search Service
          </button>
        </div>
      </div>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Found Data -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
    >
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Services</h2>
        <h3 class="italic">Click table row to edit/display an entry</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Service Name</th>
              <th class="p-4 text-left">Service Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr
              @click="editService(service._id)"
              v-for="service in queryData"
              :key="service._id"
            >
              <td class="p-2 text-left">
                {{ service.name}}
              </td>
              <td class="p-2 text-left">
                {{ service.status}} }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
