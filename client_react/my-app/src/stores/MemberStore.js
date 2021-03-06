import { observable, action } from 'mobx';
import {createContext} from "react";
import requestLogin,{requestRegister} from '../controllers/MemberController'
class MemberStore{
  @observable cnt = 0;
  static instance = null;

  static getInstance () {
    if (!MemberStore.instance) 
      this.instance = new MemberStore();
    return MemberStore.instance;
  }
  constructor(){
    this.context = createContext(this)
  }
  @action 
  async login(id, pw){
    return requestLogin(id,pw)
  }

  @action 
  async register(member){
    return requestRegister(member)
  }
}
export default  MemberStore = MemberStore.getInstance()