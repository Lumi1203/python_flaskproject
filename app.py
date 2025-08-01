from flask import Flask, render_template, request, redirect, make_response, url_for

app = Flask(__name__)

def get_theme():
    return request.cookies.get('theme', 'light')

@app.route("/")
@app.route("/index")
def index():
  return render_template("index.html" , theme=get_theme())

@app.route("/signup.html")
def signup():
  return render_template("signup.html" , theme=get_theme())

@app.route("/referafriend.html")
def referafriend():
  return render_template("referafriend.html" , theme=get_theme())

@app.route('/toggle-theme')
def toggle_theme():
    current = get_theme()
    new_theme = 'dark' if current == 'light' else 'light'
    response = make_response(redirect(request.referrer or url_for('index')))
    response.set_cookie('theme', new_theme, max_age=28*24*60*60)
    return response