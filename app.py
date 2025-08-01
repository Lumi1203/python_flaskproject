from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
@app.route("/index")
def index():
  return render_template("index.html")

@app.route("/signup.html")
def signup():
  return render_template("signup.html")

@app.route("/referafriend.html")
def referafriend():
  return render_template("referafriend.html")