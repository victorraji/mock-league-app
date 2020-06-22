<template>
  <div class="has-padding-40 has-background-white has-max-width-500 has-margin-0-auto">
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
    <div
      class="is-size-5 has-margin-bottom-15 has-padding-15 has-text-centered has-text-weight-bold has-background-wallet"
    >Edit Team</div>
    <div class="has-padding-10 has-max-width-500">
      <b-field label="Team name">
        <b-input v-model="team_name" name="name" placeholder="e.g Liverpool fc"></b-input>
      </b-field>

      <b-field label="Manager">
        <b-input v-model="manager" name="manager" placeholder="e.g Jurgen Klopp"></b-input>
      </b-field>

      <div class="buttons">
        <b-button @click="edit_team" type="is-primary is-full-width" expanded>
          <span style="font-size: 1.2em">Edit Team</span>
        </b-button>
      </div>
      <!-- select from contribution plans -->

      <!-- Create new contribution plan -->
      <!-- Get amount and means -->
    </div>
  </div>
</template>

<script>
// import moment from "moment";
import swal from "sweetalert";
const axios = require("axios");
export default {
  name: "edit-team",
  props: {
    teamId: { type: String, required: true }
  },
  data() {
    return {
        team_name:"",
        manager:"",
        isLoading:false
    };
  },
  //   mounted() {
  //     this.getWalletDetailsFromApi();
  //   },
  methods: {
    edit_team: async function() {
        const vm=this;
      let token = localStorage.getItem("token");
      console.log(token);
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      if (vm.team_name === "") {
        setTimeout(
          () => swal("Error!", "Fill in field team name' ", "error"),
          0
        );
      } else {
        this.isLoading = true;
        try {
          let response = await axios.patch(
            this.$baseUrl + "teams/"+vm.teamId,
            {
              name: vm.team_name,
              manager: vm.manager
            },
            config
          );
          this.isLoading = false;
          setTimeout(
            () => swal("You just updated a team on mock league", "", "success"),
            0
          );
          console.log(response);
          setTimeout(() => this.$router.go("teams"), 1000);
        } catch (error) {
          this.isLoading = false;
          setTimeout(
            () => swal("Yikes!", error.response.data.message, "error"),
            1000
          );
          return error, console.log(error.response.data);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.has-background-wallet {
  border: 1px solid #101110 !important;
  border-radius: 5px;
  color: #0a0f0a;
  background: #eeeeee;
}
</style>