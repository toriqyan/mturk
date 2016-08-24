# from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render_to_response
from mturk.models import Task
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def index(request):
    if (request.GET.get("response", "") != ""):
        return display(request)
    render_data = {}
    response = render_to_response("index.html", render_data)
    # without this header, your iFrame will not render in Amazon
    response['x-frame-options'] = 'this_can_be_anything'
    return response

@csrf_exempt
def display(request):
    array = json.loads(request.GET.get("response", ""))
    render_data = {
        "images": array,
    }
    response = render_to_response("display.html", render_data)
    # without this header, your iFrame will not render in Amazon
    response['x-frame-options'] = 'this_can_be_anything'
    return response