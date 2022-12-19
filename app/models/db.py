from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

import os 
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

db = SQLAlchemy()

def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr

class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")))
    task_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    due_date = db.Column(db.Date, nullable=False)
    labels = db.Column(db.String(50))
    priority = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)

    #projects = db.relationship('Project', backref="tasks", cascade='all, delete')

    def task_to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'project_id': self.project_id,
            'task_name': self.task_name,
            'description': self.description,
            'due_date': self.due_date,
            'labels': self.labels,
            'priority': self.priority,
        }


class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    project_name = db.Column(db.String(255), nullable=False)
    color = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    


    tasks = db.relationship('Task', backref='projects', cascade='all, delete')

    def project_to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'project_name':self.project_name,
            'color': self.color, 
            
        }