import axios from "axios";
import { taskGetRequst } from "../model/taskGetRequest";

const HOST: string = "http://localhost:3000/board";

export class taskService {
  //getAllBoardByid
  async getBoardAllByid(cid: number) {
    const response = await axios.get(HOST + `/${cid}`);
    const papers: taskGetRequst[] = response.data;
    return papers;
  }
  //getBoardByid
  async getBoardbyid(id: number) {
    const response = await axios.get(HOST + `/find/${id}`);
    const papers: taskGetRequst[] = response.data;
    return papers;
  }
  //addBoard
  async PostBoardByid(body: { name: string; cid: number }) {
    const response = await axios.post(HOST, body);
    return response;
  }
  //deleteBoard
  async DeleteBoard(id: number) {
    const response = await axios.delete(HOST + `/${id}`);
    return response;
  }
  //Movetask
  async Movetask(id: number, body: { cid: number }) {
    const response = await axios.put(HOST + `/move/${id}`, body);
    return response;
  }
  async EditNametask(id: number, body: { name: string }) {
    const response = await axios.put(HOST + `/${id}`, body);
    return response;
  }
}
