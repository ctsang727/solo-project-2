from flask import Blueprint, jsonify, request, redirect, url_for
from app.models import db, Task

task_routes = Blueprint('tasks', __name__)

@task_routes.route('/<int:id>')
def tasks(id):
    #user_id = request.json['userId']

    print('hello')
    tasks = Task.query.filter_by(user_id = id)
    # print('999999999999', tasks)
    # for task in tasks: 
    #     print('--------------', task.task_to_dict(), '----------')
    return {'tasks': [task.task_to_dict() for task in tasks]}

@task_routes.route('/specific/<int:id>')
def specific_task(id):
    #user_id = request.json['userId']

    print('hello')
    task = Task.query.get(id)
    print('!!!!!!!!', task)
    # for task in tasks: 
    #     print('--------------', task.task_to_dict(), '----------')
    return task.task_to_dict()

@task_routes.route('/new', methods=['POST'])
def new_task():

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
    
    return task.task_to_dict()

@task_routes.route('/edit', methods = ['PUT'])
def edit_task():
    taskId=request.json['taskId']
    task = Task.query.get(taskId)

    user_id=request.json['userId']
    task_name = request.json['taskName']
    description = request.json['taskDesc']
    due_date = request.json['dueDate']
    project_id = request.json['projectId']
    labels = request.json['labels']
    priority = request.json['priority']

    task.task_name = task_name
    task.description = description,
    task.due_date = due_date,
    task.project_id = project_id,
    task.labels = labels,
    task.priority = priority
   

    db.session.add(task)
    db.session.commit()
    
    return task.task_to_dict()
@task_routes.route('/delete/<int:id>', methods = ['DELETE'])
def delete_task(id):
    
    # task_id = request.json['taskId']
    # task = Task.query.get(id)
    # print('@@@@@@@@', task)
    print('HERE')
    
    print(id)
    task = Task.query.get(id)

    db.session.delete(task)
    db.session.commit()

    return task.task_to_dict()