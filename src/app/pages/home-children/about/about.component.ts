import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';

import { AccountService } from '../../../services/account.service';

@Component({
  standalone: false,
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss', '../shared.style.scss'],
})
export class AboutComponent implements OnInit {
  ngOnInit(): void {}

  constructor() {}
}
