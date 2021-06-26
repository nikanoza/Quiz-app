import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/internal/operators/map";


@Injectable()
export class ServerService {
  error: string;
  constructor(private http: HttpClient){}
  getApiData(link: string){
    return this.http.get(link).pipe(
      map(
        (res: Response) => {
          const data = res.valueOf();
          return data;
        }
      )
    )
  }
}