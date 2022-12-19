from flask.cli import AppGroup
from .users import seed_users, undo_users
from .tasks import seed_tasks, undo_tasks
from .projects import seed_projects, undo_projects
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # seed_users()
    # seed_tasks()
    # seed_projects()

    if environmnet == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.commit()
    seed_users()
    seed_tasks()
    seed_projects()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_tasks()
    undo_projects()
    # Add other undo functions here
