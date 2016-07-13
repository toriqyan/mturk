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
    # if request.GET.get("image_index"):
    #     Task.objects.create(workerId = request.GET.get("workerId", ""), 
    #         assignmentId = request.GET.get("assignmentId", "")) 
    #         # result = request.GET.get("user-input", "")
    #         # image_index = int(request.GET.get("image_index", "")))
    #     db_rows = Task.objects.filter(workerId = request.GET.get("workerId", ""))
    #     render_data = {
    #         "worker_id": request.GET.get("workerId", ""),
    #         "assignment_id": request.GET.get("assignmentId", ""),
    #         "amazon_host": AMAZON_HOST,
    #         "hit_id": request.GET.get("hitId", ""),
    #         "image_index": str(len(db_rows))
    #     }
    # else: 
    if request.GET.get("assignmentId") == "ASSIGNMENT_ID_NOT_AVAILABLE":
        # worker hasn't accepted the HIT (task) yet
        pass
    else:
        # worked accepted the task
        pass

    worker_id = request.GET.get("workerId", "")
    # Task.objects.create(workerId = request.GET.get("workerId", ""), 
    #     assignmentId = request.GET.get("assignmentId", ""),
    #     image_index=int(request.GET.get("imageIndex", "")))
    # if worker_id in get_worker_ids_past_tasks():
    #     # you might want to guard against this case somehow
    #     pass
    print(request.GET.get("imageIndex", ""))
    db_rows = Task.objects.filter(workerId = request.GET.get("workerId", ""))
    i = -1
    if (len(db_rows) > 0):
        i = db_rows[len(db_rows)-1].image_index
        Task.objects.create(workerId = request.GET.get("workerId", ""), 
        assignmentId = request.GET.get("assignmentId", ""),
        image_index=0)
    else :
        Task.objects.create(workerId = request.GET.get("workerId", ""), 
        assignmentId = request.GET.get("assignmentId", ""))
        # image_index=int(request.GET.get("imageIndex", "")))
    render_data = {
        "worker_id": request.GET.get("workerId", ""),
        "assignment_id": request.GET.get("assignmentId", ""),
        "amazon_host": AMAZON_HOST,
        "hit_id": request.GET.get("hitId", ""),
        "image_index": str(i+1)
    }

    response = render_to_response("index.html", render_data)
    # without this header, your iFrame will not render in Amazon
    response['x-frame-options'] = 'this_can_be_anything'
    return response