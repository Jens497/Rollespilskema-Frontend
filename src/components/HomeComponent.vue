<template>
  <v-container class="fill-height w-100 pt-5" style="max-width: none;">
    <v-row
      class="d-flex h-100 w-100"
      :align="'start'"
      justify="space-evenly"
    >
      <v-col cols="5">
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
              v-for="( template, templateId ) of templateStore.templates"
              :key="templateId"
              :title="templateId"
              @click="sheetStore.addSheetFromTemplate(templateId as string, randomSheetId); $router.push({ name: 'SheetViewer', params: { sheetId: randomSheetId } })"
            />
            <v-list-item v-if="Object.entries(templateStore.templates).length == 0" :subtitle="$t<LocalizationKey>('view.home.templates.emptyText')" />
          </v-list>
        </v-menu>
        <v-list>
          <v-list-item
            v-for="( sheet, sheetId ) of sheetStore.sheets "
            :key="sheetId"
            :title="sheetId"
            :to="{ name: 'SheetViewer', params: { sheetId: sheetId } }"
          />
          <v-list-item v-if="Object.entries(sheetStore.sheets).length == 0" :subtitle="$t<LocalizationKey>('view.home.sheets.emptyText')" />
        </v-list>
      </v-col>

      <v-col class="fill-height" cols="auto">
        <v-divider vertical />
      </v-col>

      <v-col cols="5">
        <v-btn
          class="primary-button"
          color="primary"
          :to="{ name: 'TemplateEditor', params: { templateId: randomTemplateId } }"
        >
          <v-icon icon="mdi-plus" size="large" start />
          {{ $t<LocalizationKey>("view.home.templates.new") }}
        </v-btn>

        <v-list>
          <v-list-item
            v-for="(sheet, templateId) of templateStore.templates "
            :key="templateId"
            :title="templateId"
            :to="{ name: 'TemplateEditor', params: { templateId: templateId } }"
          />
          <v-list-item v-if="Object.entries(templateStore.templates).length == 0" :subtitle="$t<LocalizationKey>('view.home.templates.emptyText')" />
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { LocalizationKey } from '@/plugins/vue-i18n';
  import { useSheetStore } from '@/store/sheet';
  import { useTemplateStore } from '@/store/template';


  const randomTemplateId = crypto.randomUUID()
  const randomSheetId = crypto.randomUUID()

  const templateStore = useTemplateStore()
  const sheetStore = useSheetStore()
</script>

<style scoped lang="scss">
.primary-button {
  margin-bottom: 15px;
}
</style>
