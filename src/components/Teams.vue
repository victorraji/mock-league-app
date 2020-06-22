<template>
  <div>
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"/>

    <div class="is-flex padding-bottom 30">
      <router-link to="/">
        <img class="logo-home" src="../assets/image2.png" alt="mock logo">
      </router-link>

      <div
        class="has-text-primary has-padding-top-80 is-size-4 is-size-5-mobile has-text-centered is-uppercase has-padding-20 has-text-weight-bold"
      >All teams</div>
    </div>

    <div>
      <div
        class="is-flex-tablet columns flex-column-mobile has-padding-left-40-tablet has-padding-right-20-mobile has-padding-right-40-tablet has-padding-left-20-mobile"
      >
        <div
          class="column is-three-fifths-tablet carditem has-padding-30-tablet has-padding-10-mobile"
        >
          <div class="has-text-weight-bold is-uppercase is-size-6">All Teams</div>
          <div class="break-line has-background-light"></div>
          <div v-if="teams">
            <div v-for="(team, index) in teams" :key="index">
              <!-- <div class="break-line has-background-light"></div> -->
              <div class="has-margin-20 justify-space-between">
                <div class="is-flex">
                  <div class="credit-status has-margin-top-10"></div>
                  <div class="flex-vertical has-padding-left-10">
                    <div
                      class="is-size-5 is-size-6-mobile is-uppercase has-text-black has-text-weight-bold"
                    >{{team.name}}</div>
                    <div class="is-size-6 is-size-7-mobile">Managed by {{team.manager}}</div>
                    <!-- <div class="light-green-background status">COMPLETED</div> -->
                  </div>
                </div>
                <div class="has-text-black has-text-weight-bold is-size-6">
                  <span @click="EditTeamModal(team._id)">
                    <b-icon icon="pencil" type="is-info" size="is-small"></b-icon>
                  </span>|
                  <span @click="DeleteTeam(team._id)">
                    <b-icon icon="minus" type="is-danger" size="is-small"></b-icon>
                  </span>
                </div>
              </div>
              <div class="break-line has-background-light has-margin-20"></div>
            </div>
          </div>
          <div v-else>
            <div class="has-text-centered has-padding-20">There are currently no teams</div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      :active.sync="isEditTeamModalActive"
      trap-focus
      aria-role="dialog"
      :full-screen="false"
      aria-modal
      width="500px"
    >
      <edit-team :teamId="teamId"></edit-team>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
import EditTeam from "@/components/EditTeam";
export default {
  name: "teams",
  components: { EditTeam },
  data() {
    return {
      isEditTeamModalActive: false,
      isLoading: false,
      teams: [],
      teamId: ""
    };
  },
  mounted() {
    this.getTeamsFromApi();
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
    EditTeamModal(id) {
      this.teamId = id;
      this.isEditTeamModalActive = true;
    },
    DeleteTeam: async function(id) {
      let token = localStorage.getItem("token");
      console.log(token);
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      this.isLoading = true;
      try {
        let response = await axios.delete(
          this.$baseUrl + "teams/" + id,
          config
        );
        this.isLoading = false;
        setTimeout(
          () => swal("You just deleted a team on mock league", "", "success"),
          0
        );
        console.log(response);
        setTimeout(() => this.$router.go("teams"), 1000);
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
    }
  }
};
</script>

<style lang="scss">
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
