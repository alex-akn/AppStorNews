import {
  Component,
  OnInit
} from '@angular/core';
import {
  IntercomService
} from '../../services/intercom.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  mobile_mode: boolean = false;
  title: string = "App Stor News";

  constructor(private intercom: IntercomService) {
    this.intercom.newWidth$.subscribe(w => {
      this.mobile_mode = w < 992 ? true : false;
    })
    this.intercom.newTitle$.subscribe(title => {
        this.title = title;
    })
  }

    ngOnInit(): void {

    }

}
