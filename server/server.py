from flask_app import app
from flask_app.controllers import posts, users, bookmarks, countries
from flask_cors import CORS


CORS(app)

if __name__ == '__main__':
    app.run(debug=True)