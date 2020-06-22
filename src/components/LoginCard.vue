<template>
  <div class="card-style">
    <h2 class="card-header-title is-size-4">Login to your account</h2>
    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
    <div class="has-background-white card-container">
      <div class="logo">
        <router-link to="/">
          <img class="logo-home" src="../assets/image2.png" alt="company logo">
        </router-link>
      </div>
      <div class="card-content">
        <form
          class="has-min-width-250 has-max-width-300"
          style="margin: 0 auto;"
          action
          method="POST"
          @submit.prevent="login"
          @keyup.enter="login"
        >
          <b-field label="Email Address">
            <b-input v-model="email" name="email" placeholder="eg victor@gmail.com"></b-input>
          </b-field>

          <b-field label="Password">
            <b-input
              type="password"
              v-model="password"
              name="password"
              placeholder="Password"
              password-reveal
            ></b-input>
          </b-field>

          <div class="field">
            <div class="control">
              <span @click="login">
                <a>Forgot Password?</a>
              </span>
            </div>
          </div>
          <div class="buttons">
            <b-button @click="login" type="is-primary is-full-width" expanded>
              <span style="font-size: 1.2em">Log in</span>
            </b-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import { onLogin } from "@/vue-apollo";
import swal from "sweetalert";
// import authMutations from "@/modules/rootModule/api/graphql/mutations/Authentication";
// import { ROOT_MUTATION_TYPES } from "@/store/mutation-types";
// import getUrlFromUserRoles from "@/modules/commonModule/helpers/getRouteFromUserRole";
// import ForgotPasswordCard from "./ForgotPasswordCard.vue";
const axios = require("axios");
// var moment = require("moment");
export default {
  name: "LoginCard",
  //   components: { ForgotPasswordCard },

  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      isFullPage: true
    };
  },
//   },

  methods: {

    login: async function() {

      const vm = this;
      if (vm.email === "" || vm.password === "") {
        setTimeout(
          () => swal("Error!", "Fill in all specified fields", "error"),
          0
        );
      } else {
           this.isLoading = true;
        try {
          let response = await axios.post(
            this.$baseUrl + "users/login",
            { email: vm.email, password: vm.password },
            {}
          );
          console.log(response);
          //   let user = response.data.user;
          setTimeout(
            () => swal("Welcome!" +"  " + response.data.first_name , "You Just Logged in!", "success"),
            2000
          );
          console.log(response.data);
            localStorage.setItem("token", response.data.token);
          setTimeout(() => this.$router.push({ path: "/admin" }), 3000);
        } catch (error) {
          this.isLoading = false;
          return error, console.log(error.response.data.message),
          setTimeout(
            () => swal(error.response.data.message, "ERROR", "error"),
            2000
          );
        }
      }
    },
    logIllln() {
      // Form validation failed

      const loginInput = {
        email: this.user_input.toLowerCase(),
        password: this.password
      };
      console.log(loginInput);
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 10 * 1000);

      // this.$apollo
      //   .mutate({
      //     mutation: authMutations.loginMutation,
      //     variables: {
      //       input: loginInput
      //     }
      //   })
      //   .then(({ data }) => {
      //     data = data.login;
      //     onLogin(this.$apollo.provider.defaultClient, data.access_token);
      //     this.commitUserData(data);

      //     const url = getUrlFromUserRoles(data.roles);
      //     this.$router.push(url);
      //   })
      //   .catch(err => {
      //     this.$buefy.toast.open({
      //       duration: 5000,
      //       message: err.message,
      //       type: "is-danger"
      //     });
      //   })
      //   .finally(() => {
      //     this.loading = false;
      //   });
    }

    /**
     * Commit various pieces of data about the user to the Vuex store
     */
    // commitUserData(data) {
    //   this.$store.commit(ROOT_MUTATION_TYPES.SAVE_USER, data.user);
    //   this.$store.commit(
    //     ROOT_MUTATION_TYPES.SAVE_ACCESS_TOKEN,
    //     data.access_token
    //   );
    //   this.$store.commit(
    //     ROOT_MUTATION_TYPES.SAVE_REFRESH_TOKEN,
    //     data.refresh_token
    //   );
    //   this.$store.commit(ROOT_MUTATION_TYPES.SAVE_USER_ROLES, data.roles);
    // }
  }
};
</script>

<style scoped>
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
