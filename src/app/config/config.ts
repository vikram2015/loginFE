import { environment } from "../../environments/environment.prod";

export let config = {
  serverAddress: environment.API_URL,
  version: 'v1',
}
