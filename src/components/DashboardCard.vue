<template>
  <router-link
    :to="{name:cardLink}"
    class="has-padding-30 contribution-box info-box is-5-tablet column is-full-mobile has-background-blue2"
  >
    <div class="is-uppercase is-size-7 has-text-light">Admin</div>
    <div class="is-size-4 has-text-success has-text-weight-bold">
     {{cardText}}
    </div>
  </router-link>
</template>

<script>
export default {
  name: "dashboard-card",
  props: {
    cardText: String,
    cardLink: String
  }
};
</script>

<style lang="scss" scoped>
.has-background-blue1 {
  background: #002e7e;
}
.has-background-blue2 {
  background: #182a48;
}
.has-background-blue3 {
  background: #0b1b54;
}
.contribution-box {
  border-radius: 8px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.13);
}
.contribution-button {
  border-radius: 25px;
  font-size: 0.8em;
  background: white;
  padding: 5px 10px;
}
</style>