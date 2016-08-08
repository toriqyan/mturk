# from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render_to_response
from mturk.models import Task
from django.views.decorators.csrf import csrf_exempt
from boto.mturk.connection import MTurkConnection
AWS_ACCESS_KEY_ID = 'AKIAJJ5WX43A4CZYUXPQ'
AWS_SECRET_ACCESS_KEY = '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'
# HOST = 'mechanicalturk.amazonaws.com'
HOST = 'mechanicalturk.sandbox.amazonaws.com'
connection = MTurkConnection(aws_access_key_id=AWS_ACCESS_KEY_ID,
                             aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                             host=HOST)
NUM = 10
blocked = ['A2NVGXXXRTFNPB','A2EKPA2DR5VSA8','A11AMW2SBW2AV4', 'A3GMNUWXJ7JBZ4', 'A105Q9KX0PVR4N', 'A2SBISQJE2ZPJQ', 'A1ESKJFDQUMBL4', 'A1D9FOXZ0UT0L2', 'A3HMDGRGC5JB7E', 'ANPKFRTF5KZ1Z', 'A37Q6EKTGNNS7K', 'AVQ23YRFWZKHH', 'A2YB18JHC2C7GF', 'A2JBJFPFG38X9C', 'A31EWGHHCQ2XMZ', 'A335ZY7K2LIHHY', 'A21M04VTE53E2K', 'A296HTKGCX7FY9', 'A218IVWG2NSFR6', 'A2Z6NL0CTXY0ZB', 'A1YNGE7LM9TQHL', 'A2LBUK8ZN41NN6', 'A7M83K967CGI0', 'A2XJAGYVNVPCP0', 'A18RBR6QB1LPCE', 'A3AMX0BADW0LX7', 'ASTUVXX56HNU2', 'A17J1CE7N49Z9D', 'A27IUQDZPHETTP', 'A122E99M2DQY1G', 'ATP5AJPL8E56O', 'A11SE1OE1O9GN8', 'A3OOGICWSLXYB0', 'AY0758IITCGOZ', 'A1Q2VSLNL3XI4C', 'A3F23C3ABMM0W0']

# AMAZON_HOST = "https://workersandbox.mturk.com/mturk/externalSubmit"
AMAZON_HOST = "https://www.mturk.com/mturk/externalSubmit"

@csrf_exempt
def index(request):
    if request.GET.get("assignmentId") == "ASSIGNMENT_ID_NOT_AVAILABLE" or request.GET.get("hitId","") =="":
        render_data = {
            "worker_id": request.GET.get("workerId", ""),
            "assignment_id": request.GET.get("assignmentId", ""),
            "amazon_host": AMAZON_HOST,
            "hit_id": request.GET.get("hitId", ""),
            "image_index": "0",
        }
    else:
        if ((request.GET.get("workerId", "") in blocked): 
            connection.block_worker(spammer, reason)
            render_data = {
                "worker_id": request.GET.get("workerId", ""),
                "assignment_id": request.GET.get("assignmentId", ""),
                "amazon_host": AMAZON_HOST,
                "hit_id": request.GET.get("hitId", ""),
                "image_index": '-1',
            }
        else:
            i = 0
            a = Task.objects.all()
            if (len(a) == 0):
                i = 0
            else:
                i = a[len(a)-1].image_index+NUM
            record = Task.objects.filter(hit_id=request.GET.get("hitId", ""))
            if (len(record) == 0):
                Task.objects.create(
                    hit_id=request.GET.get("hitId", ""),
                    image_index=i
                    )
                imageIndex = i
            else:
                imageIndex=record[0].image_index
            render_data = {
                "worker_id": request.GET.get("workerId", ""),
                "assignment_id": request.GET.get("assignmentId", ""),
                "amazon_host": AMAZON_HOST,
                "hit_id": request.GET.get("hitId", ""),
                "image_index": str(imageIndex),
            }
        

    response = render_to_response("index.html", render_data)
    # without this header, your iFrame will not render in Amazon
    response['x-frame-options'] = 'this_can_be_anything'
    return response