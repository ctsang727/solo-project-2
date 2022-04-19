from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"))
    task_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    due_date = db.Column(db.DateTime, nullable=False)
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

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    project_name = db.Column(db.String(255), nullable=False)
    color = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    # onupdate=db.func.current_timestamp()


    tasks = db.relationship('Task', backref='projects', cascade='all, delete')

    def project_to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'project_name':self.project_name,
            'color': self.color, 
            #'tasks': [t_to_dict() for t in self.tasks]
        }