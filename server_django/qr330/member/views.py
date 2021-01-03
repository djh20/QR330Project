from django.shortcuts import render
from .jwt_manager import *
from django.http import JsonResponse
import json
from .models import Member
from django.views.decorators.csrf import csrf_exempt
import re
import os
from pywebpush import webpush, WebPushException
from book.models import Book
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
def updateSubscribe(request):
    subscribe_info = json.loads(request.body.decode('utf-8'))
    print(request.COOKIES,"Dasdas")
    member_id = get_member_info(request.COOKIES)['id']
    member = Member.objects.get(id=member_id)
    if subscribe_info != None :
        member.subscribe = str(subscribe_info['subscribe']).strip("'<>()").replace('\'', '\"').replace("None","\"None\"")
        print(subscribe_info, 1)
        print(member.subscribe, 2)
        member.save()
        return JsonResponse({'data':"성공"},status=200)
    return JsonResponse({'data':"실패"},status=400)



@csrf_exempt
def login(request):
    loginInfo = json.loads(request.body.decode('utf-8'))
    if request.method == 'POST':    
        data = {}
        try:
            member = Member.objects.get(id=loginInfo['id'])
            password = member.pw
            if loginInfo['pw'] != member.pw:
                raise Exception()
            data['id'] = loginInfo['id']
            data['pw'] = loginInfo['pw']
            jwt_data = encode_jason_to_jwt(data)
            res = JsonResponse({'data' : '로그인 성공'}, status = 200)
            res.set_cookie('jwt', jwt_data, max_age=3600)
            return res
            
        except Exception as e:
            print(e)
            return JsonResponse({ 'message' : '로그인 실패'}, status=452)

def get_qr_url(request):
    return

def register(request):
    return
@csrf_exempt
def user_process_info(request):
    if request.method == 'POST':
        registInfo = json.loads(request.body.decode('utf-8'))
        return user_create_info(registInfo)
        
def isExist_id(id):
    if  Member.objects.filter(id=id).exists():
        return True
    else:
        return False
def isValid_password(password):
    passwordCheck = re.compile('^(?=.*[a-zA-Z])(?=.*[!@#$%^~*+=-])(?=.*[0-9]).{8,16}$')
    if not passwordCheck.match(password):
        return False
    else:
        return True 
@csrf_exempt
def user_create_info(registInfo):
    data ={}
    # 회원가입 정보 검증 과정
    if isExist_id(registInfo['id']):
        return_data = {'message' : '이미 존재하는 아이디입니다.'}
        return JsonResponse(return_data, status = 453)
    if not isValid_password(registInfo['pw']):
        return_data = {'message' : '잘못된 비밀번호 형식입니다.\n영문자,숫자,특수문자 포함 8~16자\n &나 | 제외'}
        return JsonResponse(return_data, status = 456)
    # 회원가입 정보 등록 과정
    try:
        password = registInfo['pw']
        member = Member(id=registInfo['id'], pw=password, name=registInfo['name'])
        member.save()
        data['id'] = member.id
        jwt_data = encode_jason_to_jwt(data)
        res = JsonResponse({'message' : '환영합니다!'},status=200)
        res.set_cookie('jwt', jwt_data, max_age=3600)
        return res
    except Exception as e:
        print(e)
        return_data = {'message' : '회원가입 실패, 관리자에게 문의바랍니다.'}
        return JsonResponse(return_data, status=459)