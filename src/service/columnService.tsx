import axios from "axios";
import { columnGetRequst } from "../model/columnGetRequest";

const HOST: string = "http://localhost:3000/column";
export class columnService {
  //getAllColumnByid
  async getColumnAllByid(uid: number) {
    const response = await axios.get(HOST + `/${uid}`);
    const papers: columnGetRequst[] = response.data;
    return papers;
  }
  //getColumnByid
  async getColumnbyid(id: number) {
    const response = await axios.get(HOST + `/findby/${id}`);
    const papers: columnGetRequst[] = response.data;
    return papers;
  }
  //addCoulumn
  async PostColumnByid(body: { name: string; uid: number }) {
    const response = await axios.post(HOST, body);
    return response;
  }
  //deleteColumn
  async DeleteColumn(id: number) {
    const response = await axios.delete(HOST + `/${id}`);
    return response;
  }
  //editName
  async EditNameColumn(id: number, body: { name: string }) {
    const response = await axios.put(HOST + `/${id}`, body);
    return response;
  }
}
