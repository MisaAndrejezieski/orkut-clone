from flask import Flask, render_template, request, redirect, jsonify
import json

app = Flask(__name__)

# Carregar dados do "banco de dados" JSON
def load_data():
    try:
        with open('data.json', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {"users": [], "scraps": [], "testimonials": []}

# Salvar dados no "banco de dados" JSON
def save_data(data):
    with open('data.json', 'w') as file:
        json.dump(data, file, indent=4)

@app.route('/')
def index():
    return redirect('/profile')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = load_data()
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']

        # Verificar se o e-mail já existe
        if any(user['email'] == email for user in data['users']):
            return "E-mail já está em uso!", 400

        # Adicionar novo usuário
        data['users'].append({"name": name, "email": email, "password": password, "profilePic": "default-profile.png"})
        save_data(data)
        return redirect('/profile')

    return render_template('register.html')

@app.route('/profile')
def profile():
    data = load_data()
    user = data['users'][0] if data['users'] else {"name": "Usuário Padrão", "email": "usuario@miskut.com", "profilePic": "default-profile.png"}
    return render_template('profile.html', user=user, scraps=data['scraps'], testimonials=data['testimonials'])

@app.route('/scrap', methods=['POST'])
def scrap():
    data = load_data()
    content = request.form['content']
    author = request.form['author']

    # Adicionar scrap
    data['scraps'].append({"author": author, "content": content})
    save_data(data)
    return redirect('/profile')

if __name__ == '__main__':
    app.run(debug=True)
