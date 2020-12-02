import axios from 'axios'

export default async function requestLogin(id, pw){
    return await axios.post(
      '/api/member/login/', 
      {id : id ,pw : pw})
      .catch(error => {return error.response}).then(res => {return res} );
  }

export async function requestRegister(member){
      return await axios.post(
          '/api/member/', 
          {id : member.id ,pw : member.pw ,name : member.name ,nickname : member.nickname,
          age : member.age ,gender : member.gender,
          phonenumber : member.phonenumber ,email : member.email,
          })
          .then( res=> {console.log(res); return res}).catch(error => {console.log(error.response);return error.response});
  }
