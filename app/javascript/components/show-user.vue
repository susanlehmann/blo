<template>
<div class="container">
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <table class="table">
        <thread>
          <tr>
            <th>Account name</th>
            <th>Account address</th>
          </tr>
        </thread>
        <tbody>
          <tr v-for="account in accounts">
            <td>account.name</td>
            <td>account.address</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: [
    'account'
  ],
  data() {
    return {
      accounts: []
    };
  },
  methods: {
    getUsers: function(){
      var app = this;

      axios.get('/accounts')
        .then((response) => this.users = response.data)
        .catch((error) => console.log(error.message))
    }
  },
  created(){
    this.getUsers();
  },
};
</script>

<style lang="sass" scoped>

</style>
