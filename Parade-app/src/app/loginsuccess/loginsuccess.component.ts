import { ResearcherService } from './../ResearcherService';
import { Component, OnInit } from '@angular/core';
import { Researcher } from '../Researcher';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-loginsuccess',
  templateUrl: './loginsuccess.component.html',
  styleUrls: ['./loginsuccess.component.css'],
})
export class LoginsuccessComponent implements OnInit {
  public researchers: Researcher[] = [];

  constructor(private researcherService: ResearcherService) {}

  ngOnInit() {
    this.getResearchers();
  }

  public getResearchers(): void {
    this.researcherService.getResearchers().subscribe(
      (response: Researcher[]) => {
        this.researchers = response;
        console.log(this.researchers);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchResearchers(key: string): void {
    console.log(key);
    const results: Researcher[] = [];
    for (const researcher of this.researchers) {
      if (
        researcher.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        researcher.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        researcher.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        researcher.expertise.toLowerCase().indexOf(key.toLowerCase()) !== -1||
        researcher.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(researcher);
      }
    }
    this.researchers = results;
    if (results.length === 0 || !key) {
      this.getResearchers();
    }
  }

  public onOpenModal(reseacher: Researcher, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'Send Request') {
      // this.editEmployee = employee;
      // button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'Ignore') {
      // this.deleteEmployee = employee;
      // button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    // container.appendChild(button);
    button.click();
  }
}
