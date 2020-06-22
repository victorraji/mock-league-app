<template>
  <div class="wrapper is-full-height has-background-custom">
    <div class="columns is-full-height is-vcentered is-centered has-padding-5-mobile is-gapless">
      <div class="column is-full-height is-full-mobile flex-column align-items-center has-padding-top-40">
        <login-card/>
      </div>
    </div>
  </div>
</template>

<script>
import LoginCard from "@/components/LoginCard.vue"

export default {
  name: "LoginPage",
  components: { LoginCard },
  methods: {}
};
</script>

<style lang="scss">
html,
body {
  height: 100% !important;
}
.has-background-custom {
  background: #EDF2F7  !important;
}

</style>

