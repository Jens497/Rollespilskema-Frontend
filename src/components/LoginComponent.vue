<template>
  <VContainer class="content">
    <VRow no-gutters class="login-row">
      <VCol
        :cols="12"
        :offset="0"
        :sm="8"
        :offset-sm="2"
        :md="6"
        :offset-md="3"
        :lg="4"
        :offset-lg="4"
      >
        <VCard class="login-box pa-5">
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

            <VCardActions>
              <VBtn text="Login" type="submit" />
            </VCardActions>
          </VForm>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
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

    if (!(await event).valid) return;

    const data = { username: username.value, password: password.value };
    backend.post("/auth/Login", data, { withCredentials: true })
      .then((response) => {
        appStore._user = response.data
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
    height: 100%;
  }

  .login-row {
    height: 100%;
    align-content: center;
  }
</style>
