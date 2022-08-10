import { Alert } from 'src/app/class/alerts';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  @Input() alert: Alert | null = null; // decorate the property with @Input()

  @ViewChild('notify',{static:true}) toastEl: any
  isClosed(){
    return !this.toastEl.nativeElement.classList.contains('show')
  }
  toast:any

  constructor() { }

  ngOnInit() {
    this.toast=new Toast(this.toastEl.nativeElement,{})
  }

  ngOnChanges(){
    if(this.alert != null){
      this.toast.show()
    }
  }


}
