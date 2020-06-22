<template>
  <div style="overflow-y:hidden">
    <div class="is-flex full-height">
      <header class="has-padding-20">
        <div class="container is-flex header is-size-6">
          <div class="umc-logo is-flex">
            <router-link to="/">
              <img class="logo-home" src="../assets/image2.png" alt="mock logo">
            </router-link>
            <div class="nav-menu has-margin-left-40">
              <ul class="is-flex">
                <li class>
                  <router-link to="teams" class="has-text-black nav-link-item">Teams</router-link>
                </li>
                <li class>
                  <router-link to="fixtures" class="has-text-black nav-link-item">Matches</router-link>
                </li>
              </ul>
            </div>
          </div>

          <div class="is-flex action-section">
            <router-link to="login" class="has-text-primary nav-link-item">Login</router-link>
            <router-link
              to="sign-up"
              class="signup-btn has-margin-left-10 has-text-weight-bold has-padding-left-20 has-padding-right-20 nav-link-item"
            >Create an account</router-link>
          </div>
          <div @click="isActive = !isActive" class="is-hidden-tablet">
            <b-icon icon="menu" class="m-menu"></b-icon>
          </div>
        </div>
      </header>
      <div class="nav-menu-mobile" v-bind:class="{ active: isActive }">
        <div class="m-top-section">
          <router-link to="/">
            <img class="logo-home" src="../assets/image2.png" alt="mock league logo">
          </router-link>
          <div @click="isActive = !isActive">
            <b-icon icon="close" class="m-menu"></b-icon>
          </div>
        </div>
        <div class="mobile-nav-menu">
          <ul class="is-flex">
            <li class>
                  <router-link to="teams" class="has-text-white is-size-5">All Teams</router-link>
            </li>
            <li class>
              <router-link to="fixtures" class="has-text-white is-size-5">Matches</router-link>
            </li>
            <li class>
              <router-link to="login" class="has-text-white is-size-5">Login</router-link>
            </li>
            <li class>
              <router-link to="sign-up" class="signup-btn has-margin-left-10">Create an Admin account</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="hero-section container">
        <div class="columns is-vcentered reverse-columns has-margin-top-50 has-margin-top-5-mobile">
          <div class="column is-half has-text-center-mobile">
            <div class>
              <div class="main-header is-size-1 is-size-3-mobile has-text-centered-mobile">
                <div class="is-block">
                  Damisa's
                  <span class="has-text-primary">MOCK</span>
                  League
                </div>
              </div>
              <div
                class="has-margin-top-20 has-margin-bottom-20 is-size-6 has-text-centered-mobile"
              >
                <span
                  class="is-block has-max-width-400"
                > helping you simulate your team and matches with ease.</span>
                <p class="has-margin-top-20">Try to sumulate team and/or matches now</p>
              </div>
              <div class="is-flex create-account-w">
                <router-link
                  to="sign-up"
                  class="signup-btn has-text-weight-bold has-padding-left-20 has-padding-right-20 nav-link-item"
                >Create an Admin account</router-link>
              </div>

              <div class="has-margin-bottom-10 has-margin-top-10 has-text-centered-mobile">
                Already have an account?
                <router-link to="login" class="sign-in has-text-weight-bold has-text-primary">Log in</router-link>
              </div>
            </div>
          </div>
          <div class="column is-half has-padding-left-40-mobile has-padding-right-40-mobile">
            <figure class="is-fullwidth">
              <img src="../assets/image1.png" alt="mock league landing page image">
            </figure>
          </div>
        </div>
      </div>
    </div>

    <section class="our-platform">
      <div class="container our-platform-inner is-flex has-padding-bottom-130 has-padding-top-50">
        <div class="has-text-white has-text-centered-mobile has-margin-30">
          <div class="main-header is-size-3 is-size-4-mobile has-padding-10">Your team, Your Scores, Your choice!</div>
        </div>
        <div class="columns is-8 is-variable is-flex-mobile flex-direction-column">
          <div class="column is-half is-four-fifths-mobile">
            <div class="has-padding-20 has-text-centered box has-padding-bottom-50">
              <div v-if="matches">
                <h2  class="is-size-4 has-text-weight-bold has-padding-top-10">Latest Results</h2>
                <div 
                  v-for="(match, index) in getResults"
                  :key="index"
                  class="is-flex has-padding-top-20 justify-center align-items-center"
                >
                  <b-field class="is-size-7-mobile"   :label="match.home_team"></b-field>
                  <div
                    class="score-board has-margin-right-10 has-margin-left-10"
                  >{{match.home_score}} | {{match.away_score}}</div>
                  <b-field class="is-size-7-mobile" :label="match.away_team"></b-field>
                </div>
               
                <div class="has-padding-top-20">
                  <router-link
                    to="fixtures"
                    class="has-padding-top-10 is-size-7-mobile"
                  >view all results</router-link>
                </div>
              </div>
              <div v-else class="no-matches">
                  Currently no available result
              </div>
            </div>
          </div>

          <div class="column is-half is-four-fifths-mobile">
            <div class="has-padding-20 has-text-centered box has-padding-bottom-50">
              <div class>
                <h2 class="is-size-4 has-text-weight-bold has-padding-top-10">Upcoming Fixtures</h2>
                <div
                  v-for="(match, index) in getFixtures"
                  :key="index"
                  class="is-flex has-padding-top-20 justify-center align-items-center"
                >
                  <b-field class="is-size-7-mobile" :label="match.home_team"></b-field>
                  <div class="fixture-board has-margin-right-10 has-margin-left-10 has-padding-5-mobile">Vs</div>
                  <b-field class="is-size-7-mobile" :label="match.away_team"></b-field>
                 
                </div>
                
                <div class="has-padding-top-20">
                  <router-link
                    to="sign-up"
                    class=" is-size-7-mobile has-padding-top-10"
                  >Create your own mock league fixtures</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class>
      <div class="container">
        <div class="columns has-text-centered has-margin-20">
          <div class="column is-full">
            <h2 class="main-header is-size-3 is-size-5-mobile">Your League</h2>
          </div>
        </div>
        <div class="columns has-text-centered is-centered has-margin-20">
          <div class="column">
            <figure class="is-fullwidth">
              <img
                class
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTLsl9qUmLO9mSESEVc58_wJGmxMe2jABIl7P1ojDkrGHXNTtuP&usqp=CAU"
                alt="Start"
              >
            </figure>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import CompanyLogo from "@/assets/logo.png";
const axios = require("axios");
var moment = require("moment");

export default {
  name: "HomePage",
  methods: {
    toggleMenu: () => {
      alert();
      this.isActive = true;
    }
  },
  data() {
    return {
      //   CompanyLogo: CompanyLogo,
      isActive: false,
      matches: []
    };
  },
  computed: {
    getResults() {
      const results = this.matches.filter(result => result.status === "result");
      return results;
    },
    getFixtures() {
      const fixtures = this.matches.filter(
        fixture => fixture.status === "fixture"
      );
      return fixtures;
    }
  },
  mounted() {
    // let newdate= "2020-02-26 14:43:45"
    let fodate = moment().format("MMMM Do YYYY, h:mm:ss a");
    // let newdate= "2020-02-26 14:43:45"
    console.log(fodate);
    // const vm = this
    axios
      .get(
        this.$baseUrl + "matches",
        { data: {} },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(response => {
        this.matches = response.data.match;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style lang="scss" scoped>
.field:not(:last-child) {
  margin-bottom: 0rem !important;
}
.align-items-center {
  align-items: center;
}
.score-board {
  background: #0e36ba;
  color: white;
  height: 30px;
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  border-radius: 5px;
}

.fixture-board {
  background: green;
  border: 0.2px solid grey;
  // color: white;
  height: 30px;
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  border-radius: 5px;
}
.m-menu {
  display: none;
}
.nav-link-item {
  font-family: "Pt Sans";
}
.nav-menu-mobile {
  height: 0vh;
  overflow: hidden;
  transition: 0.5s;
}
.signup-btn {
  background-color: #e3edff;
  color: #0e36ba;
  padding: 5px 10px;
  border-radius: 5px;
  transition: 0.5s;
  font-family: "Pt Sans";

  &:hover {
    background-color: #c0d3f5;
  }
}
.main-header {
  font-family: "Abril Fatface";
}
.full-height {
  flex-direction: column;
  .header {
    justify-content: space-between;
    align-items: center;

    img {
      max-width: 40px;
    }

    ul {
      li {
        padding: 10px 20px;
      }
    }
    .action-section {
      justify-content: center;
      align-items: center;
    }
  }
  .hero-section {
    flex-grow: 1;
  }
}

.our-platform,
.testimonial {
  background-color: #3352ff;

  .our-platform-inner {
    justify-content: center;
    flex-direction: column;
    align-items: center;

    img {
      width: 90%;
    }

    h2 {
      color: #fc9b00;
    }
  }
}
.steps-container {
  .the-steps {
    display: flex;

    .steps-i {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 10%;
      span {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid #3352ff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "Abril Fatface";
      }

      div {
        width: 2px;
        background-color: #3352ff;
        flex-grow: 1;
      }
    }

    .steps-content {
      width: 90%;
    }
  }
  .last-step {
    opacity: 0;
  }
}
@media screen and (max-width: 900px) {
  .create-account-w {
    justify-content: center;
  }
  .flex-direction-column {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .reverse-columns {
    flex-direction: column-reverse;
    display: flex;
  }
}

@media screen and (max-width: 500px) {
  .steps-container {
    .the-steps {
      .steps-i {
        span {
          width: 40px;
          height: 40px;
        }
      }
    }
  }

  .nav-menu,
  .action-section {
    display: none !important;
  }
  .m-menu {
    display: block;
  }

  .full-height {
    .header {
      align-items: flex-start;
    }
    .hero-section {
      flex-grow: 1;
    }
  }
}

.active {
  height: 100vh;
}

.nav-menu-mobile {
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 1000;
  width: 100vw;
  background-color: blue;
  flex-direction: column;

  .m-top-section {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: white;

    img {
      width: 20px;
    }
    .m-menu {
      margin-top: -5px;
    }
  }

  .mobile-nav-menu {
    flex-grow: 1;
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    ul {
      flex-direction: column;

      li {
        text-align: center;
        padding: 10px;
      }
    }
  }
}

.circcle {
  width: 300px;
  min-height: 300px;
  border-radius: 50%;
  background-color: white;
}
</style>
