"""Rename column to password_hash

Revision ID: 7c82f01c05b3
Revises: 529359838174
Create Date: 2024-12-11 23:30:27.089126

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.engine.reflection import Inspector

# revision identifiers, used by Alembic.
revision = '7c82f01c05b3'
down_revision = '529359838174'
branch_labels = None
depends_on = None


def column_exists(table_name, column_name, bind):
    """Check if a column exists in the table."""
    inspector = Inspector.from_engine(bind)
    columns = [col['name'] for col in inspector.get_columns(table_name)]
    return column_name in columns


def upgrade():
    bind = op.get_bind()
    if column_exists("users", "_password_hash", bind):
        with op.batch_alter_table('users') as batch_op:
            batch_op.alter_column('_password_hash', new_column_name='password_hash')


def downgrade():
    bind = op.get_bind()
    if column_exists("users", "password_hash", bind):
        with op.batch_alter_table('users') as batch_op:
            batch_op.alter_column('password_hash', new_column_name='_password_hash')
