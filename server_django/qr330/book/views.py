from django.shortcuts import render
from django.http import JsonResponse
import datetime 
from .models import *
from member import jwt_manager
from django.views.decorators.csrf import csrf_exempt
import json
from pywebpush import webpush, WebPushException
VAPID_PRIVATE_KEY = "I_JscWZUNqyI-vtS9k9k9CP4KqPILnc9--GAJaVw3z8"
VAPID_PUBLIC_KEY = "BIXjDqYFNcLB86S6hsfCGkWXsaSQUMNDuJCA_moSEJnLzIomlX08WwA25gg1nj24VkVU363afcK-Nt27eQYZrpI"
 
VAPID_CLAIMS = {
    "sub": "mailto:djh10209@gmail.com"
}

def send_web_push(subscription_information, message_body):
    return webpush(
        subscription_info=subscription_information,
        data=message_body,
        vapid_private_key=VAPID_PRIVATE_KEY,
        vapid_claims=VAPID_CLAIMS
    )

@csrf_exempt
def book(request):
    book_info = json.loads(request.body.decode('utf-8'))
    start = book_info['start']
    end = book_info['end']
    room_id = book_info['room_id']
    member_id = jwt_manager.get_member_info(request.COOKIES)
    member = Member.objects.filter(id = '20150437' ).first()
    book = Book(member=member, room_id=room_id, start=start, end=end)
    book.save()
    return JsonResponse({'data' : "성공적으로 등록되었습니다"}, status=200)

@csrf_exempt
def unbook(request):
    book_info = json.loads(request.body.decode('utf-8'))
    book_id = book_info['book_id']
    book = Book.objects.filter(book_id=book_id).first()
    send_event_to_wait(book)
    book.delete()
    return JsonResponse({'data' : "성공적으로 삭제되었습니다"}, status=200)

def send_event_to_wait(cancel_book):
    waits = Wait.objects.filter(start__gte = cancel_book.start, end__lte = cancel_book.end)
    for wait in waits:
        waiter = wait.member
        subscribe = waiter.getSubscribe()
        if waiter.subscribe != None:
            send_web_push(json.loads(subscribe), "{}시부터 {}시 사이에 예약이 가능합니다. 예약을 진행하시겠습니까?".format(cancel_book.start,cancel_book.end))

    
    

def get_my_today_book(request):
    member_id = "20150437" 
    member = Member.objects.get(id=member_id)
    books = Book.objects.filter(member=member)
    data = []
    for book in books:
        data.append(book.getDic())
    return JsonResponse({'data' : data} , status=200)


@csrf_exempt
def add_wait(request):
    wait_info = json.loads(request.body.decode('utf-8'))
    member = Member.objects.get(id="20150437")
    print(1)
    wait = Wait(member = member, start = wait_info['start'], end = wait_info['end'])
    print(2)
    wait.save()
    print(3)
    return JsonResponse({'data' : '성공적으로 등록되었습니다'}, status=200)


    
def get_my_today_wait(request):
    member_id = "20150437" 
    member = Member.objects.get(id=member_id)
    waits = Wait.objects.filter(member=member)
    data = []
    for wait in waits:
        data.append(wait.getDic())
    return JsonResponse({'data' : data} , status=200)

def check_in(request):
    qr = request.GET.get('data')
    book = Book.objects.filter(checkin_QR = qr).first()
    book.isCheckIn = True
    book.save()
    return JsonResponse({'data' : '성공'} , status=200)
def check_out(request):
    qr = request.GET.get('data')
    print(qr)
    book = Book.objects.filter(checkout_QR = qr).first()
    book.isCheckOut = True
    book.save()
    return JsonResponse({'data' : '성공'} , status=200)

def getTodayBookInfo(request):
    room_id = request.GET.get('room_id')
    print(request.GET)
    today = datetime.date.today()
    # books = Book.objects.filter(date = datetime.date(today.year, today.month, today.day), room_id=room_id)
    books = Book.objects.filter(room_id=room_id)
    print(room_id)
    print(books)
    data = []
    for x in range(0,24):
        data.append("N")
    for book in books:
        for t in range(book.start, book.end):
            data[t] = "Y"
    print(data)
    return JsonResponse({'data' : data}, status=200)

@csrf_exempt
def verifyQR(request):
    data = request.GET['data']
    if data == "test":
        return JsonResponse({'data' : '성공'},status=200)
    else:
        return JsonResponse({'data' : '실패'},status=400)

def getCheckInQR(request):
    book_id = request.GET.get('book_id')
    book = Book.objects.filter(book_id=book_id).first()
    book.checkin_QR = 'checkin-' + datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") +book_id
    book.gen_time_checkin_qr = datetime.datetime.now()
    book.save()
    return JsonResponse({'data' : book.checkin_QR},status=200)

def getCheckOutQR(request):
    book_id = request.GET.get('book_id')
    book = Book.objects.filter(book_id=book_id).first()
    
    book.checkout_QR = 'checkout-' + datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") +book_id
    book.gen_time_checkout_qr = datetime.datetime.now()
    book.save()
    return JsonResponse({'data' : book.checkout_QR},status=200)