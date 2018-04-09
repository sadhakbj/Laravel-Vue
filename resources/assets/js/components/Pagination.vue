<template>
<div class="pagination">
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
      <a class="pagination-previous" :disabled="pagination.current_page === 1" @click.prevent="changePage(pagination.current_page -1)">Previous</a>
      <a class="pagination-next" :disabled="pagination.current_page === pagination.last_page" @click.prevent="changePage(pagination.current_page + 1)">Next page</a>
      <ul class="pagination-list">
        <li v-for="page in pagesNumber" :key="page">
              <a  
              class="pagination-link" 
              :class="{'is-current': page == pagination.current_page}"
              href="javascript:void(0)" 
              @click.prevent="changePage(page)" 
              >{{ page }}</a>
        </li>
      </ul>
  </nav>
     <span class="info">
      Displaying {{ this.pagination.data.length }}  of {{ this.pagination.total }} entires.
    </span>
 
</div>
</template>
<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true
    },
    offset: {
      type: Number,
      default: 4
    }
  },
  computed: {
    pagesNumber() {
      if (!this.pagination.to) {
        return [];
      }
      let from = this.pagination.current_page - this.offset;
      if (from < 1) {
        from = 1;
      }
      let to = from + this.offset * 2;
      if (to >= this.pagination.last_page) {
        to = this.pagination.last_page;
      }
      let pagesArray = [];
      for (let page = from; page <= to; page++) {
        pagesArray.push(page);
      }
      return pagesArray;
    }
  },
  methods: {
    changePage(page) {
      this.pagination.current_page = page;
      this.$emit("paginate");
    }
  }
};
</script>
<style scoped>
 .info{
   font-size: 14px;
   font-style: italic;
 }
</style>
