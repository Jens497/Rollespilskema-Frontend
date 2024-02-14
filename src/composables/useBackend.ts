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

export default function useBackend() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL + "/api",
    withCredentials: true
  })
  return instance;
}

