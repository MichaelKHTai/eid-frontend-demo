<template>
  <v-app>
    <v-app-bar app floating>
      <v-toolbar-title class="headline text-uppercase">
        <span>E-Identity Demo  </span>
        <span class="font-weight-light">Registration</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>more_vert</v-icon>
        </v-btn>
        </template>
        <v-card
          class="mx-auto"
          max-width="344"
          outlined
        >
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="check_endpoint"
                label="Check Endpoint"
                key="check-endpoint"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="registration_endpoint"
                label="Registration Endpoint"
                key="registration-endpoint"
                type="text"
              ></v-text-field>
              <v-switch
                v-model="is_fake"
                :label="`Use Fake API: ${is_fake.toString()}`"
              ></v-switch>
            </v-form>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-content style="padding:0">
      <HelloWorld
        v-bind:check_endpoint="check_endpoint"
        v-bind:registration_endpoint="registration_endpoint"
        v-bind:is_fake="is_fake"/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data: () => ({
    check_endpoint: '',
    registration_endpoint: '',
    is_fake: true
  }),
};
</script>
