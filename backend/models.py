from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email
        }


class Entry(db.Model):
    __tablename__ = 'entry'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    notes = db.Column(db.Text)
    rating = db.Column(db.Integer)

    @validates('rating')
    def validate_rating(self, key, rating):
        if not 1 <= rating <= 10:
            raise ValueError('Rating must be between 1 and 10')
        return rating

    def to_dict(self):
        return {
            'id': self.id,
            'notes': self.notes,
            'rating': self.rating
        }
