from django.urls import path

from . import views
urlpatterns = [
    path('today/', views.getTodayBookInfo,name='getTodayBookInfo'),
    path('my/', views.get_my_today_book,name='get_my_today_book'),
    path('checkin/qr/', views.getCheckInQR,name='getQRdata'),
    path('checkout/qr/', views.getCheckOutQR,name='getQRdata'),
    path('checkin/', views.check_in,name='getQRdata'),
    path('checkout/', views.check_out,name='getQRdata'),
    path('unbook/', views.unbook,name='unbook'),
    path('', views.book,name='book'),
    path('checkout/', views.book,name='checkout'),
    path('wait/add/', views.add_wait,name='get_my_today_wait'),
    path('wait/load/', views.get_my_today_wait,name='get_my_today_wait'),
]
