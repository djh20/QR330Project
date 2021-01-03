import { observable, action } from 'mobx';
import {createContext} from "react";
import getTodayBookData, {getMyTodayBook, getCheckInQRdata,getCheckOutQRdata, unbook, book,getMyTodayWaitList, addWait} from '../controllers/BookController'
class BookStore{
  @observable today_book = []
  @observable my_today_book = []
  @observable my_today_wait_list = []
  static instance = null;

  static getInstance () {
    if (!BookStore.instance) 
      this.instance = new BookStore();
    return BookStore.instance;
  }
  constructor(){
    this.context = createContext(this)
  }

  @action
  requestGetTodayBookData(roomId){
    getTodayBookData(roomId).then(data => {
      this.today_book = data['data']
    })}

  @action
  requestGetMyTodayBookData(){
    getMyTodayBook().then(data => {
      console.log(data)
      this.my_today_book = data['data']
    })}

  @action
  requestGetCheckInQRdata(book_id){
    return getCheckInQRdata(book_id).then( data => {
      return data['data']
    })
  }

  @action
  requestGetCheckOutQRdata(book_id){
    return getCheckOutQRdata(book_id).then( data => {
      return data['data']
    })
  }

  @action
  requestUnBook(book_id){
    return unbook(book_id).then(status => {
      return status
    })
  }

  @action
  requestBook(start, end, room_id){
    return book(start, end, room_id).then(status => {
      return status
    })
  }

  @action
  requestGetMyTodayWaitList(){
    return getMyTodayWaitList().then(data => {
      this.my_today_wait_list = data['data']
    })
  }

  @action
  requestAddWait(start, end){
    return addWait(start, end).then(status => {
       return status
    })
  }
}
export default  BookStore = BookStore.getInstance()