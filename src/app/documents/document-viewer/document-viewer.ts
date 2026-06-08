import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_SETTINGS } from '../../app.settings';
import { DocumentsHttpService } from '../../core/services/documents/documents-service';


@Component({
  selector: 'app-document-viewer',
  imports: [],
  templateUrl: './document-viewer.html',
  styleUrl: './document-viewer.css'
})
export class DocumentViewComponent implements OnInit {

  documentId : number | undefined;
  inline : boolean = true;
  contentType : string = '';
  downloadUrl : string = '';
  appSettings = inject(APP_SETTINGS);
  employeeId : number | undefined;
  employeeNumber : string = '';

   constructor(private readonly documentHttpService:  DocumentsHttpService,
    private readonly sanitizer: DomSanitizer,
    private readonly route : ActivatedRoute,
    private readonly router: Router) {}

  ngOnInit(): void {
    
    this.documentId = Number(this.route.snapshot.params['documentId']);
    this.inline = this.route.snapshot.params['inline'] === 'true';
    this.contentType = this.route.snapshot.params['contentType'];
    this.downloadUrl = this.appSettings.getString('downloaddocument');
    this.employeeId = Number(this.route.snapshot.params['employeeId']);
    this.employeeNumber = this.route.snapshot.params['employeeNumber'];

    this.viewDocumentInNewTab();
  }

  viewDocumentInNewTab(): void {

    const url = this.downloadUrl + "?id=" + this.documentId + "&inline=" + this.inline;
     
    this.documentHttpService.getDocument(url).subscribe((blob: Blob) => {
     
      const file = new Blob([blob], { type: this.contentType });

      // Create a temporary URL for the blob
      const fileURL = URL.createObjectURL(file);

      // Open the URL in a new tab
      const newWindow = window.open(fileURL, '_blank');
      
      if (newWindow) {
       
        this.router.navigate(['documents', this.employeeId, this.employeeNumber]);

      } else {
        alert('Please allow pop-ups for this website to view the PDF.');
      }
    });
  }

}
