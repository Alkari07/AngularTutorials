import { Component, OnInit } from '@angular/core';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  //the message service must be public so it can be bound into the message html template
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
