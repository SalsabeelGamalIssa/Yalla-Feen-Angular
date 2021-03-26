import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  constructor(private _categories: CategoryService, private _router: Router, private categoryService: CategoryService) {
  }
  VisitorType: string;
  citySelected: string;
  CategorySelected: string;
  tagSelected: string;
  budgetSelected: number;
  isCustom = true;
  MyStep = 1;
  types = ['solo', 'friends', 'couple', 'family'];
  categories: any[];
  Tags: any = [];
  cities = ['Cairo', 'Alexandria', 'Gizeh', 'Port Said', 'Suez', 'Luxor', 'al-Mansura', 'El-Mahalla El-Kubra', 'Tanta', 'Asyut', 'Ismailia', 'Fayyum', 'Zagazig', 'Aswan', 'Damietta', 'Damanhur', 'al-Minya', 'Beni Suef', 'Qena', 'Sohag', 'Hurghada', '6th of October City', 'Shibin El Kom', 'Banha', 'Kafr el-Sheikh', 'Arish', '10th of Ramadan City', 'Bilbais', 'Marsa Matruh', 'Idfu'];
  timeArray = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00'];
  isFromAM = false;
  isToAM = false;
  ngOnInit(): void {
    this._categories.getAllCategories().subscribe((res: any) => {
      this.categories = res.data;
    });
  }

  // tslint:disable-next-line:variable-name typedef
  VisitorTypeSelection(index: number) {
    this.VisitorType = this.types[index - 1];
  }
  // tslint:disable-next-line:typedef
  City(city: any) {
    this.citySelected = city.itemsList._selectionModel._selected[0].value;
  }

  // tslint:disable-next-line:typedef
  Tag(e: any) {
    this.tagSelected = e.itemsList._selectionModel._selected[0].value;
  }
  // tslint:disable-next-line:typedef
  Budget(e: any) {
    this.budgetSelected = e.value;
  }
  // @ts-ignore
  CategorySelection(index: number): string {
    if (index === 8){
      this.CategorySelected = '';
    }else {
      this.CategorySelected = this.categories[index].title;
      this.categoryService.getAllTags(this.categories[index]._id).subscribe((res: any) => {
        this.Tags = [];
        for (const iterator of res.tags) {
          this.Tags.push(iterator.title);
        }
        console.log(this.Tags);
      }, () => {
      });
    }
  }
  // tslint:disable-next-line:typedef
  StepChanger(status: string) {
    switch (status) {
      case 'back':
        this.MyStep--;
        break;
      case 'next':
        this.MyStep++;
        break;
    }
  }
  // tslint:disable-next-line:typedef
  AMorPM(timing: string) {
    timing === 'from' ? this.isFromAM = !this.isFromAM : this.isToAM = !this.isToAM;
  }
  // tslint:disable-next-line:typedef
  searchResult() {
    this._router.navigate(['place/search'], {
      queryParams: {
        type: this.VisitorType,
        city: this.citySelected,
        category: this.CategorySelected,
        tag: this.tagSelected,
        budget: this.budgetSelected
      }
    });
  }
}
