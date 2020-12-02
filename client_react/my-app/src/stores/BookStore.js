import { observable, action } from 'mobx';
import {createContext} from "react";
class BookStore{
  @observable books = []
  static instance = null;

  static getInstance () {
    if (!BookStore.instance) 
      this.instance = new BookStore();
    return BookStore.instance;
  }
  constructor(){
    this.context = createContext(this)
  }
}
export default  BookStore = BookStore.getInstance()