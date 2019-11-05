<template v-if="is_start">
  <v-card-text>
    <v-fade-transition leave-absolute>
      <template v-if="!is_submitted">
        <v-form>
          <qrcode-stream @decode="is_fake ? onDecodeFake : onDecode"></qrcode-stream>
        </v-form>
      </template>
    </v-fade-transition>
    <v-fade-transition leave-absolute>
      <template v-if="is_submitted">
        <v-card-text>
          <v-form>
            <v-row>
              <span style="padding-left:8px">Registration Completed.</span>
            </v-row>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="goBack" color="primary">Back</v-btn>
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
    is_submitted: false
  }),
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
  methods: {
    onDecode (decodedString) {
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
    },
    onDecodeFake (decodedString) {
      console.log(decodedString)
      setTimeout(() => {
        this.is_submitted = true
      }, 2000)
    }
  }
}
</script>
