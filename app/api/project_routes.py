from flask import Blueprint, jsonify, request, redirect, url_for
from app.models import db, Task, Project, user

project_routes = Blueprint('projects', __name__)

@project_routes.route('/<int:id>')
def get_projects(id):
    #print('111111111111', id)
    projects = Project.query.filter_by(user_id = id)
    return {'projects': [project.project_to_dict() for project in projects]}

@project_routes.route('/tasks/<int:id>')
def get_project_tasks(id):
    tasks = Task.query.filter_by(project_id = id)
    # for task in tasks: 
    #     print('--------------', task.task_to_dict(), '----------')
    return {'project_tasks': [task.task_to_dict() for task in tasks]}

@project_routes.route('/new', methods=['POST'])
def new_project():
    #print('###########')
    user_id=request.json['userId']
    color = request.json['color']
    project_name = request.json['projectName']
    
    project = Project(
        user_id = user_id,
        project_name = project_name,
        color = color,
    )

    db.session.add(project)
    db.session.commit()
    
    return project.project_to_dict()

@project_routes.route('/edit/<int:id>', methods = ['PUT'])
def edit_task(id):
    project = Project.query.get(id)

    user_id = request.json['userId']
    project_name = request.json['projectName']
    color = request.json['color']

    project.project_name = project_name 
    project.color = color

    db.session.add(project)
    db.session.commit()
    return project.project_to_dict()

@project_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_project(id):
    project = Project.query.get(id)
    

    db.session.delete(project)
    db.session.commit()

    return project.project_to_dict()