# from django.shortcuts import render

# Create your views here.
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_exempt
import json
import subprocess
# import shlex
import ast

@csrf_exempt
def index(request):
    print("reach")
    # c_line = 'curl -i -H "Content-Type: application/json" -d \'{"key1":"v", "key2":"e", "key3":"t"}\' https://wix5uh8vve.execute-api.us-west-2.amazonaws.com/prod/clueless/get-profile-by-id ; echo'
    # commands = ['curl', '-i', '-H', 'Content-Type: application/json', '-d', '{"key1":"v", "key2":"e", "key3":"t"}', 'https://wix5uh8vve.execute-api.us-west-2.amazonaws.com/prod/clueless/get-profile-by-id', ';', 'echo']
    # commands = ['curl', '-i', '-H', 'Content-Type: application/json', '-d', str(json.dumps(a)), 'https://wix5uh8vve.execute-api.us-west-2.amazonaws.com/prod/clueless/getoutfitimagesbykeyword', ';', 'echo']
    # p = subprocess.Popen(commands, stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    # out, err = p.communicate()
    # print(out)
    # print(err)
    # print(dict(request.POST))
    if (dict(request.GET) != {}):
    # if ('response' in str(out)):
        return display(request)
    print("index")
    render_data = {}
    response = render_to_response("index.html", render_data)
    # without this header, your iFrame will not render in Amazon
    response['x-frame-options'] = 'this_can_be_anything'
    return response

@csrf_exempt
def display(request):
    print("display")
    # print(dict(request.POST))
    # print(dict(request.GET))
    a = json.loads(json.dumps(request.GET))
    a['age'] = int(a['age'])
    a['temperature'] = int(a['temperature'])
    print(a['items'])
    a['items']= ast.literal_eval(json.loads(json.dumps(a['items'])))
    for e in a['items']:
        e['collar'] = (e['collar']=='true')
        e['hood'] = (e['hood']=='true')
    # print(type(json.dumps(a)))
    print(json.dumps(a))
    commands = ['curl', '-H', 'Content-Type: application/json', '-d', json.dumps(a), 'https://wix5uh8vve.execute-api.us-west-2.amazonaws.com/prod/clueless/getoutfitimagesbykeyword']
    p = subprocess.Popen(commands, stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    out, err = p.communicate()
    print(out)
    test = out.decode("utf-8").split('\n')
    print(test[0])
    # print(err)
    response = test[0]
    # print(response)
    # array = json.loads(response)
    render_data = {
        "images": response,
    }
    response = render_to_response("display.html", render_data)
    # without this header, your iFrame will not render in Amazon
    response['x-frame-options'] = 'this_can_be_anything'
    return response