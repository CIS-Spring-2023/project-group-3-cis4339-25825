<script>
import ServiceData from '../assets/ServiceData.json'
export default {
  data() {return {
    queryData: [],
      // Parameter for search to occur
      searchBy: '',
      service: { // service object
        name: '',
        status: '',
        description: '',
  },
  created() {
    this.getServices() // get all services on page load
  },
  methods: {
    getServices() {
      this.queryData = ServiceData.currentServices // set queryData to service data
    },
    handleSubmitForm() {
        alert('Update has been saved.')
      },
    editService(serviceId) {
      alert('Service has been updated.')
    },
    eventDelete() {
        alert('Event has been deleted.')
      }
    },
  }
}
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
          <h2 class="text-2xl font-bold">Services Offered</h2>
        </div>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Service Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="service.name"
              />
            </label>
          </div>


          <!-- form field -->
          <!-- Still figuring out how to display services added -->
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Active Service Status?  </span>
              <input type="checkbox" id="serviceStatus" v-model="service.status">
              </label>
          </div>


        <!-- grid container -->
        <!-- Service update and delete -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="handleServiceUpdate"
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
        <hr class="mt-10 mb-10" />

        <!-- grid container -->
        <!-- Shows list of services at the bottom of the page -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <div>
            <h2 class="text-2xl font-bold">List of Services</h2>
            <h3 class="italic">Click table row to edit/display an entry</h3>
          </div>
          <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Service Name</th>
              <th class="p-4 text-left">Status</th>
              <th class="p-4 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr
              @click="editService(service.id)"
              v-for="service in queryData"
              :key="service.id"
            >
              <td class="p-2 text-left">
                {{ service.name}} <!-- display service name -->
              </td>
              <td class="p-2 text-left">
                {{ service.status==1 ? 'Inactive' : 'Active'}} <!-- ternary operator to display status -->
              </td>
              <td class="p-2 text-left">
                {{ service.description}} <!-- display service description -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </main>
</template>
