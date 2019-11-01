<template v-if="is_start">
  <v-card-text>
    <v-fade-transition leave-absolute>
      <template v-if="!is_submitted">
        <v-form>
          <qrcode-stream @decode="onDecode"></qrcode-stream>
        </v-form>
      </template>
    </v-fade-transition>
    <v-fade-transition leave-absolute>
      <template v-if="is_submitted">
        <v-form>
          <v-row>
            <span style="padding-left:8px">Registration Completed.</span>
          </v-row>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="goBack" color="primary">Back</v-btn>
        </v-card-actions>
      </template>
    </v-fade-transition>
    
  </v-card-text>
  
</template>
<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
export default {
  props: {
    goBack: Function,
  },
  data: {
    is_submitted: false
  },
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
  methods: {
    onDecode (decodedString) {
      axios.post('/submit_walletID', {
        wallet_id: decodedString
      }).then(response => {
          this.is_loading = false
          this.is_success = true
      })
    }
  }
}
</script>
