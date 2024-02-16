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

export interface SheetDescriptionDto {

}

export default function useBackend() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL + "/api",
    withCredentials: true
  }) // TODO paramserializer to get array params to correct format
  return instance;
}

