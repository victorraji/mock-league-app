<template>
  <div class="wrapper is-full-height has-background-custom">
    <div class="columns is-full-height is-vcentered is-centered has-padding-5-mobile is-gapless">
      <div
        class="column is-full-height is-full-mobile flex-column align-items-center has-padding-top-40"
      >
        <div class="card-style">
          <h2 class="card-header-title is-size-4">Create a Match</h2>
          <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
          <div class="has-background-white card-container">
            <div class="logo">
              <router-link to="/">
                <img class="logo-home" src="../assets/shedule.png" alt="company logo">
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
                <b-field label="Home team">
                  <multiselect
                    v-model="home_team"
                    :options="teamsNames"
                    placeholder="Select home team"
                    :allow-empty="false"
                  >
                    <template slot="singleLabel" slot-scope="{ option}">{{ option }}</template>
                  </multiselect>
                </b-field>

                <div class="is-flex justify-center has-text-weight-bold is-size-5">vs</div>

                <b-field label="Away team">
                  <multiselect
                    v-model="away_team"
                    :options="teamsNames"
                    placeholder="Select away team"
                    :allow-empty="false"
                  >
                    <template slot="singleLabel" slot-scope="{ option}">{{ option }}</template>
                  </multiselect>
                </b-field>

                <b-field label="Schedule">
                  <b-datepicker
                    editable
                    placeholder="time for the match"
                    v-model="schedule"
                    format="yyyy-MM-dd"
                    icon="calendar-today"
                    :aria-required="true"
                  ></b-datepicker>
                </b-field>

                <div class="buttons">
                  <b-button @click="create_match" type="is-primary is-full-width" expanded>
                    <span style="font-size: 1.2em">Create Match</span>
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
import Multiselect from "vue-multiselect";
import moment from "moment"
// import Datepicker from "vuejs-datepicker";

export default {
  name: "create-team",
  components: {
    Multiselect
    // Datepicker,
  },

  data() {
    return {
      home_team: null,
      away_team: null,
      isLoading: false,
      isFullPage: true,
      teams: [],
      schedule: ""
    };
  },
  mounted() {
    this.getTeamsFromApi();
  },
  computed: {
    teamsNames() {
      const teams = this.teams.map(team => team.name);
      return teams;
    }
  },

  // Axios.post(
  //   'http://localhost:8000/api/v1/get_token_payloads',
  //   bodyParameters,
  //   config
  // ).then(console.log).catch(console.log);

  methods: {
    getTeamsFromApi() {
      this.isLoading = true;
      console.log("here");
      axios
        .get(
          this.$baseUrl + "teams",
          { data: {} },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(response => {
          this.isLoading = false;
          console.log(response);
          this.teams = response.data.teams;
        })
        .catch(error => {
          this.isLoading = false;
          console.log(error);
        });
    },
    create_match: async function() {
      let token = localStorage.getItem("token");

      console.log(token);
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const vm = this;
      if (vm.home_team === "" || vm.away_team === "" || vm.schedule === "") {
        setTimeout(
          () => swal("Error!", "Fill in field team name' ", "error"),
          0
        );
      } else {
        this.isLoading = true;
        try {
          let response = await axios.post(
            this.$baseUrl + "matches",
            {
              home_team: vm.home_team,
              away_team: vm.away_team,
              schedule: moment(vm.shedule).format("YYYY-MM-DD")
            },
            config
          );
          this.isLoading = false;
          setTimeout(
            () => swal("You just created a fixture on mock league", "", "success"),
            0
          );
          console.log(response);
          setTimeout(() => this.$router.push("fixtures"), 3000);
        } catch (error) {
          this.isLoading = false;
          setTimeout(
            () => swal("Yikes!", error.response.data.error.message, "error"),
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
