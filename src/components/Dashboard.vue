<template>
  <div class="has-margin-bottom-50">
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>

        <div class="is-flex padding-bottom 30">
      <router-link to="/">
        <img class="logo-home" src="../assets/image2.png" alt="mock logo">
      </router-link>

      <div
        class="has-text-primary has-padding-top-80 is-size-4 is-size-5-mobile has-text-centered is-uppercase has-padding-20 has-text-weight-bold"
      >Admin Dashboard</div>
    </div>
    <!-- <search> </search> -->
    <div class="has-padding-20">
      <div class="is-flex wrap">
        <DashboardCard
          cardText="Create a Team"
          cardLink="create-team"
          class="has-margin-5"
        ></DashboardCard>
        <DashboardCard
          cardText="Create a Fixture"
          cardLink="create-fixture"
          class="has-margin-5"
        ></DashboardCard>
        <!-- <DashboardCard
          cardText="Update Fixture/Create a Result"
          cardLink="create-result"
          class="has-margin-5"
        ></DashboardCard> -->
        <DashboardCard
          cardText="View all Fixtures and Results"
          cardLink="fixtures"
          class="has-margin-5"
        ></DashboardCard>
         <DashboardCard
          cardText="View all Teams"
          cardLink="teams"
          class="has-margin-5"
        ></DashboardCard>
      </div>
      
    </div>
  </div>
</template>

<script>
import DashboardCard from "@/components/DashboardCard";
// import LoginCard from "@/components/LoginCard.vue"
export default {
  name: "dashboard",
  components: { DashboardCard },

  data() {
    return {
      isLoading: false
    };
  },

  mounted() {},

//   computed: {
//     ...mapGetters({
//       clientStatistics: "getClientStatistics",
//     })
//   },

//   methods: {
//     ...mapMutations({
//     })
//   }
};
</script>
