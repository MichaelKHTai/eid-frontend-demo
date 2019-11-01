<template>
  <v-app>
    <v-app-bar app floating>
      <v-toolbar-title class="headline text-uppercase">
        <span>E-Identity Demo  </span>
        <span class="font-weight-light">Registration</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content style="padding:0">
      <HelloWorld/>
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
    //
  }),
};
</script>
