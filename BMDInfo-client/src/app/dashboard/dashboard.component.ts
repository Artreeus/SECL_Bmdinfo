import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
              CommonModule,
              FormsModule,
              RouterModule,
            ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  lastFetchDataAt: any;
  isLoaderVisible = false;
  currentUser: any;

  constructor(
    private router: Router,
    private dataService: DataServiceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get current user from AuthService
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.dataService.getLastFetchedDataAt().subscribe({
      next: (data) => {
        this.lastFetchDataAt = data;
      },
      error: (err) => {
        console.error('Error fetching last fetched data at:', err);
        this.lastFetchDataAt = 'N/A';
      }
    });

  }

  searchProducts(data: NgForm){

  }

  logOut(){
    this.authService.logout();
  }

  fetchData() {
    this.isLoaderVisible = true; // Show the loader
      this.dataService.getSpradeSheetData().subscribe({
      next: (r) => {
      
      },
      error: (err) => {
        if (err.status === 200) {
            alert('Data fetched successfully');
            this.isLoaderVisible = false; // Hide the loader
            window.location.reload();
        }else {
        alert('Error fetching data: ' + err.message);
        this.isLoaderVisible = false; // Hide the loader
        console.error(err);
        }
      } 
    });
  }

}
