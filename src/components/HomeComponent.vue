<template>
  <v-container class="h-100 w-100 pt-5" style="max-width: none; overflow-y: hidden;">
    <v-row
      class="d-flex h-100 w-100"
      :align="'start'"
      justify="space-evenly"
    >
      <v-col cols="5" class="h-100">
        <v-menu
          class="mb-5"
          open-on-hover
          :close-on-content-click="false"
          location="bottom"
        >
          <template #activator="{ props }">
            <v-btn
              class="primary-button"
              color="primary"
              v-bind="props"
            >
              <v-icon icon="mdi-plus" size="large" start />
              {{ $t<LocalizationKey>("view.home.sheets.new") }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="( { id: templateId, name: templateName } ) of templates"
              :key="templateId"
              :title="templateName"
              @click="sheetStore.addSheetFromTemplate(templateId as string, randomSheetId); $router.push({ name: 'SheetViewer', params: { sheetId: randomSheetId } })"
            />
            <v-list-item v-if="templates.length == 0" :subtitle="$t<LocalizationKey>('view.home.templates.emptyText')" />
          </v-list>
        </v-menu>
        <v-list max-height="100%">
          <v-list-item
            v-for="( { name: sheetName, id: sheetId } ) of sheets "
            :key="sheetId"
            :title="sheetName"
            :to="{ name: 'SheetViewer', params: { sheetId: sheetId } }"
          />
          <v-list-item v-if="sheets.length == 0" :subtitle="$t<LocalizationKey>('view.home.sheets.emptyText')" />
        </v-list>
      </v-col>

      <v-col class="fill-height" cols="auto">
        <v-divider vertical />
      </v-col>

      <v-col cols="5" class="h-100">
        <v-btn
          class="primary-button"
          color="primary"
          :to="{ name: 'TemplateEditor', params: { templateId: randomTemplateId } }"
        >
          <v-icon icon="mdi-plus" size="large" start />
          {{ $t<LocalizationKey>("view.home.templates.new") }}
        </v-btn>
        <v-list max-height="100%">
          <v-list-item
            v-for="({ id, name }) of templates "
            :key="id"
            :title="name"
            :to="{ name: 'TemplateEditor', params: { templateId: id } }"
          />
          <v-list-item v-if="templates.length == 0" :subtitle="$t<LocalizationKey>('view.home.templates.emptyText')" />
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import useBackend from '@/composables/useBackend';
  import { LocalizationKey } from '@/plugins/vue-i18n';
  import { useSheetStore } from '@/store/sheet';
  import { useTemplateStore } from '@/store/template';


  const randomTemplateId = crypto.randomUUID()
  const randomSheetId = crypto.randomUUID()

  const sheetStore = useSheetStore()
  const templateStore = useTemplateStore()

  try {
    await sheetStore.fetchSheetNames()
    await templateStore.fetchTemplateNames()
  } catch (err) {
    console.log(err)
    // TODO: give errormessage
  }
  const templates = templateStore.templateNames
  const sheets = sheetStore.sheetNames
</script>

<style scoped lang="scss">
.primary-button {
  margin-bottom: 15px;
}
</style>
