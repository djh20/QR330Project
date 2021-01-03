import axios from 'axios'
export default async function getTodayBookData(room_id){
    return await axios.get(
      'https://djh20.ipdisk.co.kr:8000/api/book/today/', 
      {params : {room_id: room_id}},{withCredentials: true})
      .catch(error => {return error.response}).then(res => {return res.data} );
  }


export async function getMyTodayBook(){
return await axios.get(
    'https://djh20.ipdisk.co.kr:8000/api/book/my/',{withCredentials: true})
    .catch(error => {return error.response}).then(res => {return res.data} );
}


export async function getCheckInQRdata(book_id){
    return await axios.get(
        'https://djh20.ipdisk.co.kr:8000/api/book/checkin/qr',{params : {book_id: book_id}},{withCredentials: true})
        .catch(error => {return error.response}).then(res => {return res.data} );
}

export async function getCheckOutQRdata(book_id){
    return await axios.get(
        'https://djh20.ipdisk.co.kr:8000/api/book/checkout/qr',{params : {book_id: book_id}},{withCredentials: true})
        .catch(error => {return error.response}).then(res => {return res.data} );
}


export async function unbook(book_id){
    return await axios.post(
        'https://djh20.ipdisk.co.kr:8000/api/book/unbook/',{book_id: book_id},{withCredentials: true})
        .catch(error => {return error.response}).then(res => {return res.status} );
}


export async function book(start , end, room_id){
    return await axios.post(
        'https://djh20.ipdisk.co.kr:8000/api/book/',{start: start, end:end, room_id:room_id},{withCredentials: true})
        .catch(error => {return error.response}).then(res => {return res.status} );
}

export async function getMyTodayWaitList(){
    return await axios.get(
        'https://djh20.ipdisk.co.kr:8000/api/book/wait/load/',{withCredentials: true})
        .catch(error => {return error.response}).then(res => {return res.data} );
}

export async function addWait(start, end){
    return await axios.post(
        'https://djh20.ipdisk.co.kr:8000/api/book/wait/add/',{start: start, end:end},{withCredentials: true})
        .catch(error => {return error.response}).then(res => {return res.status} );
}