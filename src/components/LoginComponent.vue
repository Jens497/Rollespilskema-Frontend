<template>
  <div class="content">
    <VCard class="login-box">
      <VForm @submit="onSubmit">
        <VLabel text="Login" class="text-h3 pb-5 mx-3" />

        <VTextField
          v-model="username"
          label="username"
          class="mx-3"
          :rules="[validators.required]"
        />
        <VTextField
          v-model="password"
          label="password"
          type="password"
          class="mx-3"
          :rules="[validators.required]"
        />

        <VBtn text="Login" type="submit" />
      </VForm>
    </VCard>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { SubmitEventPromise } from 'vuetify/lib/framework.mjs';
  import { validators } from '@/util/validationRules';
  import useBackend from '@/composables/useBackend';
  import { useRoute, useRouter } from 'vue-router';
  import { useAppStore } from '@/store/app';

  const username = ref<string>()
  const password = ref<string>()
  const appStore = useAppStore()
  const backend = useBackend()
  const route = useRoute()
  const router = useRouter()

  async function onSubmit(event: SubmitEventPromise) {
    event.preventDefault()
    event.stopPropagation()
    const data = { username: username.value, password: password.value };
    backend.post("/auth/Login", data)
      .then((response) => {
        appStore.user = response.data
        router.replace(route.redirectedFrom ?? { name: "Home" })
      })
      .catch((reason) => {
        console.error("Login failed: ", reason);
      })
  }
</script>

<style scoped>
  .content {
    width: 100%;
    height: 100dvh;
  }

  .login-box {
    position: relative;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 40%;
    max-width: 90%;
    min-width: 25%;

  }
</style>
