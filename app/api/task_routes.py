from flask import Blueprint, jsonify, request, redirect, url_for
from app.models import db, Task
from datetime import date, datetime, timedelta

today = date.today()
upcoming = date(today.year + 1, today.month, today.day)

print('\n\n\n', upcoming > today)
task_routes = Blueprint('tasks', __name__)

@task_routes.route('/<int:id>')
def tasks(id):
    tasks = Task.query.filter_by(user_id = id)

    # for task in tasks: 
    #     print('--------------', task.task_to_dict(), '----------')
    return {'tasks': [task.task_to_dict() for task in tasks]}

@task_routes.route('/today/<int:id>')
def today_tasks(id):
    tasks = Task.query.filter_by(user_id = id).filter_by(due_date = today)


    for task in tasks: 
        print('--------------', task.task_to_dict(), '----------')
    return {'tasks': [task.task_to_dict() for task in tasks]}

@task_routes.route('/upcoming/<int:id>')
def upcoming_tasks(id):
    print('############')
    tasks = Task.query.filter(and_(user_id = id), (due_date < today))


    for task in tasks: 
        print('@@@--------------', task.task_to_dict(), '----------')
    return {'tasks': [task.task_to_dict() for task in tasks]}

@task_routes.route('/specific/<int:id>')
def specific_task(id):

    task = Task.query.get(id)
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

@task_routes.route('/edit/<int:id>', methods = ['PUT'])
def edit_task(id):
    
    task = Task.query.get(id)

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

    task = Task.query.get(id)

    db.session.delete(task)
    db.session.commit()

    return task.task_to_dict()


# task = AddTaskForm()

# if task.validate_on_submit():
#     task = Task(
#         user_id = user_id,
#         task_name = task_name,
#         description = description,
#         due_date = due_date,
#         project_id = project_id,
#         labels = labels,
#         priority = priority

#     )

#     db.session.add(task)
#     db.session.commit()

#     return task.task_to_dict()
# else:
#     return 'bad data'