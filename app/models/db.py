from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    task_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    due_date = db.Column(db.DateTime, nullable=False)
    labels = db.Column(db.String(50))
    priority = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)

    projects = db.relationship('Project', backref = 'tasks', cascade='all, delete')



class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'))
    project_name = db.Column(db.String(255), nullable=False)
    color = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)

    tasks = db.relationship('Task', backref='projects', casecade='all, delete')
