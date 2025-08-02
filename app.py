from flask import Flask, render_template, request, redirect, make_response, url_for

app = Flask(__name__)

user_reviews = [
    {
        "name": "Baver Tas",
        "text": "I have been using this app for a while now, and I must say, it has made splitting bills with friends and family incredibly easy. The interface is straightforward. Highly recommend it!"
    },
    {
        "name": "Comfort",
        "text": "The design of this app is so clean and user-friendly. It is perfect for managing expenses within groups."
    },
    {
        "name": "Bamidele",
        "text": "Using this app has genuinely made managing shared expenses fun and stress-free. The simplicity of the design and functionality means I spend less time calculating and more time enjoying time with my friends. Great job on making this tool so effective and easy to use!"
    },
    {
        "name": "Thierry",
        "text": "I appreciate how straightforward this app is. It’s effective without being complicated, which makes it perfect for anyone who just wants to get the job done quickly. Keep up the excellent work Lumi!"
    }
]


faqs = [
    {
        "question": "How does FunShare work?",
        "answer": "FunShare allows you to split bills easily with friends. You enter the amounts, select who owes what, and the app does the rest."
    },
    {
        "question": "Is FunShare free to use?",
        "answer": "Yes, FunShare is completely free to use with all its core features available to everyone."
    },
    {
        "question": "Can I use FunShare without creating an account?",
        "answer": "You can explore the app without signing up, but you’ll need an account to save or share any bill splits."
    }
]

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

@app.route("/faqs.html")
def faqs_page():
  return render_template("faqs.html" , theme=get_theme(), faqs=faqs)

@app.route("/reviews.html", methods=['GET', 'POST'])
def reviews():
    message = ""
    if request.method == 'POST':
        name = request.form.get('name') or "Anonymous"
        review = request.form.get('review')
        if review:
            user_reviews.append({"name": name, "text": review})
            message = "Thanks for your review!"
    return render_template("reviews.html", theme=get_theme(), reviews=user_reviews, message=message)

@app.route('/toggle-theme')
def toggle_theme():
    current = get_theme()
    new_theme = 'dark' if current == 'light' else 'light'
    response = make_response(redirect(request.referrer or url_for('index')))
    response.set_cookie('theme', new_theme, max_age=28*24*60*60)
    return response

