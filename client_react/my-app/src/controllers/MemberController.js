import axios from 'axios'
export default async function requestLogin(id, pw){

    const res = await axios.post(
      'https://djh20.ipdisk.co.kr:8000/api/member/login/', 
      {id : id ,pw : pw},{withCredentials: true})
      .catch(error => {return error.response}).then(res => {
        return res
      } );
      await getSubscription().then(subscription => {
        saveSubscription(subscription)
      })
      return res;
  }

export async function requestRegister(member){
      return await axios.post(
          'https://djh20.ipdisk.co.kr:8000/api/member/', 
          {id : member.id ,pw : member.pw ,name : member.name ,nickname : member.nickname,
          age : member.age ,gender : member.gender,
          phonenumber : member.phonenumber ,email : member.email,
          },{withCredentials: true})
          .then( res=> {console.log(res); return res}).catch(error => {console.log(error.response);return error.response});
  }
  
  async function getSubscription(){
    const applicationServerKey = urlB64ToUint8Array(
      'BIXjDqYFNcLB86S6hsfCGkWXsaSQUMNDuJCA_moSEJnLzIomlX08WwA25gg1nj24VkVU363afcK-Nt27eQYZrpI'
    )
    const options = { applicationServerKey, userVisibleOnly: true }
    const pushManager = await navigator.serviceWorker.ready.then(serviceWorkerRegistration => {
      // var subscription = serviceWorkerRegistration.pushManager.getSubscription()

      return serviceWorkerRegistration.pushManager
    })
    const subscribe = await pushManager.subscribe(options)
    return subscribe
  }


  const saveSubscription = async subscription => {
    return await axios.post(
      'https://djh20.ipdisk.co.kr:8000/api/member/subscribe/', 
      {subscribe : JSON.stringify(subscription)},{withCredentials: true})
      .then( res=> {console.log(res); return res}).catch(error => {console.log(error.response);return error.response});

    // console.log(subscription)
    // const SERVER_URL = 'https://djh20.ipdisk.co.kr:8000/api/member/subscribe/'
    // const data = {
    //   method: 'post',
    //   mode: 'no-cors',
    //   headers: {
    //     'Accept': 'application/json, text/plain, */*',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(subscription),
    //   credentials: "same-origin"
    // }
    // console.log(data)
    // const response = await fetch(SERVER_URL,data)
  }


const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}