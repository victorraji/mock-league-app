<template>
  <div class="has-padding-40 has-background-white has-max-width-500 has-margin-0-auto">
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
    <div
      class="is-size-5 has-margin-bottom-15 has-padding-15 has-text-centered has-text-weight-bold has-background-wallet"
    >Upload Results</div>
    <div class="has-padding-10 has-max-width-500">
      <b-field label="Home Score">
        <b-input v-model="home_score" type="number" name="name" placeholder="e.g 1"></b-input>
      </b-field>

      <b-field label="Away Score">
        <b-input v-model="away_score" type="number" name="Away Score" placeholder="e.g 4"></b-input>
      </b-field>

      <div class="buttons">
        <b-button @click="edit_match" type="is-primary is-full-width" expanded>
          <span style="font-size: 1.2em">Edit Match</span>
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
  name: "edit-match",
  props: {
    matchId: { type: String, required: true }
  },
  data() {
    return {
        home_score:0,
        away_score:0,
        isLoading:false
    };
  },
  //   mounted() {
  //     this.getWalletDetailsFromApi();
  //   },
  methods: {
    edit_match: async function() {
        const vm=this;
      let token = localStorage.getItem("token");
      console.log(token);
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      if (vm.home_score === "" || vm.away_score ==="") {
        setTimeout(
          () => swal("Error!", "Fill in a score' ", "error"),
          0
        );
      } else {
        this.isLoading = true;
        try {
          let response = await axios.patch(
            this.$baseUrl + "matches/"+vm.matchId,
            {
              home_score: vm.home_score,
              away_score: vm.away_score
            },
            config
          );
          this.isLoading = false;
          setTimeout(
            () => swal("You just added a result on mock league", "", "success"),
            0
          );
          console.log(response);
          setTimeout(() => this.$router.go("fixtures"), 1000);
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