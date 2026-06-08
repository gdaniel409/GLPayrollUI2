
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ContextMenuComponent } from "./navigation/context-menu-component/context-menu-component";
import { ContextMenuService } from './core/services/contextmenuservice/ContextMenuService';
import { NavBarComponent } from './navigation/navbar/nav-bar.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, ContextMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent implements OnInit {
  
  title = 'GLPayroll';

  hideMenu : boolean = true;
  contextMenu = inject(ContextMenuService);
 
  @ViewChild('contextMenu') contextMenuRef!: ContextMenuComponent;
 
//event: any;

  constructor() {}

  ngOnInit(): void {

    this.contextMenu.callAppEmployeeSelectedMethod$.subscribe(data=>{

      this.employeeSelected(data.employeeID, data.employeeNumber, data.documentCount, data.userId);

    });

  }

  employeeSelected(employeeID : number, employeeNumber: string, documentCount : number, userId : number):any{
  
      if(this.hideMenu)
      {
        this.hideMenu = false;
      }
      
      this.contextMenuRef.employeeID = employeeID;
      this.contextMenuRef.employeeNumber = employeeNumber;
      this.contextMenuRef.documentCount = documentCount;
      this.contextMenuRef.userId = userId;
       
      return false;
 
  }

  handleMenuClose(event : any){
  
    this.menuClose(true);
 
  }

  menuClose(show : boolean){
    this.hideMenu = show;
  }


}
