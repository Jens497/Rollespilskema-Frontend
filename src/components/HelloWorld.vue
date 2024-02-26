<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="300" src="@/assets/logo.svg" />

      <div class="text-body-2 font-weight-light mb-n1">
        Welcome to
      </div>

      <h1 class="text-h2 font-weight-bold">
        Vuetify
      </h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-menu open-on-hover :close-on-content-click="false" location="start">
            <template #activator="{ props }">
              <v-btn
                min-width="164"
                variant="text"
                v-bind="props"
              >
                <v-icon size="large" start />

                Sheet Editor
              </v-btn>
            </template>

            <v-list>
              <v-btn
                :style="{
                  width: '100%'
                }"
                :to="{ name: 'TemplateEditor', params: { templateId: randomTemplateId } }"
              >
                <v-icon icon="mdi-plus" size="large" start />
                Ny skabelon
              </v-btn>

              <v-list-item
                v-for="(sheet, templateId) of templateStore.templates "
                :key="templateId"
                :title="templateId"
                :to="{ name: 'TemplateEditor', params: { templateId: templateId } }"
              />
            </v-list>
          </v-menu>
        </v-col>
        <v-col cols="auto">
          <v-menu
            open-on-hover
            :close-on-content-click="false"
            location="end"
          >
            <template #activator="{ props }">
              <v-btn
                variant="text"
                v-bind="props"
              >
                <v-icon size="large" start />

                Sheet Viewer
              </v-btn>
            </template>

            <v-list>
              <v-menu open-on-hover :close-on-content-click="false" location="end">
                <template #activator="{ props }">
                  <v-btn
                    variant="text"
                    :style="{ width: '100%' }"
                    v-bind="props"
                  >
                    <v-icon icon="mdi-plus" size="large" start />
                    Nyt skema fra skabelon
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="( template, templateId ) of templateStore.templates "
                    :key="templateId"
                    :title="templateId"
                    @click="sheetStore.addSheetFromTemplate(templateId as string, randomSheetId); $router.push({ name: 'SheetViewer', params: { sheetId: randomSheetId } })"
                  />
                </v-list>
              </v-menu>
              <v-list-item
                v-for="( sheet, sheetId ) of sheetStore.sheets "
                :key="sheetId"
                :title="sheetId"
                :to="{ name: 'SheetViewer', params: { sheetId: sheetId } }"
              />
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
  import { useSheetStore } from '@/store/sheet';
  import { useTemplateStore } from '@/store/template';
  import { randomUUID } from '@/util/Crypto';


  const randomTemplateId = randomUUID()
  const randomSheetId = randomUUID()

  const templateStore = useTemplateStore()
  const sheetStore = useSheetStore()
</script>
