import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Expense } from '../../models/Expense';

@Component({
  selector: 'app-add',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss', '../shared.style.scss'],
})
export class ModifyComponent implements OnInit {
  constructor() {}

  ngOnInit() {
  }
}
