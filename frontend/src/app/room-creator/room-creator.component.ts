import { Component } from '@angular/core';
import { RoomsService } from "../modules/openapi/services/rooms.service";

@Component({
  selector: 'app-room-creator',
  templateUrl: './room-creator.component.html',
  styleUrls: ['./room-creator.component.scss']
})
export class RoomCreatorComponent {
  roomName: string = "";

  constructor(private roomService: RoomsService) {
  }

  createRoom() {
    this.roomService.createRoom({room_name: this.roomName}).subscribe(
      (response) => {
        console.log(response)
      }
    )
  }
}
