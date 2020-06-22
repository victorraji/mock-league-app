<template>
  <div class="wrapper is-full-height has-background-white-bis">
    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
    <div class="logo">
      <router-link to="/">
        <img class="logo-home" src="../assets/image2.png" alt="company logo">
      </router-link>
    </div>
    <div
      class="has-text-primary is-size-4 is-size-5-mobile has-text-centered is-uppercase has-padding-20 has-text-weight-bold"
    >Sign up as an Admin</div>
    <section>
      <div class="has-background-white card-container-p">
        <b-field label="First Name">
          <b-input v-model="first_name"></b-input>
        </b-field>
        <b-field label="Last Name">
          <b-input v-model="last_name"></b-input>
        </b-field>
        <b-field label="Email" message>
          <b-input v-model="email" type="email"></b-input>
        </b-field>
        <b-field
          label="Password"
          v-if="passwordLengthOkay === 'false'"
          type="is-danger"
          :message="['Password is too short', 'Password must have at least 8 characters']"
        >
          <b-input v-model="password" type="password" maxlength="30"></b-input>
        </b-field>
        <b-field
          label="Password"
          v-else-if="passwordLengthOkay === 'normal'"
          :message="['Password must have at least 8 characters']"
        >
          <b-input v-model="password" type="password" maxlength="30"></b-input>
        </b-field>
        <b-field
          label="Password"
          v-else-if="passwordLengthOkay === 'true'"
          type="is-success"
          :message="['Password is okay']"
        >
          <b-input v-model="password" type="password" maxlength="30"></b-input>
        </b-field>

        <b-field
          type="is-danger"
          :message="['Password doesnt match', '']"
          label="Re-type Password"
          v-if="passwordMatchOkay === 'false'"
        >
          <b-input type="password" v-model="password_confirmation"></b-input>
        </b-field>
        <b-field label="Re-type Password" v-else-if="passwordMatchOkay === 'normal'">
          <b-input type="password" v-model="password_confirmation"></b-input>
        </b-field>
        <b-field
          type="is-success"
          :message="['Password matched']"
          label="Retype Password"
          v-else-if="passwordMatchOkay === 'true'"
        >
          <b-input type="password" v-model="password_confirmation"></b-input>
        </b-field>
        <b-button
          class="button is-primary has-margin-bottom-50"
          expanded
          size="is-medium"
          @click="createUser()"
        >Become a Admin User</b-button>
      </div>
    </section>
  </div>
</template>

<script>
// import moment from "moment";
import axios from "axios";
import swal from "sweetalert";

export default {
  computed: {
    // validate_email() {
    //   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   let validate_email = re.test(String(this.email).toLowerCase());
    //   if (this.activeStep == 0) {
    //     let disable_option = null;
    //     if (
    //       // this.validateEmail(this.email) = false ,
    //       this.first_name === "" ||
    //       this.last_name === "" ||
    //       this.branch === "" ||
    //       this.phone_number === "" ||
    //       this.email === "" ||
    //       this.address === "" ||
    //       this.gender === "" ||
    //       validate_email == false
    //     ) {
    //       disable_option = true;
    //     }
    //     return disable_option;
    //   }
    // },
    passwordLengthOkay() {
      let password_length_okay = "normal";
      if (this.password.length >= 8) {
        password_length_okay = "true";
      } else if (this.password.length < 8 && this.password.length != 0) {
        password_length_okay = "false";
      } else {
        password_length_okay = "normal";
      }
      return password_length_okay;
    },
    passwordMatchOkay() {
      let password_okay = "normal";
      if (
        this.password === this.password_confirmation &&
        this.password_confirmation != 0
      ) {
        password_okay = "true";
      } else if (this.password_confirmation.length < 1) {
        password_okay = "normal";
      } else {
        password_okay = "false";
      }
      return password_okay;
    }
  },
  watch: {
    passwordMatchOkay: {
      deep: true,
      handler: function(newVal) {
        this.password_okay = newVal;
      }
    },
    passwordLengthOkay: {
      deep: true,
      handler: function(newVal) {
        this.password_length_okay = newVal;
      }
    }
  },
  data() {
    return {
      isLoading: false,
      password_confirmation: "",
      password_okay: "normal",
      password_length_okay: "normal",
      password: "",
      first_name: "",
      last_name: "",
      email: "",
      isFullPage: true
    };
  },
  methods: {
    createUser: async function() {
      
      // document.getElementById("overlay").style.display = "block"
      const vm = this;
      if (
        vm.email === "" ||
        vm.first_name === "" ||
        vm.last_name === "" ||
        vm.password === ""
      ) {
        setTimeout(
          () => swal("Error!", "Fill in all specified fields", "error"),
          0
        );
        // document.getElementById("overlay").style.display = "none";
      } else {
          this.isLoading = true;
        try {
          let response = await axios.post(
            this.$baseUrl + "users/signup",
            {
              first_name: vm.first_name,
              last_name: vm.last_name,
              email: vm.email,
              password: vm.password
            },
            {}
          );
          this.isLoading= false
          setTimeout(
            () => swal("You just Registered as an Admin on Mock League", "", "success"),
            0
          );
          console.log(response);
          setTimeout(() => this.$router.push("login"), 4000);
        } catch (error) {
             this.isLoading = false
          setTimeout(() => swal("Yikes!", error.response.data.message, "error"), 1000);
          return error, console.log(error.response.data);
        }
        //   else {
        //  setTimeout(() => swal("Yikes!",error.response.data.stage_name, "error"), 1000);
        //   }
        
      }
    }
  }
};
</script>
<style lang="scss" scoped>
b-button {
  margin-left: 10px;
}
.bottom-nav {
  display: flex;
  justify-content: center;
}
.vdp-datepicker > div > input {
  width: 236px !important;
  height: 37px !important;
  border-radius: 4px !important;
}
.logo-img {
  margin-top: 10px;
}
.logo-signup {
  display: flex;
  justify-content: center;
}

.card-container-p {
  padding: 20px;
  border-radius: 5px;
}

section {
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
}

.step-content {
  align-items: center;
}
.step-items {
  width: 600px !important;
}
.step-navigation {
  display: flex !important;
  justify-content: center !important;
}
.logo {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}
</style>