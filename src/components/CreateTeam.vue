<template>
  <div class="wrapper is-full-height has-background-custom">
    <div class="columns is-full-height is-vcentered is-centered has-padding-5-mobile is-gapless">
      <div
        class="column is-full-height is-full-mobile flex-column align-items-center has-padding-top-40"
      >
        <div class="card-style">
          <h2 class="card-header-title is-size-4">Create a New Team</h2>
          <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
          <div class="has-background-white card-container">
            <div class="logo">
              <router-link to="/">
                <img class="logo-home" src="../assets/teamlogo.png" alt="company logo">
              </router-link>
            </div>
            <div class="card-content">
              <form
                class="has-min-width-250 has-max-width-300"
                style="margin: 0 auto;"
                action
                method="POST"
                @submit.prevent="create_team"
                @keyup.enter="create_team"
              >
                <b-field label="Team name">
                  <b-input v-model="team_name" name="name" placeholder="e.g Liverpool fc"></b-input>
                </b-field>

                <b-field label="Manager">
                  <b-input v-model="manager" name="manager" placeholder="e.g Jurgen Klopp"></b-input>
                </b-field>

                <div class="buttons">
                  <b-button @click="create_team" type="is-primary is-full-width" expanded>
                    <span style="font-size: 1.2em">Create Team</span>
                  </b-button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
const axios = require("axios");

export default {
  name: "create-team",

  data() {
    return {
      team_name: "",
      manager: "",
      isLoading: false,
      isFullPage: true
    };
  },

  // Axios.post(
  //   'http://localhost:8000/api/v1/get_token_payloads',
  //   bodyParameters,
  //   config
  // ).then(console.log).catch(console.log);

  methods: {
    create_team: async function() {
      let token = localStorage.getItem("token");

      console.log(token);
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const vm = this;
      if (vm.team_name === "") {
        setTimeout(
          () => swal("Error!", "Fill in field team name' ", "error"),
          0
        );
      } else {
        this.isLoading = true;
        try {
          let response = await axios.post(
            this.$baseUrl + "teams",
            {
              name: vm.team_name,
              manager: vm.manager
            },
            config
          );
          this.isLoading = false;
          setTimeout(
            () => swal("You just created a team on mock league", "", "success"),
            0
          );
          console.log(response);
          setTimeout(() => this.$router.push("teams"), 4000);
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

<style lang="scss">
html,
body {
  height: 100% !important;
}
.has-background-custom {
  background: #edf2f7 !important;
}

.card-header-title,
h2 {
  font-family: "Lato";
  text-align: center;
  justify-content: center;
  color: #3c5081;
  font-size: 1.1em;
  font-weight: bold !important;
  max-width: 300px;
  margin: 0 auto;
}
.card-container {
  padding: 25px 5px 10px;
  border-radius: 5px;
  max-width: 400px !important;
  margin: 0 auto;
}
.logo {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.card-style {
  padding: 1em;
}
</style>
