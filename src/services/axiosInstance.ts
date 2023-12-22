import axios, { AxiosInstance, AxiosResponse } from "axios";

export class ApiService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
    });
  }

  nontriLogin = (username: string, password: string) => {
    return this.instance
      .post("/login/", {
        username: username,
        password: password,
      })
      .then((res: AxiosResponse) => {
        return res.data;
      });
  };

  getGenEd = (stdid: string, token: string) => {
    return this.instance
      .get("/gened/", {
        params: {
          stdid: stdid,
        },
        headers: {
          "x-access-token": token,
        },
      })
      .then((res: AxiosResponse) => {
        return res.data;
      });
  };
}
