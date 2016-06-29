# from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render_to_response
from blog.models import Task_timestamp
from django.views.decorators.csrf import csrf_exempt
import random

AMAZON_HOST = "https://workersandbox.mturk.com/mturk/externalSubmit"
# AMAZON_HOST = "https://www.mturk.com/mturk/externalSubmit"

@csrf_exempt
def index(request):
    # i = random.randint(1, 4)
    # print(request.GET.get("user-input", ""))
    if request.GET.get("count"):
        
    else:
        if request.GET.get("assignmentId") == "ASSIGNMENT_ID_NOT_AVAILABLE":
            # worker hasn't accepted the HIT (Task_timestamp) yet
            pass
        else:
            # worked accepted the Task_timestamp
            pass
        worker_id = request.GET.get("workerId", "")
        #if worker_id in get_worker_ids_past_Task_timestamps():
            # you might want to guard against this case somehow
        #   pass
        render_data = {
            "worker_id": request.GET.get("workerId", ""),
            "assignment_id": request.GET.get("assignmentId", ""),
            "amazon_host": AMAZON_HOST,
            "hit_id": request.GET.get("hitId", ""),
        }

    response = render_to_response("index.html", render_data)
    # without this header, your iFrame will not render in Amazon
    response['x-frame-options'] = 'this_can_be_anything'
    return response
