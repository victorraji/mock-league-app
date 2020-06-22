<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
//Import Bulma's core
@import "~bulma/sass/utilities/_all";

@import url("https://fonts.googleapis.com/css?family=Lato");
@import url('https://fonts.googleapis.com/css?family=Abril+Fatface&display=swap');
@import url('https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700,700i&display=swap');

@import "~bulma";
@import "~buefy/src/scss/buefy";
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 14px;
}

#app {
  width: 100%;
  height: 100%;
  min-height: 100%;
  font-family: "Lato", helvetica;
}
//custom styles
.column {
  padding: 0.5rem;
}

.has-min-width-900 {
  min-width: 900px;
}

.input {
  background-color: white !important;
  box-shadow: none !important;
}

.input {
  height: 2.65em !important;
}
.input[type="text"] {
  font-size: inherit !important;
}

.label {
  color: darkslategrey !important;
  text-transform: uppercase;
  font-weight: bold !important;
  font-size: 12px !important;
}

.steps .step-item .step-details .step-title {
  font-size: 1em !important;
}

.has-letter-spacing-3 {
  letter-spacing: 3px !important;
}

.has-border-bottom {
  border-bottom: 1px dashed rgb(218, 218, 218) !important;
}

.card {
  box-shadow: none !important;
}

.has-max-width-1500 {
  max-width: 1500px !important;
}

.has-margin-0-auto {
  margin: 0 auto !important;
}

.table td,
.table th {
  vertical-align: middle;
  font-size: 0.8em;
  padding: 1.5em 1em;
  border-color: #f6faff;
}

.b-table .table th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8em;
  background: white;
  border-bottom: 1px solid #152d9d;
}

.b-table .table {
  border: none;
  border-radius: 5px;
}.has-max-width-500{
  max-width: 500px !important;
}
.is-black {
  color: black;
}
.b-steps .steps .step-items .step-item .step-link {
    color: black;
}
.b-steps{
  min-width: 300px;
    max-width: 550px;
    flex-grow: 1;
}
.steps{
  width: 100%;
}
.step-items{
flex-grow: 1;
}
.is-search {
  height: 2.65em;
  min-width: 150px;
  background-color: lightblue;
}

.is-primary {
  height: 2.65em;
}

.has-width-100-percent {
  width: 100%;
}

.button {
  height: 2.65em;
  min-width: 100px;
}

.has-border-right {
  border-right: 1px solid lightgrey;
}

.has-border-bottom-solid {
  border-bottom: 1px solid rgba(256, 256, 256, 0.1);
}

.has-flex-one {
  flex: 1;
}

.has-background-green {
  background: green !important;
}

.has-background-yellow {
  background: yellow !important;
  color: black !important;
}

.has-background-red {
  background: rgb(255, 94, 0) !important;
}

.is-white {
  color: white;
}

.has-background-black {
  background: black !important;
}

.has-text-align-center {
  text-align: center;
}
.action-item {
  display: flex;
  align-items: center;
}

.action-text {
  padding-left: 0.6em;
  font-weight: bold;
  font-size: 0.7em;
}

.has-width-500 {
  width: 500px;
}

.has-max-width-400{
  max-width: 400px !important;
}

.has-flex-grow-1 {
  flex-grow: 1;
}

button span {
  padding-left: 0 !important;
}
body {
  font-size: 15px;
}

.has-default-logo--style {
  height: 55px;
  padding-left: 25px;
}
.control.has-icons-right .icon.is-right {
  right: 1%;
  top: 6%;
  .mdi-eye {
    color: #a0aec0;
  }
}
.tab-content {
  padding: 0 !important;
}
@media screen and (max-width: 1300px) {
  .table {
    font-size: 13px;
  }
}

// This block of styles allows modals with tall content to scroll
html,
body,
#app,
#app > div,
.animation-content,
.animation-content > div,
.modal-card,
.modal-card-body {
  overflow: auto;
}
</style>

<script>
// import { resetLocalStorage } from "@/store/index";
// import { mapState, mapMutations as mapRootMutations } from "vuex";

// import { createNamespacedHelpers } from "vuex";
// const { mapMutations } = createNamespacedHelpers("client");

// import {
//   ROOT_MUTATION_TYPES,
//   SHIPPER_MUTATION_TYPES
// } from "@/store/mutation-types";

export default {
  name: "App",

  methods: {
    // ...mapRootMutations({
    //   resetRootState: ROOT_MUTATION_TYPES.RESET_STATE
    // }),

    // logout() {
    //   resetLocalStorage();
    //   this.resetRootState();

    //   this.$router.push({ name: "login", params: { appIsIdle: true } });
    // }
  },

  /**
   * Hook fn called when the user has been idle for 5 minutes (injected by the vue-idle plugin)
   */
  // onIdle() {
  //   if (this.$route.meta.requiresAuth) {
  //     this.logout();
  //   }
  // },

  /**
   * Hook fn called when the user has becomes active after being idle (injected by the vue-idle plugin)
   */
  onActive() {}
};
</script>

