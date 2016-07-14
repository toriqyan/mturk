# from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render_to_response
from mturk.models import Task
from django.views.decorators.csrf import csrf_exempt

AMAZON_HOST = "https://workersandbox.mturk.com/mturk/externalSubmit"
# AMAZON_HOST = "https://www.mturk.com/mturk/externalSubmit"

@csrf_exempt
def index(request):
    print(request.GET.get("reject",""))
    print(request)
    if request.GET.get("reject"):
        Task.objects.create(workerId = request.GET.get("workerId", ""), 
            assignmentId = request.GET.get("assignmentId", ""),
            result = "reject"
            )
        db_rows = Task.objects.filter(workerId = request.GET.get("workerId", ""))
        render_data = {
            "worker_id": request.GET.get("workerId", ""),
            "assignment_id": request.GET.get("assignmentId", ""),
            "amazon_host": AMAZON_HOST,
            "hit_id": request.GET.get("hitId", ""),
            "image_index": str(len(db_rows)),
        }
        print('database')
    else: 
        if request.GET.get("assignmentId") == "ASSIGNMENT_ID_NOT_AVAILABLE":
            # worker hasn't accepted the HIT (task) yet
            pass
        else:
            # worked accepted the task
            pass

        worker_id = request.GET.get("workerId", "")
        if (worker_id != ""):
            db_rows = Task.objects.filter(workerId = request.GET.get("workerId", ""))
            i = len(db_rows)
            
            assig = Task.objects.filter(workerId = request.GET.get("workerId", ""),
                                        assignmentId = request.GET.get("assignmentId", ""))
            if (len(assig) < 0):
                Task.objects.create(workerId = request.GET.get("workerId", ""), 
                    assignmentId = request.GET.get("assignmentId", ""),
                    result = request.GET.get("user-input", ""))
            # print(worker_id)
        else:
            i = 0
        render_data = {
            "worker_id": request.GET.get("workerId", ""),
            "assignment_id": request.GET.get("assignmentId", ""),
            "amazon_host": AMAZON_HOST,
            "hit_id": request.GET.get("hitId", ""),
            "image_index": str(i),
        }

    response = render_to_response("index.html", render_data)
    # without this header, your iFrame will not render in Amazon
    response['x-frame-options'] = 'this_can_be_anything'
    return response