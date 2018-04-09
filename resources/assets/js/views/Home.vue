<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <div class="loading" v-if="loading">
                    <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"></img>
                </div>
                <div class="message" :key="status.id" v-for="status in statuses.data" v-if="!loading">
                    <div class="message-header">
                        <p>
                            {{ status.user.name }} said...     
                        </p>
                        <p>
                            {{ status.created_at | ago | capitalize }}
                        </p>
                    </div>

                    <div class="message-body" v-text="status.body"></div>
                </div>
                 <vue-pagination :pagination="statuses"
                     @paginate="getStatuses()"
                     :offset="4">
                </vue-pagination>
                <br>
                <add-to-stream @completed="addStatus"></add-to-stream>
            </div>
        </div>
    </div>
</template>
<script>
import moment from "moment";
import Status from "../models/Status";
import AddToStream from "../components/AddToStream";
import VuePagination from "../components/Pagination";
export default {
  components: {
    AddToStream,
    VuePagination
  },
  data() {
    return {
      statuses: [],
      loading: true
    };
  },
  filters: {
    ago(date) {
      return moment(date).fromNow();
    },
    capitalize(value) {
      return value.toUpperCase();
    }
  },
  created() {
    this.getStatuses();
  },
  methods: {
    getStatuses(){
        this.loading = true;
        Status.all(this.statuses.current_page).then(({ data }) => {
          this.loading = false;
          this.statuses = data;
        });
    },
    addStatus(status) {
      this.statuses.unshift(status);
      alert("Your status has been added");
      window.scrollTo(0, 0);
    }
  }
};
</script>
<style scoped>
 .loading{
   margin: auto;
   width: 50%;
 }
</style>

