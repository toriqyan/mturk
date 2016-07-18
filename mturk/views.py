# from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render_to_response
from mturk.models import Task
from django.views.decorators.csrf import csrf_exempt

# AMAZON_HOST = "https://workersandbox.mturk.com/mturk/externalSubmit"
AMAZON_HOST = "https://www.mturk.com/mturk/externalSubmit"

past_workers=["A2ZRJMJTE6ID97", "A326JADUNTB5S", "A4158R4Y06ZB4", "A2ZDQ7YVKJUV8E", "A2H8G0I62KUU55", "A3D0SZN2SSX1", "A3PVIRB9JTIZHJ", "A2D2Q1GXV9VN2A", 
"A37WDOIQH6JM6V", "A1ESKJFDQUMBL4", "A3K2QVEXD98RKN", "A3ULZGQA5AQMTD", "AQ75BOFGS6MOJ", "ABVM2KJ7CRNZ0", "AKSJ3C5O3V9RB", "A1K1O8P9K3LDPT", "A13YQKWACRRA9F", 
"AQHEHXSUXXYYH", "A1ZP5DU6LI3R03", "A2H3Z3EPMHDMEV", "A24BQT7XFB4Y3X", "A2NF9CC1MMCITK", "A3TRDQQJ3AOLEH", "A3N5118EFMP5E3", "A161I6SGXNY96M", "A356GXVAYWN0DV", 
"A2QA4U882W4L0B", "AAAO8D2Z7CHEG", "A3NAQBUBIV489Q", "A3EI4AOY9AZIQY", "A11UOM2LJ69AE7", "A3BKXSQJA4XNOD", "A2U83S62P8SZ6T", "AKK7KZ9LR9IXT", "AV6GET04HOQMF", 
"A3AR02NBHLQJI5", "A328TBFHHQ3HT8", "A3AFYJC1KL8I13", "A31NREVPH2XDCO", "A29H49SJ6D9PN7", "AGKUZPBBPK7X9", "A1K8HDQLN405XX", "A1E4813YE10RRF", "A2341KCW7BI2NS", 
"AG2RMZJ7QVGKZ", "A1APM81N6VFTNW", "A3MOCNK2SMAMMD", "A3QLUTH89HZQC9", "A3P0LQCNIXWOVJ", "A1DAC6HSW711N0", "A24IWVVSCGT50N", "A1PNVYCV1ND3IB", "A2NKOJF1DVMZHQ", 
"A1V7SD5F2ORF7P", "A119EX2L0DNN1B", "A37B6B9WTLUG2", "A2NHQTBQGNFWH3", "A1BL85Y2FLABPT", "AZ7GSYRVDR23N", "A38U55DZ9PDC2S", "A3PSIT0A7OU2FL", "A39FWQPP547JQF", 
"A33NU765MVM5MN", "A174BCWX0VMM1B", "A1QCTP7L4S1D4T", "A2AV03NOIRY3B7", "ARQYCKZLIPXFH", "A2VE8DIBULZNNV", "A3CANIRUKLHVVC", "A1FI4XZJQXOGPF", "A34UYX47TTKO6B", 
"A38L1X3KD91QVM", "A1IM8G6UNAGQ7S", "AERYYDIWWC0QS", "A3S4N8DF2D06NH", "A250MET8DJSJNM", "A1UNQI97DYWGU6", "A33FE2XMG8ZQ7", "A11X07ZTWGFCMN", "A5ARL0TMXUWEQ", 
"AJI6CVF2D7CCS", "A10V97TRYZE3BI", "A2YQAAIP1SLQEM", "A3AMX0BADW0LX7", "A13FVM2C914A3H", "AMPL5JF26079G", "AIZYX49EMVJKB", "APSGMQ4NNC0O", "A1SXP2KIVGP1QK", 
"A2CK0OXMPOR9LE", "A1E56264OK9UN5", "ACAODXECTUFRO", "A1I63OL2TAXTGJ", "A2FWMAJ0Z92JAY", "A3QLMSLL4AYTDT", "A3OW5EFQ5QFD19", "AM261EFK26D99", "A34SLWTNACPBMO", 
"A280RC0S51YKFT", "A2NVGXXXRTFNPB"]

@csrf_exempt
def index(request):
    print(request.GET.get("reject",""))
    print(request)
    if request.GET.get("reject"):
        if (request.GET.get("workerId", "") in past_workers):
            render_data = {
                "worker_id": request.GET.get("workerId", ""),
                "assignment_id": request.GET.get("assignmentId", ""),
                "amazon_host": AMAZON_HOST,
                "hit_id": request.GET.get("hitId", ""),
                "image_index": -1,
            }
        else: 
            Task.objects.create(workerId = request.GET.get("workerId", ""), 
                assignmentId = request.GET.get("assignmentId", ""),
                result = request.GET.get("reject",""),
                reject = "yes"
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
        if (request.GET.get("workerId", "") in past_workers):
            render_data = {
                "worker_id": request.GET.get("workerId", ""),
                "assignment_id": request.GET.get("assignmentId", ""),
                "amazon_host": AMAZON_HOST,
                "hit_id": request.GET.get("hitId", ""),
                "image_index": -1,
            }
        else:
            if (worker_id != ""):
                db_rows = Task.objects.filter(workerId = request.GET.get("workerId", ""))
                
                assig = Task.objects.filter(workerId = request.GET.get("workerId", ""),
                                            assignmentId = request.GET.get("assignmentId", ""))
                if (len(assig) == 0):
                    Task.objects.create(workerId = request.GET.get("workerId", ""), 
                        assignmentId = request.GET.get("assignmentId", ""),
                        result = request.GET.get("user-input", ""),
                        reject = "no"
                        )
                # print(worker_id)
                i = len(db_rows)-1
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