from flask import Blueprint, jsonify, request
from app.models import db, Task

task_routes = Blueprint('tasks', __name__)

@task_routes.route('')
def tasks():
    print('hello')
    tasks = Task.query.all()
    print(tasks)
    # for task in tasks: 
    #     print('--------------', task.task_to_dict(), '----------')
    return {'tasks': [task.task_to_dict() for task in tasks]}

@task_routes.route('/new', methods=['POST'])
def taskUpload():

    user_id=request.json['userId']
    task_name = request.json['taskName']
    description = request.json['taskDesc']
    due_date = request.json['dueDate']
    project_id = request.json['projectId']
    labels = request.json['labels']
    priority = request.json['priority']
    

    task = Task(
        user_id = user_id,
        task_name = task_name,
        description = description,
        due_date = due_date,
        project_id = project_id,
        labels = labels,
        priority = priority

    )

    db.session.add(task)
    db.session.commit()
    
    return task.to_dict()