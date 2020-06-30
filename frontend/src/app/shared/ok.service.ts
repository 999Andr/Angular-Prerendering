import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'; 
import { catchError, retry, tap } from 'rxjs/operators';
import { Car } from './car';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
 
export class OkService {
  
  checkPlatform: boolean;

  private url: string = 'post_and_delete_are_private';
 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  
  constructor(
    private http: HttpClient,
    public router: Router, 
    @Inject(PLATFORM_ID) platformId: any) 
    { this.checkPlatform = isPlatformBrowser(platformId) ? true : false; } 

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.url}/api/read`) 
      .pipe(
        tap(_ => console.log('fetched cars')),
        retry(3),
        catchError(this.handleError<Car[]>('getAllCars', []))
      )
  }

  getCar(id): Observable<Car> { 
    return this.http.get<Car>(`${this.url}/api/read/${id}`) 
      .pipe(
        tap(_ => console.log(`fetched car with id:${id}`)),
        retry(3),
        catchError(this.handleError<Car>(`getCar id=${id}`))
      )
  }

  pushCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.url}/api/create`, car, this.httpOptions) 
      .pipe(
        tap(_ => console.log(`registered new car: ${car.item}`)),
        retry(3),
        catchError(this.handleError<Car>('pushCar'))
      )
  }

  updateCar(car: Car): Observable<any> {
    return this.http.put(`${this.url}/api/update/${car.id}`, car, this.httpOptions) 
     .pipe(
        tap(_ => console.log(`updated car with id:${car.id}`)),
        retry(3),
        catchError(this.handleError<any>('updateCar'))
      )
  }

  deleteCar(id): Observable<any> {
    return this.http.delete(`${this.url}/api/delete/${id}`, this.httpOptions) 
     .pipe(
        tap(_ => console.log(`deleted car with id:${id}`)), 
        retry(3),
        catchError(this.handleError<any>('deleteCar'))
      )
  }
 

  handleError<T>( operation = 'operation', result?: T): any {
  
    if ((this.checkPlatform) == true) { 
      function handleErrorOnBrowser(error: HttpErrorResponse) {
        let msg = '';
        
        if (error.error instanceof ErrorEvent) {
          msg = error.error.message;
        } else {
          msg = `Error Code: ${error.status}\n
          Message: ${error.message}\n 
          Request to the server: ${operation} failed.\n 
          (Source: ok.service.ts).`;
        } 
        
        return throwError(msg);
      };  
      return handleErrorOnBrowser;
      
    } else { 
      return (error: any): Observable<T> => {
        console.error(`Message: ${error.message}. Request to the server: ${operation} failed. 
        (Source: ok.service.ts).`);
        return of(result as T);
      }
    }

  }

}