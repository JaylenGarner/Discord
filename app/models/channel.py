from .db import db, environment, SCHEMA, add_prefix_for_prod
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin

# Define relationships!!!!!!

class Channel(db.Model):
    __tablename__ = 'channels'

    # Add when building models
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, nullable=False, db.ForeignKey=('servers.id'))
    name = db.Column(db.String(50), nullable=False, unique=True)

    #Relationship
    server_channels = db.relationship("Server", back_populates= 'channels', cascade='all,delete')
    channel_messages = db.relationship("Message", back_populates= 'channels', cascade='all,delete')


    @property
    def __repr__(self):
        return f"<Channel ID: {self.id}, Server ID: {self.server_id}, Channel Name: {self.name}>"

    def to_dict(self):
        return {
            'id': self.id,
            'server_id': self.server_id,
            'name': self.name
        }
