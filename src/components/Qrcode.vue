<template v-if="is_start">
  <v-card-text>
    <v-fade-transition leave-absolute>
      <template v-if="!is_submitted">
        <v-form>
          <qrcode-stream 
            @decode="onDecode"
          ></qrcode-stream>
        </v-form>
      </template>
    </v-fade-transition>
    <v-fade-transition leave-absolute>
      <template v-if="is_submitted">
        <v-card-text>
          <v-form>
            <v-row>
              <span style="padding-left:8px">E-ID is successfully registered, are you goining to register E-Vote as well?</span>
            </v-row>
            <v-select
              v-model="living_place"
              :items="living_options"
              menu-props="auto"
              label="Living District"
              hide-details
              prepend-icon="map"
              single-line
            ></v-select>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="goBack" color="primary">Yes</v-btn>
            <v-btn @click="goBack" color="secondnary">Skip & Finish</v-btn>
          </v-card-actions>
        </v-card-text>
      </template>
    </v-fade-transition>
    
  </v-card-text>
  
</template>
<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
import axios from 'axios'
export default {
  props: {
    goBack: Function,
    registration_endpoint: String,
    birthday: String,
    name: String,
    itemCode: Array,
    issue_date: String,
    is_fake: Boolean
  },
  data: () => ({
    is_submitted: false,
    living_place: null,
    living_options: [
      "Central and Western",
      "Eastern",
      "Southern",
      "Wan Chai",
      "Sham Shui Po",
      "Kowloon City",
      "Kwun Tong",
      "Wong Tai Sin",
      "Yau Tsim Mong",
      "Islands",
      "Kwai Tsing",
      "North",
      "Sai Kung",
      "Sha Tin",
      "Tai Po",
      "Tsuen Wan",
      "Tuen Mun",
      "Yuen Long",
      "Oversea"
    ] 
  }),
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
  methods: {
    onDecode (decodedString) {
      if (this.is_fake){
        console.log(decodedString)
        setTimeout(() => {
          this.is_submitted = true
        }, 2000)
      } else {
        axios.post(this.registration_endpoint, {
          wallet_address: decodedString,
          dob: this.birthday,
          name: this.name,
          hkid: this.itemCode.join(''),
          issue_date: this.issue_date
        }).then(response => {
            this.is_loading = false
            this.is_success = true
        })
      }
    },
    onDecodeFake (decodedString) {
      
    }
  }
}
</script>
