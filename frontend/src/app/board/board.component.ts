import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  board: string[] = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  roomId: string = "";
  webSocket: WebSocket | undefined;
  shape: string = ' ';
  constructor(private route: ActivatedRoute, private cookieService: CookieService) { }
  ngOnDestroy(): void {
    this.webSocket?.close(0, "done")
  }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get("roomId")!;
    console.log(`Connected to Room with ID ${this.roomId}`)
    this.initBoardUpdates();
  }

  private initBoardUpdates() {
    this.webSocket = new WebSocket(`${environment.wsUrl}/${this.roomId}?user_id=${this.cookieService.get("user_id")}`);
    this.webSocket.onmessage = (msg: MessageEvent) => {
      console.log(msg.data);
      const jsonResponse = JSON.parse(msg.data);
      this.board = jsonResponse.board;
      if(jsonResponse.shape !== undefined) {
        this.shape = jsonResponse.shape;
      }
    };
  }

  setShape(index: number) {
    console.log(index)
    this.board[index] = this.shape;
    if (this.webSocket?.readyState == WebSocket.CLOSED || this.webSocket?.readyState == WebSocket.CLOSING) {
      this.initBoardUpdates()
    }
    this.webSocket?.send(JSON.stringify(this.board))
  }

}
