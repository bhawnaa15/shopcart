import { Component,Input,Output,HostListener,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCountProducts } from 'src/app/store/selectors';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  /**
   * Property to hold the option values
   */
  public optionValue = 'Products'

  /**
   * Property to display the dropdown or not 
   */
  public showDropdown = false;

  /**
   * Property to decide the id of input container
   */
  @Input() public id: string = '';


  /**
   * Property to options in dropdown
   */
  @Input() options = [
    { id: 0, name: "All" },
    { id: 1, name: "Electronics" },
    { id: 2, name: "Fashion" },
    { id: 3, name: "Jewllery" },
  ];

  /**
   * Property to emit when an option is selected
   */
  @Output() select = new EventEmitter<any>();

  /**
   * Property to ensure the dropdown hides when clicked outside the dropdown
   */
  @HostListener('document:click', ['$event']) onDocumentClick(event: any) {
    this.showDropdown = false;
  }

  countProducts$: Observable<number>;
  constructor(private store:Store, private routes: Router) {
    this.countProducts$ = store.select(selectCountProducts);
  }

  /**
   * Method to display the dropdown when button is pressed
   */
  onShowDropdown($event: Event) {
    $event.stopPropagation();
    this.showDropdown = !this.showDropdown
  }

  /**
   * Method to display the selected option in the field
   */
  selectOption(value: string) {
    this.select.emit(value);
    this.optionValue = value;
    this.showDropdown = !this.showDropdown;
  }


  loginStatus:string="";

  ngOnInit(): void {
  
  }

  loginAuth() {
    this.loginStatus=sessionStorage.getItem('login');
      if(this.loginStatus === "true"){
        console.log(this.loginStatus);
        this.routes.navigate(['/add-to-cart']);
      }
      else{
        this.selectItemAlert("Please Login first");
      }
    }

    private selectItemAlert(message: any) {
      Swal.fire({
        position: 'top-end',
        html: message,
        timer: 2000,
        width: '500px',
        showConfirmButton: false,
        timerProgressBar: false,
      });
    }
}
