from flask import jsonify
from flask_app import app
from flask_app.models import country

#.. GET route - get all country names
@app.route('/api/countries', methods=['GET'])
def countries_all():
    countries = country.Country.get_all_countries()
    return jsonify(countries)