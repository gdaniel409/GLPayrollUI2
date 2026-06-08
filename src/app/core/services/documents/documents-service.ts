import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { DocumentModel } from '../../../models/DocumentModel';
import { APP_SETTINGS } from '../../../app.settings';

@Injectable({
  providedIn: 'root'
})
export class DocumentsHttpService {
    
  list : DocumentModel[] = [];
  public appSettings = inject(APP_SETTINGS);


  constructor(private readonly http: HttpClient
    ) {}

  getList(employeeID : number) : Observable<DocumentModel[]>{
                                                                        
    const urlAddr : string = this.appSettings.getString("");

    let params = new HttpParams().set('employeeId', employeeID);
    return this.http.get<DocumentModel[]>(urlAddr, {params}).pipe(
                    tap((data) => {
                                 
                    this.list = data;               
                         
                  }),
                  catchError(this.handleError)
                );
 
  }

  getDocument(url : string): Observable<Blob> {
       
    return this.http.get(url, {
      responseType: 'blob' // This is crucial for handling binary data
    });

  }

  handleError(error: HttpErrorResponse) {
    let message = '';

    switch (error.status) {
      case 0:
        message = 'Client error';
        break;
      case HttpStatusCode.InternalServerError:
        message = 'Server error';
        break;
      case HttpStatusCode.BadRequest:
        message = 'Request error';
        break;
      default:
        message = 'Unknown error';
    }

    console.error(message, error.error);

    return throwError(() => error);
  }

}
