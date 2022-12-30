from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


# Define relationships!!!!!!

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    # Add when building models
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    image = db.Column(db.String(500))
    hashed_password = db.Column(db.String(255), nullable=False)

    #Related data
    user_messages = db.relationship("Message", back_populates= 'users', cascade='all,delete')
    user_servers = db.relationship("Server", secondary=server_members, back_populates= 'users', cascade='all,delete')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return f"<User ID: {self.id}, Username: {self.username}, Email: {self.email}>"

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'image': self.image
        }
