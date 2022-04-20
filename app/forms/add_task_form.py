from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DateField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import db, Task 

class AddTaskForm(FlaskForm):
    task_name = StringField('task_name', validators = [DataRequired()])
    description = TextAreaField('description', validators = [DataRequired()])
    due_date = DateField('due_date')
    project = StringField('project')
    labels = StringField('labels')
    priority = IntegerField('priority')

