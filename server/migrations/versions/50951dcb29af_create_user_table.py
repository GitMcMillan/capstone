"""create user table

Revision ID: 50951dcb29af
Revises: 8289739d45ec
Create Date: 2024-12-06 12:40:55.299264

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '50951dcb29af'
down_revision = '8289739d45ec'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('Test1')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Test1',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('test_data', sa.VARCHAR(), nullable=True),
    sa.Column('test_data2', sa.VARCHAR(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('users')
    # ### end Alembic commands ###
