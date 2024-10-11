import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RoomsService } from '../modules/openapi/services';
import { RoomDto } from '../modules/openapi/models';

@Component({
  selector: 'app-room-selector',
  templateUrl: './room-selector.component.html',
  styleUrls: ['./room-selector.component.scss']
})
export class RoomSelectorComponent implements OnInit {

  rooms: RoomDto[] = [];
  roomName: string = "";
  @Output() roomSelectionEvent = new EventEmitter<string>();
  constructor(private roomService: RoomsService) { }

  ngOnInit(): void {
    this.loadRooms();
  }

  createRoom() {
    this.roomService.createRoomRoomsCreateGet({ room_name: this.roomName }).subscribe(
      (response) => {
        console.log(response)
        this.loadRooms();
      }
    )
  }

  loadRooms() {
    this.roomService.getAllRoomsRoomsGet().subscribe(
      (rooms: RoomDto[]) => {
        this.rooms = rooms;
      }
    )
  }
}
