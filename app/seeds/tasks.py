from app.models import db, Task
from datetime import date

today = date.today()

def seed_tasks():
    # task1 = Task(
    #     user_id = 1,
    #     project_id = None,
    #     task_name = 'Brush Teeth' ,
    #     description = 'brush teeth for 2 mins',
    #     due_date = today.strftime("%b %d, %Y"),
    #     labels = None,
    #     priority = None ,
    #     created_at = today.strftime("%B %d, %Y"),
    #     updated_at = today.strftime("%B %d, %Y")
    # )

    task2 = Task(
        user_id = 1,
        project_id = None,
        task_name = 'Wash hands' ,
        description = 'with soap',
        due_date = today.strftime("%b %d, %Y"),
        labels = None,
        priority = 1,
        created_at = today.strftime("%B %d, %Y"),
        updated_at = today.strftime("%B %d, %Y")
    )

    task3 = Task(
        user_id = 1,
        project_id = None,
        task_name = 'go to dentist',
        description = 'remember dentist name is Bob',
        due_date = today.strftime("%b %d, %Y"),
        labels = None,
        priority = None,
        created_at = today.strftime("%B %d, %Y"),
        updated_at = today.strftime("%B %d, %Y")
    )

    #db.session.add(task1)
    # db.session.add(task2)
    # db.session.add(task3)

    db.session.commit()

def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()