<template>

<!-- --------------------------------- -->
<!-- MANAGE PAYMENTS HARDCODED -->
<!-- ---------------------------------- -->

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

    </div>


    <v-container fluid>
      <v-row justify="center">
    <!-- PAYMENT REQUEST INFO from UI-->
        <v-card
              class="mx-auto"
              max-width="344"
  
              color="blue lighten-4" 
              elevation="20" 
              outlined
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-h4 mb-4">
                    Maine Seafood
                  </div>
                
                  <v-list-item-title class="text-h6
                  mb-2">
                    PAYMENT ID: {{ paymentInformationId }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-h6 mb-1">
                    Amount (USD): {{ amount }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-h6 mb-1 ">
                    Status: {{ status }}
                  </v-list-item-subtitle>
                </v-list-item-content>
          
                <!-- <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                ></v-list-item-avatar> -->
              </v-list-item>
          
              <v-card-actions>
                <v-btn color="green" v-on:click="makePayment"> PAY NOW </v-btn>
                <v-btn color="yellow"> PAY LATER</v-btn>
                <v-btn color="red"> DECLINE </v-btn>
              </v-card-actions>
        </v-card>

      <!-- PAYMENT REQUEST INFO HC1-->
        <v-card
              class="mx-auto"
              max-width="344"
  
              color="blue lighten-4" 
              elevation="20" 
              outlined
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-h4 mb-4">
                    Ted's Shrimp
                  </div>
                
                  <v-list-item-title class="text-h6
                  mb-2">
                    PAYMENT ID: 8439695737802
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-h6 mb-1">
                    Amount (USD): 927.88
                    </v-list-item-subtitle>
                </v-list-item-content>
          
                <!-- <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                ></v-list-item-avatar> -->
              </v-list-item>
          
              <v-card-actions>
                <v-btn color="green" v-on:click="makePayment"> PAY NOW </v-btn>
                <v-btn color="yellow"> PAY LATER</v-btn>
                <v-btn color="red"> DECLINE </v-btn>
              </v-card-actions>
        </v-card>

        <!-- PAYMENT REQUEST INFO HC2-->
        <v-card
              class="mx-auto"
              max-width="344"
  
              color="blue lighten-4" 
              elevation="20" 
              outlined
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-h4 mb-4">
                    Bubba's Vegetables
                  </div>
                
                  <v-list-item-title class="text-h6
                  mb-3">
                    PAYMENT ID: 3310015986028
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-h6 mb-1">
                    Amount (USD): 1,236.51
                    </v-list-item-subtitle>
                </v-list-item-content>
          
                <!-- <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                ></v-list-item-avatar> -->
              </v-list-item>
          
              <v-card-actions>
                <v-btn color="green" v-on:click="makePayment"> PAY NOW </v-btn>
                <v-btn color="yellow"> PAY LATER</v-btn>
                <v-btn color="red"> DECLINE </v-btn>
              </v-card-actions>
        </v-card>
      </v-row>
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
      paymentInformationId: localStorage.transactionId,
      amount: Number(localStorage.transactionAmt).toFixed(2),
      status: "unpaid"
    };
  },
  async created() {
    console.log("Opening Manage Payment Requests.....");
    const response = await axios.get("/api/b2b/login");
    const curToken = response.data.token;
    this.token = curToken;
    // console.log(this.token);
    return (this.executionDate = moment().format("YYYY-MM-DD"));
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


    makePayment() {
      console.log(`Payment ${this.paymentInformationId} of ${this.amount} is processing`);
      this.status = "paid";
      var makePayment = {
        token: this.token,
        paymentId: this.paymentInformationId,
        amt: this.amount,
        date: this.today
      }
      console.log(makePayment);
      axios
        .post("/api/make-payment", makePayment, {
          headers: { "Content-Type": "application/json" },
        })

        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
