"""reconfigured models

Revision ID: d1f48b10799a
Revises: 7c82f01c05b3
Create Date: 2024-12-12 14:38:28.209730

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd1f48b10799a'
down_revision = '7c82f01c05b3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('authors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bookstores',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.Column('phone_number', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('book_tags')
    op.drop_table('tags')
    op.drop_table('libraries')
    with op.batch_alter_table('books', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('bookstore_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('author_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_books_bookstore_id_bookstores'), 'bookstores', ['bookstore_id'], ['id'])
        batch_op.create_foreign_key(batch_op.f('fk_books_author_id_authors'), 'authors', ['author_id'], ['id'])
        batch_op.create_foreign_key(batch_op.f('fk_books_user_id_users'), 'users', ['user_id'], ['id'])
        batch_op.drop_column('author')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('books', schema=None) as batch_op:
        batch_op.add_column(sa.Column('author', sa.VARCHAR(), nullable=False))
        batch_op.drop_constraint(batch_op.f('fk_books_user_id_users'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_books_author_id_authors'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_books_bookstore_id_bookstores'), type_='foreignkey')
        batch_op.drop_column('author_id')
        batch_op.drop_column('bookstore_id')
        batch_op.drop_column('user_id')

    op.create_table('libraries',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.Column('book_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], name='fk_libraries_book_id_books'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_libraries_user_id_users'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tags',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('genre', sa.VARCHAR(), nullable=False),
    sa.Column('best_seller', sa.BOOLEAN(), nullable=False),
    sa.Column('fiction', sa.BOOLEAN(), nullable=False),
    sa.Column('award_winner', sa.BOOLEAN(), nullable=False),
    sa.Column('new_release', sa.BOOLEAN(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('book_tags',
    sa.Column('book_id', sa.INTEGER(), nullable=False),
    sa.Column('tag_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], name='fk_book_tags_book_id_books'),
    sa.ForeignKeyConstraint(['tag_id'], ['tags.id'], name='fk_book_tags_tag_id_tags'),
    sa.PrimaryKeyConstraint('book_id', 'tag_id')
    )
    op.drop_table('bookstores')
    op.drop_table('authors')
    # ### end Alembic commands ###
