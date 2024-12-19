"""made phone number a string

Revision ID: a3376a19900b
Revises: 6366b5caa17d
Create Date: 2024-12-19 12:46:52.417467

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a3376a19900b'
down_revision = '6366b5caa17d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bookstores', schema=None) as batch_op:
        batch_op.alter_column('phone_number',
               existing_type=sa.INTEGER(),
               type_=sa.String(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bookstores', schema=None) as batch_op:
        batch_op.alter_column('phone_number',
               existing_type=sa.String(),
               type_=sa.INTEGER(),
               existing_nullable=False)

    # ### end Alembic commands ###