<template>
  <div>
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"/>

    <div class="is-flex padding-bottom 30">
      <router-link to="/">
        <img class="logo-home" src="../assets/image2.png" alt="mock logo">
      </router-link>

      <div
        class="has-text-primary has-padding-top-80 is-size-4 is-size-5-mobile has-text-centered is-uppercase has-padding-20 has-text-weight-bold"
      >All fixtures</div>
    </div>

    <div>
      <div
        class="is-flex-tablet columns flex-column-mobile has-padding-left-40-tablet has-padding-right-20-mobile has-padding-right-40-tablet has-padding-left-20-mobile"
      >
        <div
          class="column is-three-fifths-tablet carditem has-padding-30-tablet has-padding-10-mobile"
        >
          <div class="has-text-weight-bold has-padding-bottom-10 is-uppercase is-size-6">All Matches</div>
          <div class="break-line has-background-light"></div>
          <div v-if="matches">
            <div v-for="(match, index) in matches" :key="index">
              <!-- <div class="break-line has-background-light"></div> -->
              <div class="has-margin-20 justify-space-between">
                <div class="is-flex">
                  <div class="flex-vertical has-padding-left-10">
                    <div
                      v-if="match.status === 'result'"
                      class="is-size-5 is-flex is-size-6-mobile is-uppercase has-text-primary has-text-weight-bold"
                    >{{match.home_team}} 

                       <div
                    class="score-board has-margin-right-10 has-margin-left-10"
                  >{{match.home_score}} | {{match.away_score}}</div>
                    
                    
                     {{match.away_team}}</div>



                    <div
                      v-else
                      class="is-size-5  is-flex is-size-7-mobile is-uppercase has-text-primary has-text-weight-bold"
                    >{{match.home_team}}


                       <div
                    class="fixture-board has-margin-right-10 has-margin-left-10"
                  >V</div>
                    
                    
                    
                    
                    
                     {{match.away_team}}</div>
                    <div class="is-size-6 is-size-7-mobile">by {{match.schedule}}</div>
                    <div
                      v-if="match.status === 'result'"
                      class="light-green-background status"
                    >COMPLETED</div>
                    <div v-else class="yellow-background status">AWAITING  RESULT</div>
                  </div>
                </div>
                <div class="has-text-black has-text-weight-bold has-margin-top-30 is-size-6">
                  <span @click="EditMatchModal(match._id)"><b-icon icon="pencil" type="is-info" size="is-small"></b-icon></span>|
                  <span @click="DeleteMatch(match._id)"><b-icon icon="minus" type="is-danger" size="is-small"></b-icon></span>
                </div>
              </div>
              <div class="break-line has-background-light has-margin-20"></div>
            </div>
          </div>
          <div v-else>
            <div class="has-text-centered has-padding-20">There are currently no matches</div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      :active.sync="isEditMatchModalActive"
      trap-focus
      aria-role="dialog"
      :full-screen="false"
      aria-modal
      width="500px"
    >
      <edit-match :matchId="matchId"></edit-match>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
import EditMatch from "@/components/EditMatch";
export default {
  name: "matches",
  components: { EditMatch },
  data() {
    return {
      isEditMatchModalActive: false,
      isLoading: false,
      matches: [],
      matchId: ""
    };
  },
  mounted() {
    this.getMatchesFromApi();
  },
  computed: {
    // showModalFullScreen() {
    //   const vw = Math.max(
    //     document.documentElement.clientWidth,
    //     window.innerWidth || 0
    //   );
    //   if (vw < 750) {
    //     return true;
    //   }
    // },
  },
  // filters: {
  //   moment: function(date) {
  //     return moment(date).format("MMMM Do YYYY, h:mm:ss a");
  //   },
  //   formatTransactionType: function(type) {
  //     if (type === "WALLET_WITHDRAWAL") {
  //       return "Wallet Withdrawal";
  //     } else {
  //       return "Wallet Payment";
  //     }
  //   }
  // },
  methods: {
    EditMatchModal(id) {
      this.matchId = id;
      this.isEditMatchModalActive = true;
    },
    DeleteMatch: async function(id) {
      let token = localStorage.getItem("token");
      console.log(token);
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      this.isLoading = true;
      try {
        let response = await axios.delete(
          this.$baseUrl + "matches/" + id,
          config
        );
        this.isLoading = false;
        setTimeout(
          () => swal("You just deleted a match on mock league", "", "success"),
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
    },
    // snackbar() {
    //   this.$buefy.snackbar.open(
    //     `Best team in the world`
    //   );
    // },
    getMatchesFromApi() {
      this.isLoading = true;
      axios
        .get(
          this.$baseUrl + "matches",
          { data: {} },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(response => {
          this.isLoading = false;
          console.log(response);
          this.matches = response.data.match;
        })
        .catch(error => {
          this.isLoading = false;
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
.score-board {
  background: #0e36ba;
  color: white;
  height: 20px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  border-radius: 5px;
}
.fixture-board {
  background: grey;
  color: white;
  height: 20px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  border-radius: 5px;
}
.is-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.is-large.delete,
.is-large.modal-close {
  background: black;
}
.background-adjust {
  margin-top: 5px;
  margin-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 10px;
}
.item-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.is-size-small {
  font-size: 8px;
}
.display-cursor {
  cursor: pointer;
}
.capitalize {
  text-transform: capitalize;
}
.status {
  font-size: 9px;
  padding: 5px;
  padding-right: 15px;
  padding-left: 15px;
  display: flex;
  justify-content: center;
  width: fit-content;
  border-radius: 5px;
  margin-top: 5px;
}
.status-loan {
  font-size: 7px;
  padding: 5px;
  padding-right: 15px;
  padding-left: 15px;
  display: flex;
  justify-content: center;
  width: fit-content;
  border-radius: 5px;
  margin-top: 5px;
}
.light-green-background {
  background: #e3ffe7;
}
.yellow-background {
  background: #ffff99;
}
.credit-status {
  background: #23d160;
  height: 15px;
  width: 15px;
  border-radius: 100%;
}
.completed-status {
  background: #23d160;
  height: 15px;
  width: 15px;
  border-radius: 100%;
}
.debit-status {
  background: orangered;
  height: 15px;
  width: 15px;
  border-radius: 100%;
}
.pending-status {
  background: yellow;
  height: 15px;
  width: 15px;
  border-radius: 100%;
}
.flex-vertical {
  display: flex;
  flex-direction: column;
}
.justify-space-between {
  display: flex;
  justify-content: space-between;
}
.break-line {
  height: 2px;
  // background: grey !important;
}
.cards-status {
  display: flex;
  width: 50px;
  font-size: 10px;
}
@media screen and (max-width: 700px) {
  .dashboard-grid-mobile {
    display: grid !important;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  .is-grid-mobile {
    // background-color: red;
    display: grid !important;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 2fr 1fr;
    // justify-items: center;
  }
  .width-active-actions {
    grid-column: 1/3;
    grid-row: 2/3;
  }
  .is-grid-mobile-locked {
    // background-color: red;
    display: grid !important;
    grid-template-columns: 1.5fr 1fr;
    grid-template-rows: 2fr 1fr;
    justify-items: start;
  }
}
</style>
<style lang="scss" scoped>
.secBackground {
  background: #eaecf0;
  border-radius: 6px;
  padding: 10px;
  padding-right: 20px;
  padding-left: 20px;
  color: #0d2ec7;
}
.carditem {
  border: 1px solid #b8bbc2;
  margin: 10px !important;
  background: white;
  border-radius: 5px;
}

.secButtonStyle {
  background: #eaecf0;
  color: #040c31;
  border: none;
  font-weight: bold;
  border-radius: 17px;
  padding: 5px 15px;
  cursor: pointer;
  margin-top: 10px;
}

.pryButtonStyle {
  background: #030a25;
  color: white;
  border: none;
  font-weight: bold;
  padding: 5px 25px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.9rem;
  box-shadow: 0px 8px 10px rgba(0, 59, 186, 0.2);
}
.tooltipButton {
  background: none;
  border: none;
}
.tooltipClass {
  height: 15px !important;
  margin-bottom: 10px;
}

@media screen and (max-width: 700px) {
  .pryButtonStyle {
    width: 110px !important;
    padding: 5px 5px !important;
    font-size: 0.8em !important;
  }
  .secButtonStyle {
    font-size: 0.7em !important;
  }
}
</style>
