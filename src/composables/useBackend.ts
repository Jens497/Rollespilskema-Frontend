import axios from "axios";


export type JsonString = string

export interface ComponentDto {
  componentId: string,
  name: string,
  properties: JsonString

}
export interface TemplateDto {
  templateId: string,
  name: string,
  components: ComponentDto[]
}

export interface TemplateDescriptionDto {
  templateId: string,
  name: string,
}

export interface SheetDto {
  sheetId: string,
  name: string,
  templateId: string,
  userId: string,
  components: ComponentDto[]
}

export interface SheetDescriptionDto {
  sheetId: string,
  name: string,
  userId: string,
  templateId: string,
}

export default function useBackend() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL + "/api",
    withCredentials: true,
    paramsSerializer: {
      indexes: null
    }
  })

  return instance;
}

