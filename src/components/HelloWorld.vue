<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12" height="480px">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Information form</v-toolbar-title>
              </v-toolbar>
              <v-fade-transition leave-absolute>
                <template v-if="is_loading">
                  <v-card-text style="width:100%">
                    <v-form>
                      <v-progress-circular
                        :size="250"
                        :width="20"
                        color="blue-grey"
                        style="margin:30px auto 0 auto;display:block;"
                        indeterminate
                      ></v-progress-circular>
                    </v-form>
                  </v-card-text>
                </template>
              </v-fade-transition>
              <v-fade-transition leave-absolute>
                <template v-if="is_success">
                  <v-card-text style="width:100%">
                    <v-form>
                      <v-progress-circular
                        :size="250"
                        :width="20"
                        :value="100"
                        color="green"
                        style="margin:30px auto 0 auto;display:block;"
                      ></v-progress-circular>
                    </v-form>
                  </v-card-text>
                </template>
              </v-fade-transition>
              <v-fade-transition leave-absolute>
                <template v-if="is_fail">
                  <v-card-text style="width:100%">
                    <v-icon 
                      large
                      color="red darken-1"
                      style="margin:30px 50px;display:block;font-size:250px;"
                    >
                      report_problem
                    </v-icon>
                    <v-row>
                      <span style="padding-left:8px">Registration Fail.</span>
                    </v-row>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click="goBack" color="primary">Back</v-btn>
                    </v-card-actions>
                  </v-card-text>
                </template>
              </v-fade-transition>
              <v-fade-transition leave-absolute>
                <template v-if="is_start">
                  <v-card-text>
                    <v-form>
                      <v-text-field
                        v-model="birthday"
                        label="Brithday"
                        key="birthDay"
                        persistent-hint
                        prepend-icon="event"
                        type="date"
                      ></v-text-field>
                      <v-text-field
                        v-model="name"
                        label="Name"
                        name="name"
                        prepend-icon="account_box"
                        type="text"
                      ></v-text-field>
                      <v-text-field
                        v-model="issue_date"
                        key="issueDay"
                        label="HKID Issue Date"
                        persistent-hint
                        prepend-icon="event"
                        type="date"
                      ></v-text-field>
                      <v-row style="margin:0">
                        <v-icon>account_balance</v-icon>
                        <span style="padding-left:8px">First 4-digit of HKID</span>
                      </v-row>
                      <v-row
                        style="margin:0;padding:0 20% 0 20%;"
                        align="center"
                        justify="center"
                      >
                        <v-text-field
                          v-for="i of Array(4).keys()"
                          v-model="itemCode[i]"
                          v-bind:key="i"
                          ref="pin_digit"
                          type="password"
                          :maxlength="1"
                          style="width:25%;"
                          single-line
                          outlined
                          class="centered-input"
                          v-on:keydown="check_key"
                          v-on:keyup="next_tab($event, i)"
                        ></v-text-field>
                      </v-row>
                    </v-form>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click="is_fake ? submit_fake_form(true) : submit_form()" color="primary">Submit</v-btn>
                    </v-card-actions>
                  </v-card-text>
                  
                </template>
              </v-fade-transition>

              <v-fade-transition>
                <template v-if="is_finish">
                  <Qrcode :goBack="goBack" v-bind:registration_endpoint="registration_endpoint" v-bind:is_fake="is_fake"
                    v-bind:birthday="birthday"
                    v-bind:name="name"
                    v-bind:itemCode="itemCode"
                    v-bind:selectedItem="selectedItem"
                    v-bind:issue_date="issue_date"
                  ></Qrcode>
                </template>
              </v-fade-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import parse from 'date-fns/parse';
import axios from 'axios';
import Qrcode from './Qrcode';
export default {
  props: {
    check_endpoint: String,
    registration_endpoint: String,
    is_fake: Boolean
  },
  data: () => ({
    birthday: null,
    name: null,
    itemCode: Array(4),
    selectedItem: null,
    issue_date: null,
    is_start:true,
    is_loading:false,
    is_success:false,
    is_fail:false,
    is_finish:false,
  }),
  methods: {
    check_key(event) {
      if (!/^\d*$/.test(event.key)) {
        event.preventDefault();
        return;
      }
    },
    next_tab (event, key) {
      if (key < this.itemCode.length - 1 && /^\d*$/.test(event.key)) {
        this.$nextTick(() => {
          this.$refs.pin_digit[key + 1].$refs.input.focus();
        })
      }
    },
    submit_form() {
      this.is_start = false
      this.is_loading = true
      axios.post(this.check_endpoint, {
        dob: this.birthday,
        name: this.name,
        hkid: this.itemCode.join(''),
        issue_date: this.issue_date
      }).then(response => {
          this.is_loading = false
          this.is_success = true
          setTimeout(() => {
            this.is_success=false
            this.is_finish=true
          }, 2000)
      }).catch(error => {
          this.is_loading = false
          this.is_fail = true
      })
    },
    submit_fake_form(fake_success) {
      this.is_start = false
      this.is_loading = true
      if (fake_success) {
        setTimeout(() => {
          this.is_loading = false
          this.is_success = true
          setTimeout(() => {
            this.is_success = false
            this.is_finish = true
          }, 2000)
        }, 2000)
      } else {
        setTimeout(() => {
          this.is_loading = false
          this.is_fail = true
        }, 2000)
      }
    },
    goBack(){
      this.birthday = null,
      this.name = null,
      this.itemCode = Array(4),
      this.selectedItem = null,
      this.issue_date = null,
      this.is_start = true,
      this.is_loading = false,
      this.is_success = false,
      this.is_fail = false,
      this.is_finish = false
    },
    parse: parse
  },
  components: {
    Qrcode,
  }
}
</script>
<style lang="scss">
  @import '../styles/custom.scss';
</style>