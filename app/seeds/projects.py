from app.models import db, Project 
from datetime import date

today = date.today()

def seed_projects():
    project1 = Project(
        user_id = 1,
        project_name = 'First Project' ,
        color = 'yellow',
        created_at = today.strftime("%B %d, %Y"),
        updated_at = today.strftime("%B %d, %Y")
    )

    db.session.add(project1)

    db.session.commit()
    

def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()