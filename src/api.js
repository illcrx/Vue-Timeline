import axios from "axios";
import { sequencer } from "./models/Stage";

export function fetchAzBexByProjectId({ projectId }) {
  return axios
    .post(
      `https://hook.integromat.com/tl6w7i72tkgxf1t2gsvy2md96wucrtol?project_id=${projectId}`
    )
    .then(({data}) => sequencer.azbex(data));
}