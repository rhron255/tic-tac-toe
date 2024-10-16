import { Component, OnInit } from '@angular/core';
import { RoomsService } from "../modules/openapi/services/rooms.service";
import { RoomDto } from "../modules/openapi/models/room-dto";

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss']
})
export class RoomViewComponent implements OnInit {
  rooms: RoomDto[] = [];

  constructor(private roomService: RoomsService) {
  }

  ngOnInit(): void {
    this.loadRooms();
    setInterval(() =>
        this.loadRooms()
      , 750)
  }

  loadRooms() {
    this.roomService.getAllRooms().subscribe(
      (rooms: RoomDto[]) => {
        this.rooms = rooms;
      }
    )
  }
}
