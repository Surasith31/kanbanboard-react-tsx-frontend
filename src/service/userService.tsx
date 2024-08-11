import axios from "axios";
import { userGetRequest } from "../model/userGetRequest";

const HOST: string = "http://localhost:3000/user";
export class userService {
  //getByid
  async getUserByid(id: number) {
    const response = await axios.get(HOST + `/${id}`);
    const papers: userGetRequest[] = response.data;
    return papers;
  }
  //register
  async PostUser(body: { name: String; email: String; password: String }) {
    const response = await axios.post(HOST + "/register", body);
    return response;
  }
  //Login
  async Login(body: { email: String; password: String }) {
    const response = await axios.post(HOST, body);
    return response;
  }
}
