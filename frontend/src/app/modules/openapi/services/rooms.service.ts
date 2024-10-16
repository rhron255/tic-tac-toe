/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createRoom } from '../fn/rooms/create-room';
import { CreateRoom$Params } from '../fn/rooms/create-room';
import { getAllRooms } from '../fn/rooms/get-all-rooms';
import { GetAllRooms$Params } from '../fn/rooms/get-all-rooms';
import { RoomDto } from '../models/room-dto';

@Injectable({ providedIn: 'root' })
export class RoomsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createRoom()` */
  static readonly CreateRoomPath = '/rooms/create';

  /**
   * Create Room.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createRoom()` instead.
   *
   * This method doesn't expect any request body.
   */
  createRoom$Response(params: CreateRoom$Params, context?: HttpContext): Observable<StrictHttpResponse<RoomDto>> {
    return createRoom(this.http, this.rootUrl, params, context);
  }

  /**
   * Create Room.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createRoom$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createRoom(params: CreateRoom$Params, context?: HttpContext): Observable<RoomDto> {
    return this.createRoom$Response(params, context).pipe(
      map((r: StrictHttpResponse<RoomDto>): RoomDto => r.body)
    );
  }

  /** Path part for operation `getAllRooms()` */
  static readonly GetAllRoomsPath = '/rooms';

  /**
   * Get All Rooms.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllRooms()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRooms$Response(params?: GetAllRooms$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<RoomDto>>> {
    return getAllRooms(this.http, this.rootUrl, params, context);
  }

  /**
   * Get All Rooms.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllRooms$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRooms(params?: GetAllRooms$Params, context?: HttpContext): Observable<Array<RoomDto>> {
    return this.getAllRooms$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<RoomDto>>): Array<RoomDto> => r.body)
    );
  }

}
