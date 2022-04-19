from flask import Blueprint, jsonify, request, redirect, url_for
from app.models import db, Task, Project 

project_routes = Blueprint('projects', __name__)

@project_routes.route('/<int:id>')
def get_projects(id):
    print('111111111111', id)
    projects = Project.query.filter_by(user_id = id)
    return {'projects': [project.project_to_dict() for project in projects]}

@project_routes.route('/new', methods=['POST'])
def new_project():
    print('###########')
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