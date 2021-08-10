<template>
  <div id="app">
    <v-app-bar app color="pink darken-2">
      <div class="d-flex align-center">
        <h1>LOBSTER SHACK</h1>
      </div>

      <!-- ROUTING BUTTONS INDEX -->
      <v-spacer></v-spacer>

      <v-btn v-on:click="homePage()" color="white" text rounded class="my-2">
        Home
      </v-btn>

      <v-btn color="blue" text rounded class="my-2"> Manage Payments </v-btn>

      <v-btn
        v-on:click="requestPayment()"
        color="green"
        text
        rounded
        class="my-2"
      >
        Request Payment
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <!-- END BUTTONS -->
    </v-app-bar>

    <!-- LOBSTER SHACK IMAGE -->
    <v-img
      lazy-src="../images/lobsters.jpeg"
      max-height="300"
      src="../images/lobsters.jpeg"
    ></v-img>
    <!-- LOBSTER SHACK IMAGE END -->

    <div class="home">
      <h1>{{ message }}</h1>
      <v-btn color="blue" v-on:click="updatePaymentRequests"> UPDATE </v-btn>
      <!-- <p>{{ this.paymentRequests }}</p> -->
      <!-- <p>{{ this.paymentInfo.data[0].messageId }}</p> -->
    </div>

    <!-- Payment Requests (New-Aug21) -->
    <v-container fluid>
      <v-row justify="center">
        <v-col
          v-for="paymentRequest in paymentRequests"
          :key="
            paymentRequest.paymentIdentification
              .paymentInformationIdentification
          "
          cols="auto"
        >
          <v-card color="blue lighten-4" elevation="20" outlined>
            <v-card-title
              :name="creditor"
              :value="
                `${paymentRequest.creditorDebtorInformation.creditorIdentification.creditorName}`
              "
            >
              {{
                paymentRequest.creditorDebtorInformation.creditorIdentification
                  .creditorName
              }}
            </v-card-title>
            <!-- <v-text-area
              name="creditor"
              :value="
                `${paymentRequest.creditorDebtorInformation.creditorIdentification.creditorName}`
              "
            >
            </v-text-area> -->
            <!-- <v-card-text
              name="creditor"
              label="Creditor"
              :value="
                `${paymentRequest.creditorDebtorInformation.creditorIdentification.creditorName}`
              "
            >
              <h4>
                Reference:
                {{
                  paymentRequest.paymentIdentification
                    .paymentInformationIdentification
                }}

                <br />
                Amount: $
                {{ paymentRequest.settlementAmount.amount }}
              </h4>
            </v-card-text> -->
            <v-card-actions>
              <v-btn color="green" v-on:click="makePayment"> PAY NOW </v-btn>
              <v-btn color="yellow"> PAY LATER</v-btn>
              <v-btn color="red"> DECLINE </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- PAYMENT REQUEST INFO-->
    <v-container fluid>
      <!-- <v-row align="center" justify="center"> -->
      <!-- <v-col
          class="d-flex"
          cols="4"
          sm="3">

          
          <v-textarea
            outlined
            rows="1"
            name="paymentInformationId"
            label="Creditor"
            :value="
              `${paymentRequest.creditorDebtorInformation.creditorIdentification.creditorName}`
            "
            readonly
          ></v-textarea>
          <v-textarea
            outlined
            rows="1"
            name="paymentInformationId"
            label="Creditor"
            :value="`${paymentRequest.settlementAmount.amount}`"
            readonly
          ></v-textarea>
        </v-col> -->

      <!-- Creditor Name -- from GPP -->
      <!-- <v-col class="d-flex" cols="4" sm="3">
          <v-text-field
            v-model="creditor"
            label="Payee Name"
            outlined
          ></v-text-field>
        </v-col> -->

      <!-- Amount -- suppplied by GPP-->
      <!-- <v-col class="d-flex" cols="4" sm="3">
          <v-text-field
            v-model="amount"
            label="Amount (USD)"
            outlined
          ></v-text-field>
        </v-col> -->

      <!-- ACCEPT / DECLINE BUTTONS -->
      <!-- <v-col class="d-flex" cols="5" sm="2">
          <v-btn depressed color="green"> MAKE PAYMENT </v-btn>
          <v-btn depressed color="red"> DECLINE </v-btn>
        </v-col> -->
      <!-- accept / decline end -->
      <!-- </v-row> -->
    </v-container>
  </div>
</template>

<style></style>

<script>
import moment from "moment";
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Manage Received Payment Requests!",
      today: moment().format("YYYY-MM-DD"),
      // paymentInformationId: Math.floor(Math.random() * 100000000000),
      // creditor: "",
      // amount: "",
      debtorId: "1919191919",
      paymentInfo: [],
      paymentRequests: {},
      creditor: "NA",
      paymentInformationId: "",
      amount: "",
    };
  },
  async created() {
    console.log("Opening Manage Payment Requests.....");
    try {
      const response = await axios.get("/api/b2b/login");
      const curToken = response.data.token;
      this.token = curToken;
      if (this.token) {
        const myUrl = "/api/transaction-search-debtorID?token=" + this.token;
        this.paymentInfo = await axios.get(myUrl);
        this.paymentRequests = this.paymentInfo.data.items;

        console.log(this.paymentRequests);
        console.log("payment Requests retrieved....");
      }
      // console.log(this.token);
    } catch (err) {
      console.log(err);
    }
  },

  methods: {
    homePage() {
      this.$router.push({ path: "/" });
      console.log("home");
    },
    requestPayment() {
      this.$router.push({ path: "RequestPayment" });
      console.log("RequestPayment");
    },

    async updatePaymentRequests() {
      console.log("updating");
      if (this.token) {
        const myUrl = "/api/transaction-search-debtorID?token=" + this.token;
        var paymentInfo = await axios.get(myUrl);
        var paymentRequests = paymentInfo.data.items;

        console.log(paymentRequests);
        console.log("Updated....");
      }
    },

    makePayment() {
      console.log(this.creditor);
    },
  },
};
</script>
