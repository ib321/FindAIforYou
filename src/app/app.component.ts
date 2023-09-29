import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'findAIforYou';
  isNavbarOpen = false;
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  theme = 'light-theme';

  constructor() {
    try {
      this.theme = localStorage.getItem('theme') || 'light-theme';
      document.body.className = this.theme;
    } catch (e) {
      console.error('Failed to access localStorage', e);
    }
  }
  
  toggleTheme() {
    this.theme = this.theme === 'light-theme' ? 'dark-theme' : 'light-theme';
    try {
      localStorage.setItem('theme', this.theme);
    } catch (e) {
      console.error('Failed to save theme in localStorage', e);
    }
    document.body.className = this.theme;
  }
  

}
