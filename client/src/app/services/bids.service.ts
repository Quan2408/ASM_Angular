import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BidForm } from '../../types/Bid';

@Injectable({
  providedIn: 'root',
})
export class BidsService {
  apiUrl = 'http://localhost:8080/api/bids';
  http = inject(HttpClient);

  constructor() {}

  createBid(data: BidForm) {
    return this.http.post(this.apiUrl, data);
  }
  // getBidById(id: string) {
  //   console.log('Fetching bid with ID:', id); // Log ID
  //   return this.http.get(`${this.apiUrl}/${id}`);
  // }
  updateBid(id: string, isWinBid: boolean) {
    return this.http.put(`${this.apiUrl}/${id}`, { isWinBid });
  }
}
